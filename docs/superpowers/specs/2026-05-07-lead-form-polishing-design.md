# Polimento do Lead Form — Spec

**Data:** 2026-05-07
**Status:** Brainstorming aprovado, aguardando review do spec

## Contexto

O modal de captura de leads é o funil principal do site Hypercloud. É acionado por todos os CTAs principais (Navbar "Falar com Especialista", Hero, ComparisonExplorer, InvestmentEstimator, SpecialistCta) via `useLeadDialog().open(context?)`.

Implementação atual:

- `lib/lead.ts` — schema zod + tuplas de opções (`companySizeOptions`, `sectorOptions`, `interestOptions`) + `leadDefaults`.
- `components/LeadFormDialog.tsx` — dialog em 3 passos com `react-hook-form` + `zodResolver`, modo `onTouched`.
- `app/api/lead/route.ts` — valida o mesmo schema, rate-limit in-memory por IP (5/60s), honeypot `website`, envia via Resend se `RESEND_API_KEY` estiver setado.

## Problemas identificados

1. **Defaults enviesados** (`size: '11-50'`, `sector: 'privado'`) preenchem campos críticos antes de o usuário ler. Resultado: dados sujos para o time comercial — quem clicar "Próximo" sem revisar é classificado erroneamente como média empresa privada. `sector` é especialmente crítico porque separa o discurso B2B do B2G (ATAs, certificações de governo).
2. **Campos textuais redundantes**: `context` (passo 2) e `notes` (passo 3) coletam essencialmente a mesma coisa. O usuário não tem critério claro pra distinguir.
3. **Sem `autocomplete`** nos campos de contato — autofill do navegador não dispara, especialmente custoso em mobile.
4. **Sem focus trap** no modal: Tab pode sair pra elementos atrás do overlay; ao fechar, o foco não retorna pro botão que abriu.
5. **Telefone sem máscara**: aceita string livre com `min(8)`. Inputs no formato `1199999` ou `+55 (11) 9 9999-9999` chegam misturados.
6. **Erro genérico para qualquer falha**: rate-limit (429) e erro de servidor mostram a mesma copy "Tente novamente em instantes.", o que confunde o usuário que disparou várias submissões em sequência.

## Princípios da mudança

- **Equilíbrio** entre conversão (taxa de conclusão) e qualificação (dados limpos), conforme decidido no brainstorming.
- **Sem novas dependências.** Máscara de telefone e focus trap implementados inline.
- **Sem mudança visual estrutural.** Header, stepper, glow, success state ficam intactos.
- **Manter 3 passos.** Foi decisão explícita.

## Mudanças por arquivo

### `lib/lead.ts`

#### Schema

- Remover o campo `notes` do schema (`z.object`).
- Adicionar `errorMap` nos enums `size` e `sector` para que a mensagem mostrada seja humana (sem `errorMap`, o zod retorna "Invalid enum value. Expected...", o que vaza pro UI):

```ts
size: z.enum(['1-10', '11-50', '51-200', '200+'], {
  errorMap: () => ({ message: 'Selecione o porte da empresa' })
}),
sector: z.enum(['privado', 'publico', 'educacao', 'saude'], {
  errorMap: () => ({ message: 'Selecione o setor' })
}),
```

- Trocar `phone: z.string().trim().min(8, 'Informe um telefone válido')` por:

```ts
phone: z
  .string()
  .trim()
  .refine((v) => v.replace(/\D/g, '').length >= 10, 'Informe um telefone válido')
```

  Aceita 10 dígitos (fixo BR) ou 11 (celular BR), independente de máscara.

- Tipos: `LeadFormValues = z.infer<typeof leadFormSchema>` continua sendo a fonte da verdade, então `notes` desaparece automaticamente do tipo.

#### Defaults

- `size` e `sector` passam a ser **string vazia** (não `undefined`). Razão: se ficassem `undefined`, o `<select>` no DOM cairia pra primeira `<option>` válida (browser default), então a UI mostraria "1 a 10 colaboradores" como selecionado mesmo com o state interno `undefined`. Manter `''` força o select a casar com a `<option value="" disabled>` e a validação inline reflete o que o usuário vê.
- `notes` sai de `leadDefaults`.
- Após mudança, `leadDefaults` fica:

```ts
export const leadDefaults: Partial<LeadFormValues> = {
  company: '',
  size: '' as LeadFormValues['size'],
  sector: '' as LeadFormValues['sector'],
  interests: [],
  context: '',
  name: '',
  email: '',
  phone: '',
  website: ''
};
```

O cast é mentira tipográfica controlada: o runtime carrega `''` que o zod (`z.enum`) rejeita imediatamente quando `trigger` roda. O cast existe só pra silenciar TS na construção do objeto — alternativa seria tornar o enum `z.enum([...]).or(z.literal(''))` e refinar, mas piora a definição do schema sem benefício.

### `components/LeadFormDialog.tsx`

#### Passo 1 (Empresa)

- `<select {...register('size')}>` ganha como primeira opção `<option value="" disabled>Selecione o porte</option>`. Mesmo tratamento para `<select {...register('sector')}>` (placeholder: "Selecione o setor").
- Combinado com o default `''` em `leadDefaults`, o select inicia exibindo o placeholder. Quando o usuário tenta avançar sem escolher, `trigger(['company','size','sector'])` no `handleNext` aciona o zod, que rejeita `''` no enum e a mensagem inline aparece.
- `<input {...register('company')}>` ganha `autoComplete="organization"`.

#### Passo 2 (Interesses + Contexto)

- Grid de interesses fica idêntico.
- Textarea de `context`: `rows={4}` (era 3).
- Hint passa a ser:

  > Conte rapidamente o cenário, prazos, restrições ou qualquer observação para o pré-atendimento.

#### Passo 3 (Contato)

- Remover bloco do campo `notes` ("Algo mais? (opcional)") inteiro.
- Inputs ganham atributos:
  - `name` → `autoComplete="name"`
  - `email` → `autoComplete="email"`, `inputMode="email"`
  - `phone` → `autoComplete="tel"`, `inputMode="tel"`

#### Máscara de telefone

Adicionar função pura no topo do arquivo (acima do componente):

```ts
function formatPhoneBR(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length === 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  if (digits.length <= 10) {
    // formato fixo: (11) 9999-9999
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // 11 dígitos — celular: (11) 9 9999-9999
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}
```

Trocar o input de telefone para `Controller` do `react-hook-form` (mantém integração total com `formState.errors.phone`, `trigger`, `formState.isDirty`, etc.):

```tsx
import { Controller, useForm, type Resolver, type SubmitHandler } from 'react-hook-form';

// ...dentro do componente:
const { register, handleSubmit, watch, setValue, trigger, reset, control, formState } = form;

// no passo 3:
<Controller
  control={control}
  name="phone"
  render={({ field }) => (
    <input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="(11) 9 9999-9999"
      className="form-input-bare"
      ref={field.ref}
      name={field.name}
      onBlur={field.onBlur}
      value={field.value ?? ''}
      onChange={(e) => field.onChange(formatPhoneBR(e.target.value))}
    />
  )}
/>
```

`field.onBlur` combina com `mode: 'onTouched'` — validação só após primeiro blur, igual aos outros campos.

O valor enviado para `/api/lead` é a string com máscara — o backend e o e-mail do Resend recebem `(11) 9 9999-9999`, mais legível para o comercial.

#### Focus trap + retorno de foco

No `useEffect` que já roda quando `open` vira true (hoje só trata Escape e overflow), expandir para também:

1. Capturar `previousFocus = document.activeElement as HTMLElement | null` na entrada do effect.
2. No handler de `keydown`, tratar `Tab`:
   - Coletar focusables: `dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]')`.
   - Filtrar `:not([disabled]):not([tabindex="-1"])` (já exclui o honeypot).
   - Se `event.shiftKey && document.activeElement === first` → `event.preventDefault(); last.focus()`.
   - Se `!event.shiftKey && document.activeElement === last` → `event.preventDefault(); first.focus()`.
3. Cleanup: além de remover listener e restaurar `body.style.overflow`, chamar `previousFocus?.focus?.()` se ainda estiver no DOM (`document.contains(previousFocus)`).

Adicionar `ref` no container do dialog (o `<div className="relative w-full max-w-xl ...">`) — passar `useRef<HTMLDivElement>(null)` e usar `ref.current` para o query.

#### Erro 429 vs erro genérico

Estado: `useState<'idle' | 'sending' | 'success' | 'error' | 'rate-limited'>`.

`onSubmit` ajustado:

```ts
const onSubmit: SubmitHandler<LeadFormValues> = async (values) => {
  setSubmitState('sending');
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    if (res.status === 429) {
      setSubmitState('rate-limited');
      return;
    }
    if (!res.ok) {
      setSubmitState('error');
      return;
    }
    setSubmitState('success');
  } catch (error) {
    console.error('[lead] submit error', error);
    setSubmitState('error');
  }
};
```

Bloco de mensagem no passo 3 (onde hoje só trata `'error'`):

```tsx
{submitState === 'rate-limited' ? (
  <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] text-amber-400">
    Muitas tentativas em pouco tempo. Aguarde um minuto e tente novamente.
  </p>
) : submitState === 'error' ? (
  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-400">
    Não conseguimos enviar agora. Tente novamente em instantes.
  </p>
) : null}
```

Botão de envio: `disabled={submitState === 'sending'}` (comportamento atual). Não desabilitar nos estados de erro — usuário precisa poder tentar de novo.

### `app/api/lead/route.ts`

Sem mudanças funcionais. A API já retorna `429` para rate-limit; o front passa a tratá-lo de forma diferenciada.

## Validação manual (não há suite de testes)

Após implementar, conferir cada item:

1. **Defaults removidos**: abrir modal, clicar "Próximo" sem mexer nos selects → erro inline em `size` e `sector`, não avança para passo 2.
2. **Voltar preserva valores**: preencher passo 1, ir pra passo 2, "Voltar" → campos preservados (comportamento padrão do `react-hook-form`, mas confirmar não regrediu).
3. **Notes removido**: passo 3 mostra apenas nome/email/telefone — sem campo "Algo mais?".
4. **Context expandido**: passo 2 mostra textarea com 4 linhas e hint atualizado.
5. **Máscara de telefone**:
   - Digitar `11999998888` → vira `(11) 9 9999-8888`.
   - Digitar `1133334444` → vira `(11) 3333-4444`.
   - Backspace apaga apenas o último dígito (não o caractere mascarado).
   - Colar `+55 (11) 9 9999-8888` → strip de não-dígitos pega só os 11 últimos, vira `(11) 9 9999-8888`.
   - Submeter com 9 dígitos → mensagem "Informe um telefone válido".
6. **Autocomplete**:
   - Em Chrome com perfil preenchido, abrir o modal → campos `name`/`email`/`tel`/`organization` mostram sugestões.
   - Em iOS Safari, focar no telefone → teclado numérico (via `inputMode="tel"`).
7. **Focus trap**:
   - Tab no último elemento focável (botão "Enviar pedido" / "Próximo") → volta pro botão "Fechar".
   - Shift+Tab no primeiro (botão "Fechar") → vai pro último.
   - Tab nunca foca elementos atrás do overlay.
8. **Retorno de foco**:
   - Abrir modal pelo botão "Falar com Especialista" da Navbar → fechar com Esc → foco volta pro botão da Navbar.
   - Mesmo comportamento ao fechar pelo botão X e pelo overlay.
9. **Erro 429**:
   - Submeter 6× em sequência rápida (mesmo IP) → 6ª submissão mostra copy específica de rate-limit em amber, não em red.
   - Esperar 60s, tentar de novo → submete normal.
10. **Erro genérico**:
    - Desligar a rede e submeter → copy padrão em red.

## Riscos e mitigações

- **Risco**: usuário com perfil de autofill bagunçado preenche `phone` com formato esquisito; máscara reformata mas pode perder dígitos se a string original tiver mais de 11 dígitos.
  - **Mitigação**: `slice(0, 11)` corta no máximo. Se autofill trouxer `+5511999998888`, vira `(11) 9 9999-8888` corretamente (`+55` é descartado pelo strip).
- **Risco**: focus trap quebra em browsers antigos com `document.activeElement === null`.
  - **Mitigação**: `previousFocus?.focus?.()` com optional chaining; se `null`, não falha.
- **Risco**: `setValue('phone', ..., { shouldValidate: false })` não dispara re-render; UI mostra valor desatualizado.
  - **Mitigação**: `react-hook-form` já força re-render via `watch('phone')` no value do input.

## Itens explicitamente fora de escopo

- Captcha (hCaptcha/Turnstile) — overkill com honeypot + rate-limit + nenhum spam relatado.
- Consolidar para 2 passos — decisão explícita de manter 3.
- Mudar copy do header do modal ou do success state.
- Mudar a estrutura visual do passo 2 (grid de interesses) ou stepper.
- Migrar rate-limit in-memory para Redis/external store — só relevante quando escalar além de 1 instância.
- Validação adicional do email (rejeitar gmail.com etc).

## Próximo passo

Implementação a ser planejada via skill `writing-plans`.
