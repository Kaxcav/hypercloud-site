# Relatório — Redesign comercial

Branch: `feat/redesign-comercial` · base: `origin/main` · **sem merge, sem deploy**.

---

## 1. Leia isto primeiro: o outro agente está neste repo

O pedido dizia que o outro agente (Antigravity) estava em outro projeto e não colidiria.
**Isso não confere.** Ele trabalhou neste repositório hoje e já mergeou parte deste mesmo
brief na `main`:

| PR | Horário | Commit | Item do brief |
|---|---|---|---|
| #3 `ag/footer-selo-garantia` | 10:50 | `feat(footer): add selo de compromisso (S-002)` | §1.3 Selo Ético |
| #4 `ag/header-comercial` | 13:05 | `feat(nav): atualiza header comercial e cria dropdown de solucoes` | §2.1 Header + dropdown |

O identificador `S-002` sugere que ele executa um backlog numerado a partir deste brief.
**Consequência prática:** a Onda 1 (Globais) já estava quase toda entregue quando comecei.
Em vez de reescrever `Navbar.tsx` e `Footer.tsx` — o que geraria conflito de frente num
repo de produção por ganho nenhum — parti do que ele mergeou e completei só o que faltava.

**Risco em aberto:** se ele continuar mergeando na `main`, este PR vai precisar de rebase.
Vale combinar a divisão de escopo antes de aprovar.

---

## 2. O que ficou pronto, por onda

### Onda 1 — Globais + Home

| Item do brief | Situação |
|---|---|
| §1.1 Header sticky com CTA "Agendar Diagnóstico de ROI" | Já vinha do PR #4. **Completei:** removi o `TopBar` (faixa de ruído com Suporte, Portal do Cliente e redes sociais), tirei Portal do Cliente e os links de ecossistema HSM/HLM do nível comercial, e renomeei os grupos do dropdown para os nomes do brief |
| §1.2 WhatsApp flutuante | Já existia e já estava montado. **Completei:** o hover só escala sob `motion-safe`, e `.animate-pulse-ring` entrou no guard de `prefers-reduced-motion` (o guard cobria só o marquee) |
| §1.3 Selo Ético no rodapé | Já vinha do PR #3, mantido intacto |
| §2.2 Hero de resultado/ROI | Reescrito. Nova headline, subtexto de humanização, CTAs duplos ("Simular Economia em Nuvem" → calculadora; "Falar com Engenheiro no WhatsApp" → wa.me direto). Selo Premier Partner mantido |
| §2.3 Soluções com FinOps no topo | `SolutionsSection.tsx` substitui `OtherSolutions.tsx`. FinOps lidera em painel largo próprio, com a lista da auditoria. Cada produto ganhou linha de benefício humano, incluindo a copy de IA do brief |
| §2.6 FAQ de objeções | `Faq.tsx` reescrito: as 3 objeções do brief entram primeiro, as comerciais antigas ficam abaixo. Card de humanização do time incluído |

### Onda 2 — Quiz e calculadora

| Item | Situação |
|---|---|
| §2.4 Quiz de 2 passos | `QuoteQuiz.tsx`. Passo 1 objetivo + faixa de usuários, passo 2 nome/e-mail/WhatsApp, barra de progresso "Passo X de 2", honeypot e consentimento LGPD |
| §2.5 Calculadora FinOps | `FinOpsCalculator.tsx`. Faixa de gasto + provedor, estimativa na hora, revelação com o texto do brief e CTA de desbloqueio do relatório |
| Reaproveitar o fluxo de lead | Sim. `lib/lead.ts` ganhou `quickLeadSchema` e `anyLeadSchema` (união); `/api/lead` aceita os dois formatos. O schema do dialog completo **não foi afrouxado** — rate limit, honeypot e roteamento por setor continuam valendo |

### Onda 3 — Sobre e Cases

| Item | Situação |
|---|---|
| §3 Sobre | Ordem do brief: herói de propósito → manifesto → quem faz acontecer → 4 pilares → compromisso ético → CTA. Os 4 pilares passaram a ser os do brief (FinOps & ROI, atendimento sem intermediários N2/N3, adoção & treinamento, segurança & governança) |
| §4 Cases | Cards de 3 etapas a partir de `constants/case-studies.ts`. Mural das 7 credenciais preservado |

---

## 3. O que falta de você — itens `CONFIRMAR`

### 3.1 Bloqueia publicação dos Cases

`constants/case-studies.ts` é **100% placeholder**. Cada case tem uma flag `published: false`
que mantém um aviso visível na página ("Conteúdo em preparação… os cases abaixo são
ilustrativos"). Isso é proposital: impede que número inventado passe por case real.

Para cada um dos 3 cases preciso de:

- **Nome do cliente** + autorização de uso de marca
- **Logo** (arquivo para `/public`)
- **Setor e porte** reais
- **Desafio e solução** revisados
- **Resultado mensurável** — hoje estão como `-00%`, `00%`, `00h`
- **Depoimento** com nome e cargo de quem assina

Depois de preencher, trocar `published` para `true` remove o aviso.

### 3.2 Números da calculadora

`constants/finops.ts` — **um arquivo só, para não haver percentual espalhado em componente**.

- `FINOPS_SAVING_RANGE` está em **15% a 30%**, vindo do brief e **não validado pela
  engenharia**. A calculadora usa o teto (30%) porque a copy diz "economizar até".
- `PROVIDER_MULTIPLIER` está em `1` para todos os provedores — hoje o provedor é
  registrado no lead mas **não altera a conta exibida**. Confirmar se deveria variar.
- Os `midpoint` de cada faixa em `monthlySpendOptions` (`lib/lead.ts`) também são
  estimativa minha: 5k / 15k / 50k / 80k.

> Enquanto não validado, a calculadora se apresenta como estimativa de referência e diz
> explicitamente que não é proposta comercial.

### 3.3 Fotos do time

Três lugares esperam rosto real, hoje com slot neutro (sem stock, sem rosto inventado):

- `app/(site)/sobre/page.tsx` — seção "Quem faz acontecer", 4 slots com cargo
- `components/Faq.tsx` — card de humanização

Preciso de nome, cargo e foto de cada pessoa, com enquadramento consistente.

### 3.4 Número herdado que vale conferir

`app/(site)/sobre/page.tsx` exibe **"200+ Clientes ativos"** e **"10+ Anos de operação"**.
Não são meus — já estavam no site e foram preservados. Mas são alegações numéricas
auditáveis; se não sustentarem, é melhor trocar por algo verificável.

---

## 4. Onde discordei do brief

**Calculadora como seção, não modal.** O brief diz "widget/modal". Fiz **seção inline
ancorada** (`#simular-economia`). Motivo: o piso de qualidade da impeccable recusa modal
para tarefa que não precisa de interrupção nem foco protegido — e uma calculadora na home
não precisa. Como seção, ela também é indexável e linkável, o que serve à venda. O brief
oferecia as duas opções, então não é desvio de escopo.

**Não refiz a Onda 1 do zero** — ver seção 1.

**Numeração dos pilares removida.** Os pilares do Sobre vinham como "01 ·", "02 ·". A
sequência não carregava informação, então saiu.

**Eyebrows nas seções novas.** `SectionHeader` exigia `eyebrow`; o piso da impeccable trata
kicker acima de heading como banido. Tornei o prop **opcional** para as seções novas
nascerem sem ele. **Não varri o site inteiro** removendo eyebrows das seções antigas — seria
churn fora do escopo. Fica como sugestão para depois.

---

## 5. Verificação

| Check | Resultado |
|---|---|
| `npx tsc --noEmit` | limpo |
| `npm run lint` | `✔ No ESLint warnings or errors` |
| `npm run build` | verde — 21 rotas, incluindo `/dashboard` e `/portal-do-cliente` |
| `detect.mjs` (impeccable) | `[]` nos 10 arquivos novos/reescritos |
| Calculadora no browser | testada: faixa R$15–50k + AWS → R$ 180.000/ano (50.000 × 12 × 30%) |
| Overflow horizontal em 375px | nenhum no documento |
| CTAs do herói na dobra mobile | ambos visíveis (651px e 711px de 812px) |

**Não foi tocado:** `lib/auth.ts`, `app/api/auth/**`, `.env*`, `.cpanel.yml`, middleware de
sessão. O portal e o NextAuth seguem como estavam.

**Screenshots:** não foi possível capturar — o painel do browser não estava sendo exibido
nesta sessão. A verificação foi feita via DOM, console e medição de layout.

### Defeito pré-existente encontrado (não é meu, não corrigi)

Hidratação: `Warning: Extra attributes from the server: style` em `BadgesShowcase` →
`Stagger`/`StaggerItem` (`components/MotionWrapper.tsx`). Um componente Server renderiza
primitivas de motion que são client. Aparece no console em dev. Fora do escopo deste PR,
mas vale abrir.

---

## 6. Trabalho local que estava sem commit

O working tree tinha ~432 linhas não commitadas: route groups `app/(site)` / `app/(portal)`,
`PortalHeader.tsx`, `TopBar.tsx` deletado, e uma Navbar reescrita como megamenu.

Salvei tudo em **`wip/route-groups-portal`** antes de qualquer coisa. No PR levei a
arquitetura (route groups + PortalHeader + separação de chrome entre site e área logada) e
**descartei a Navbar local**, usando a mergeada do PR #4 como base. Nada se perdeu — a
versão megamenu continua na branch wip se você preferir ela.
