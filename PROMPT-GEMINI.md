# PROMPT — Refatoração completa do site Hypercloud

> Cole este documento inteiro como prompt inicial. Ele contém o diagnóstico já feito (varredura real do código), as correções obrigatórias e a estratégia de geração de leads. Execute na ordem dos blocos.

---

## 0. CONTEXTO DO PROJETO

Você vai trabalhar no repositório `hypercloud-site` — site institucional/comercial da **Hypercloud**, revendedora **Google Cloud Premier Partner** (Google Workspace, Gemini Enterprise, Google Cloud, AppSheet) que atende empresas privadas e **setor público brasileiro** (ATAs / adesão / pregão).

**Stack:** Next.js 14 App Router · TypeScript strict · React 18 · Tailwind 3 · framer-motion · lucide-react · next-auth · react-hook-form + zod · Resend (e-mail de lead).

**Comandos (PowerShell no Windows):**
```
npm run dev          # dev server
npm run build        # build de produção
npm run lint         # eslint
npx tsc --noEmit     # type-check
```

**Leia `CLAUDE.md` na raiz antes de tocar em qualquer coisa** — ele documenta o sistema de temas (light default via `data-theme`), os tokens Tailwind (`surface.*`, `text.*`, `border.*`, `boxShadow.*`), os primitivos de animação (`components/MotionWrapper.tsx`) e as convenções de import (`@/...`, nunca relativo).

⚠️ **`CLAUDE.md` está desatualizado num ponto:** ele diz que as fontes são Inter / Instrument Serif / JetBrains Mono, mas `app/layout.tsx` carrega **Roboto Flex + Roboto Mono** (`--font-google-sans` / `--font-google-mono`). Corrija a documentação ao final.

### Regras invioláveis
1. **Laranja é a cor da marca.** Não introduza uma cor primária concorrente. As 4 cores Google (`google-blue/red/yellow/green`) só aparecem como assinatura visual.
2. **Sem emoji, sem hype.** Voz B2B/B2G adulta, direta, orientada a diferencial verificável. Referência canônica: `01-documento-estrategico.md`.
3. **Não invente dados.** Nenhum número, prazo, SLA, case ou métrica sem fonte. Onde faltar dado real, use os componentes de estado vazio descritos no Bloco 7 — nunca preencha com ficção.
4. **`npm run build`, `npm run lint` e `npx tsc --noEmit` têm que passar limpos ao final.** Hoje passam — não regrida.
5. **Não edite** `index.html`, `governo.html`, `sobre.html`, `style.css` na raiz — são protótipos estáticos legados fora do build.
6. Ícones: só `lucide-react`. Animação: só `framer-motion` via `MotionWrapper`.

---

## BLOCO 1 — DADOS REAIS DA EMPRESA (fazer primeiro)

Hoje os dados de contato estão **hardcoded e divergentes em 5 arquivos**, com placeholders visíveis em produção.

### 1.1 Criar `constants/company.ts` como fonte única de verdade

```ts
// constants/company.ts
export const company = {
  legalName: 'Hypercloud Consultoria e Comércio de Tecnologia Ltda.',
  tradeName: 'Hypercloud',
  cnpj: '20.007.959/0001-66',
  phone: { display: '(31) 2120-1818', href: 'tel:+553121201818' },
  whatsapp: { /* ⚠ CONFIRMAR — ver Bloco 7, item A */ },
  emails: {
    contato: 'contato@hypercloud.com.br',
    comercial: 'comercial@hypercloud.com.br',
    licitacoes: 'licitacoes@hypercloud.com.br',
    suporte: 'suporte@hypercloud.com.br',
  },
  address: { city: 'Contagem', state: 'MG', coverage: 'Atendimento nacional' },
  social: {
    linkedin: 'https://www.linkedin.com/company/hypercloudoficial/',
    instagram: 'https://www.instagram.com/hypercloudoficial',
    facebook: 'https://www.facebook.com/hypercloudoficial',
  },
} as const;
```

### 1.2 Substituir todas as ocorrências hardcoded

| Arquivo | Linha aprox. | Está | Deve ficar |
|---|---|---|---|
| `components/Footer.tsx` | 120-121 | `{/* TODO: confirmar CNPJ */}` + `CNPJ XX.XXX.XXX/0001-XX` | `company.cnpj` + razão social no rodapé legal |
| `components/Footer.tsx` | 38 | `tel:3140424483` → `(31) 4042-4483` | `company.phone.href` / `.display` |
| `components/Footer.tsx` | 52-54 | `linkedin.com/`, `instagram.com/`, `facebook.com/` (raízes genéricas) | `company.social.*` |
| `components/TopBar.tsx` | 10-15 | `tel:3140424483` → `(31) 4042-4483` | `company.phone.*` |
| `components/TopBar.tsx` | 52 | `https://www.linkedin.com/` | `company.social.linkedin` |
| `components/SpecialistCta.tsx` | 83 | `(31) 4042-4483` | `company.phone.display` |
| `components/SpecialistCta.tsx` | 53 | `wa.me/5531992391683` | `company.whatsapp` (após confirmar) |
| `app/suporte/page.tsx` | 58 | `wa.me/5531992391683` | `company.whatsapp` |
| `app/api/lead/route.ts` | 54, 65 | e-mails hardcoded | `company.emails.*` |

**Detalhes que importam:**
- `tel:3140424483` está sem DDI e sem formatação — quebra o discador em celular. Use `tel:+55...`.
- O rodapé legal deve exibir: `Hypercloud Consultoria e Comércio de Tecnologia Ltda. · CNPJ 20.007.959/0001-66`.
- Os links sociais atuais mandam o visitante para a home do LinkedIn/Instagram/Facebook. É um vazamento de tráfego puro.

---

## BLOCO 2 — REMOVER PREÇOS E REPOSICIONAR PARA CAPTURA DE LEAD

**Decisão comercial:** o site **não publica mais preço**. Motivos: preço público ancora a negociação para baixo, entrega margem para o concorrente, atrai comprador de commodity e — o pior — **elimina o motivo do lead entrar em contato**. A tabela de recursos fica (é ativo de SEO e de convencimento); o R$ sai.

### 2.1 O que remover

- **`components/PricingGrid.tsx`** — o bloco de preço (linhas 140-145: `formatPlanPrice(plan.pricePerUser)` + `/usuário/mês`), o eyebrow `"Preços Google Workspace"`, a descrição `"Valores de tabela em BRL por usuário/mês…"` e o rodapé `"Valores de tabela. Sujeitos a condições comerciais…"`.
- **`components/CompareAllTable.tsx`** — linha ~119, a célula de preço no cabeçalho das colunas.
- **`constants/workspace-plans.ts`** — remover o campo `pricePerUser` do tipo `WorkspacePlan`, de todos os 8 objetos, e deletar o helper `formatPlanPrice`.
- **`components/Hero.tsx`** — a headline atual é `"Google Workspace com preço público."` (linhas 70-73). Some inteira.
- **`components/Faq.tsx`** — a pergunta `"Os preços são finais?"` (linha 15) não faz mais sentido.
- **`components/Footer.tsx`** linha 77 — item de menu `"Preços"`.
- **`components/Navbar.tsx`** / **`components/CommandPalette.tsx`** — o label pode ficar, mas revise o texto que remete a preço.

### 2.2 O que colocar no lugar (não deletar a seção — **transformar**)

Renomeie a seção de `PricingGrid` para **`PlansGrid`** (`components/PlansGrid.tsx`) e mantenha `id="planos"` (atualize todas as âncoras `#pricing` → `#planos` em `Navbar`, `Footer`, `CommandPalette`, `app/sobre`, `app/solucoes/[slug]`, `app/setor-publico`).

Cada card passa a mostrar, no lugar do R$:
- Nome do plano + tier (Frontline / Enterprise) — **manter**
- `audience` (para quem é) — **manter**
- `highlights` (4-5 bullets) — **manter**
- **Novo:** um selo de adequação — ex. `"Ideal para 50-200 usuários"`, `"Requer governança avançada"`
- **Novo CTA no lugar do preço:** `"Receber cotação"` → abre `useLeadDialog()` com `context = "Cotação — {plano}"`

Substitua o texto de âncora de preço por uma **linha de ancoragem de valor**, algo como:
> *"Preço fechado por volume, prazo de contrato e veículo de aquisição (ATA, pregão, contratação direta). Cotação em até 1 dia útil."*

Isso comunica que existe negociação — o que é um argumento *melhor* que tabela pública — sem entregar número.

**Novo item de FAQ substituindo o antigo:**
> **"Por que vocês não publicam preço?"** — *"Porque o preço final depende de volume, prazo de contrato e veículo de aquisição. Publicar tabela ignoraria condições por ATA e contratos plurianuais que normalmente reduzem o custo. Mandamos a cotação fechada em até 1 dia útil."*

### 2.3 Nova headline do Hero

Substituir `"Google Workspace com preço público. / Cloud, IA e produtividade — contrato direto."`

Direção: liderar por **autoridade verificável + resultado**, não por preço. Escreva 3 opções e implemente a mais forte. Referência de registro:
- `"Google Workspace, Cloud e IA — implantados por quem a Google credenciou."`
- Subheadline: contrato direto com Premier Partner, ATAs vigentes para setor público, migração conduzida por time certificado.
- CTAs: primário `"Falar com especialista"` (abre o modal) · secundário `"Ver planos"` (âncora `#planos`).

O badge `"Premier Google Cloud Partner · ATAs vigentes"` do Hero **fica** — é o maior diferencial da empresa e hoje está subaproveitado.

---

## BLOCO 3 — BUGS DE CÓDIGO (corrigir todos)

### 3.1 🔴 CRÍTICO — leads são perdidos silenciosamente
`app/api/lead/route.ts` linhas 56-73: o `fetch` para a API do Resend **não verifica `res.ok`**. Se o Resend responder 4xx/5xx (domínio não verificado, chave inválida, rate limit), a função segue e retorna `{ ok: true }` — o visitante vê a tela de sucesso e **o lead nunca chega em ninguém**. Num site cujo único objetivo é gerar lead, esse é o pior bug possível.

**Corrigir:**
- Checar `response.ok`; em falha, logar o corpo do erro com `console.error` e **retornar 502** para o cliente, para que o modal mostre o estado de erro real.
- Adicionar um **fallback de persistência** (mínimo: log estruturado em JSON com todos os campos; ideal: gravar em planilha/Sheets, Supabase ou webhook) para que nenhum lead dependa exclusivamente do e-mail.
- Adicionar `reply_to: lead.email` no payload do Resend — hoje o comercial não consegue responder direto da caixa.
- Confirmar que o domínio de `from: noreply@hypercloud.com.br` está verificado no Resend; se não estiver, todo envio falha em silêncio.

### 3.2 🟠 Honeypot é código morto
`lib/lead.ts` linha 44: `website: z.string().max(0).optional().or(z.literal(''))`. Qualquer valor preenchido **falha na validação zod** e a rota devolve 422 antes de chegar na checagem de honeypot em `app/api/lead/route.ts` linha 46. O `if (result.data.website)` é inalcançável — e o bot recebe um 422 que sinaliza claramente que o campo é armadilha.

**Corrigir:** afrouxar o schema para `website: z.string().optional()` e deixar a rota tratar o honeypot, respondendo `200 { ok: true }` (falso sucesso) quando preenchido.

### 3.3 🟠 Rate limiter vaza memória
`app/api/lead/route.ts` linhas 4-18: o `Map` de IPs **nunca é purgado**. Cresce indefinidamente enquanto o processo viver. Além disso é por processo — some no redeploy e não funciona com mais de uma instância.

**Corrigir:** varrer e remover entradas expiradas a cada N requisições (ou usar um `Map` com timestamp de último acesso e limpeza preguiçosa). Deixe um comentário indicando que precisa migrar para store externo (Redis/Upstash) se escalar horizontalmente.

### 3.4 🟠 Sem consentimento LGPD no formulário de lead
`components/LeadFormDialog.tsx` coleta nome, e-mail corporativo, telefone e empresa **sem nenhum checkbox de consentimento nem link para política de privacidade**. Isso é exposição legal direta (LGPD, Lei 13.709/2018) e é agravado pelo fato de a empresa vender para **setor público**, onde conformidade é critério de habilitação.

**Corrigir:**
- Adicionar no passo 3 um checkbox obrigatório: *"Autorizo o contato da Hypercloud e o tratamento dos meus dados conforme a [Política de Privacidade]."*
- Adicionar `consent: z.literal(true)` ao `leadFormSchema`.
- Registrar no payload: timestamp do consentimento e versão do texto aceito.
- Criar as páginas reais `/politica-de-privacidade` e `/termos-de-uso` (hoje o Footer aponta ambos para `/` — links mortos, linhas 101-102).

### 3.5 🟡 Zero atribuição de origem do lead
O lead chega sem UTM, sem `referrer`, sem página de origem, sem `gclid`. É impossível saber qual canal gerou qual venda — ou seja, impossível investir em marketing com critério.

**Corrigir:** capturar no `LeadDialogProvider` (persistindo em `sessionStorage` na primeira visita) e enviar junto ao payload:
`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `document.referrer`, `window.location.pathname` e o `context` do gatilho (que já existe). Adicionar campos opcionais correspondentes ao schema zod e imprimi-los no corpo do e-mail em `formatLeadEmail`.

### 3.6 🟡 API deprecada
`components/Navbar.tsx` linha 33: `navigator.platform` está deprecado. Trocar por `navigator.userAgent` (`/Mac|iPod|iPhone|iPad/`) ou `navigator.userAgentData?.platform` com fallback.

### 3.7 🟡 Rota de API sem configuração explícita
`app/api/lead/route.ts` não declara `export const dynamic = 'force-dynamic'` nem `runtime`. Declare explicitamente para evitar qualquer tentativa de cache/estatização do endpoint.

---

## BLOCO 4 — SEO E INFRAESTRUTURA (o site é praticamente invisível hoje)

### 4.1 🔴 `metadataBase` aponta para domínio de staging
`app/layout.tsx` linha 27: `metadataBase: new URL('https://oi-production.up.railway.app')`. **Todas** as URLs canônicas e imagens de Open Graph estão sendo geradas apontando para um subdomínio da Railway. Compartilhamento em LinkedIn/WhatsApp gera preview quebrado e o Google indexa o domínio errado.

**Corrigir:** ler de `process.env.NEXT_PUBLIC_SITE_URL` com fallback para o domínio real (`https://www.hypercloud.com.br` — confirmar, Bloco 7 item C). Documentar a variável em `.env.example`.

### 4.2 Arquivos que simplesmente não existem — criar todos

| Arquivo | Por quê |
|---|---|
| `app/sitemap.ts` | Não existe. Gerar dinamicamente a partir de `constants/solutions.ts` + rotas estáticas. |
| `app/robots.ts` | Não existe. Permitir crawl, bloquear `/dashboard` e `/api`, apontar sitemap. |
| `app/icon.png` / `app/favicon.ico` | Não existe favicon. A aba do navegador mostra o ícone genérico do Next. |
| `app/apple-icon.png` | Não existe. |
| `app/opengraph-image.tsx` | Não existe imagem de OG. Todo link compartilhado aparece sem card. Gerar via `ImageResponse` com logo + tagline. |
| `app/not-found.tsx` | Não existe 404 customizado — e um 404 é oportunidade de recuperar o lead. |
| `app/error.tsx` | Não existe error boundary de rota. |
| `app/politica-de-privacidade/page.tsx` | Exigido pela LGPD, linkado no rodapé (hoje morto). |
| `app/termos-de-uso/page.tsx` | Linkado no rodapé (hoje morto). |

Cada nova página pública precisa de `export const metadata` com `title`, `description` e `alternates.canonical`.

### 4.3 Dados estruturados (JSON-LD) — nenhum existe hoje

Criar `components/StructuredData.tsx` e injetar:
- **`Organization`** no `layout.tsx` — nome legal, CNPJ (`taxID`), logo, telefone (`ContactPoint` com `contactType: "sales"` e `areaServed: "BR"`), `sameAs` com os 3 perfis sociais reais.
- **`LocalBusiness`** — endereço Contagem/MG (ganha presença no Google Maps e em buscas locais "google workspace bh").
- **`FAQPage`** no `Faq.tsx` — habilita rich snippet de FAQ no resultado de busca. Retorno alto, custo baixo.
- **`BreadcrumbList`** nas páginas internas (já existe `Breadcrumbs.tsx`, falta o schema).
- **`Service`** em cada `/solucoes/[slug]`.

### 4.4 🔴 `public/` está servindo ~10 MB de arquivos que não deveriam estar na web

A pasta `public/` é servida publicamente e é indexável. Hoje ela contém:

- **`public/logo/lixo/`** — 13 arquivos, incluindo **`microsoft.pdf`, `microsoft_branca.pdf`, `microsofit gold partner.pdf`, `microsofit gold partner branca.pdf`, `microsoft-teams-logo.png`**. Qualquer pessoa pode acessar `seusite.com.br/logo/lixo/microsoft.pdf`. Um **Google Premier Partner** servindo material de parceria Microsoft no próprio domínio é um problema de posicionamento, não só de higiene.
- **`public/logo/sharepoint/`** — 7 imagens do SharePoint. Mesmo problema.
- **`.cdr` (CorelDRAW):** `lg.hypercloud_vetor.cdr` (594 KB), `Cópia_de_segurança_de_lg.hypercloud_vetor.cdr` (594 KB), `desenho camisa-hypercloud.cdr` (433 KB), `lg.hypercloud_vetor-google.cdr` (1.170 KB), `Cópia_de_segurança_...-google.cdr` (671 KB) — arquivos-fonte de design, ~3,4 MB, inúteis para o navegador.
- **PDFs soltos:** `consulting.pdf`, `licensing.pdf`, `training.pdf` (~1,8 MB).
- **`public/logo/logos partner/`** — 6 JPEGs que são *duplicatas* dos PNGs já usados em `public/logo/badges/` (estes sim referenciados por `constants/badges.ts`).

**Ação:** mover tudo que não é referenciado por código para fora de `public/` (ex.: `assets-fonte/` na raiz, incluída no `.gitignore` ou mantida só no repositório). Referências reais em uso, verificadas: `/logo/lg.hypercloud_horizontal.png`, `/logo/lg.hypercloud_vetor-branca.png`, `/logo/badges/*.png` (7 arquivos), `/photos/hero-team.jpeg`. **Só esses precisam continuar em `public/`.**

### 4.5 Performance
- `next.config.mjs` tem `images.unoptimized: true` e o hero é um JPEG de **319 KB** carregado com `priority` — é o LCP da home. Converter para **AVIF/WebP** com fallback e gerar versões responsivas manualmente (já que o otimizador do Next está desligado). Meta: < 120 KB.
- Os PNGs de logo têm 89-101 KB cada e são renderizados a 40px de altura. Gerar versões redimensionadas.
- Rodar Lighthouse ao final e reportar os números de LCP, CLS e TBT antes/depois.

### 4.6 Zero instrumentação de analytics
Não há GA4, GTM, pixel do LinkedIn, pixel da Meta, nem qualquer evento. Hoje é literalmente impossível saber quantas pessoas visitam o site, de onde vêm ou onde abandonam o formulário.

**Implementar** (via `@next/third-parties/google` para GTM/GA4, carregado com `strategy="afterInteractive"`):
- GA4 + Google Tag Manager
- **LinkedIn Insight Tag** — canal mais relevante para B2B de TI no Brasil, e habilita retargeting por cargo/empresa
- Eventos customizados: `view_planos`, `open_lead_dialog` (com o `context` do gatilho), `lead_step_1`, `lead_step_2`, `lead_step_3`, `lead_submit`, `whatsapp_click`, `phone_click`, `compare_table_expand`
- Google Search Console + envio do sitemap

Sem isso, todo o Bloco 5 vira palpite.

---

## BLOCO 5 — MÁQUINA DE LEADS (a parte estratégica)

O site hoje tem **um único caminho de conversão**: um modal de 3 passos e 8 campos, atrás do botão "Falar com Especialista". Isso captura apenas quem já decidiu comprar — algo em torno de 2-3% do tráfego. Os outros ~97% saem sem deixar rastro. O trabalho aqui é criar caminhos de captura para quem **ainda não está pronto** e acelerar quem **já está**.

### 5.1 Escada de ofertas — dar motivo para deixar o contato

Com o preço fora do ar, é preciso substituir a "informação de graça" por algo de valor maior. Implementar em ordem de prioridade:

**① Diagnóstico gratuito de licenciamento** *(maior conversão, menor esforço)*
Landing `/diagnostico`. Proposta: *"Mandamos um relatório de quanto sua empresa gasta a mais em licenças ociosas ou mal dimensionadas."* Formulário curto (empresa, nº de usuários, licenças atuais, e-mail). Vende consultoria, não produto — e o resultado do diagnóstico já é a conversa comercial.

**② Calculadora Microsoft 365 → Google Workspace** *(maior geração de tráfego orgânico)*
Rota `/calculadora`. Ferramenta interativa: usuário informa nº de licenças e plano M365 atual → recebe uma **estimativa de faixa** de economia e diferenças funcionais. **O resultado detalhado é entregue por e-mail** — é aí que o lead é capturado. Ferramentas interativas convertem muito acima de PDF gated e ganham backlinks sozinhas. Isso também resolve o luto do preço público: captura a intenção de "quanto custa" sem publicar tabela.

**③ Kit de adesão a ATA — setor público** *(maior ticket, menor concorrência)*
Este é o ativo mais subaproveitado do site. A Hypercloud tem ATAs vigentes e a página `/setor-publico` existe, mas não converte. Criar material gated:
- Modelo editável de ofício de adesão / carona
- Checklist de conformidade com a Lei 14.133/2021
- Passo a passo "Como aderir a uma ATA em 4 etapas"
- Tabela pública com: número da ata, órgão gerenciador, vigência, itens/lotes cobertos
Um servidor público baixando um modelo de ofício é um lead de altíssima intenção. Roteie esses leads para `licitacoes@hypercloud.com.br`, não para o comercial.

**④ Assessment de segurança e LGPD no Workspace**
Questionário de 10 perguntas (DLP, Vault, retenção, acesso contextual, 2FA) → gera um score e um relatório de lacunas. Gancho direto para upsell de Enterprise Plus.

**⑤ Guia de migração** — checklist técnico completo, gated por e-mail.

### 5.2 Reduzir o atrito do formulário atual

O modal pede **8 campos em 3 passos antes de qualquer valor entregue**, e o campo de contato fica **por último** — ou seja, quem abandona no passo 2 (a maioria) é perdido por completo.

**Mudanças:**
- **Salvar parcialmente.** Dispare um evento (e, se possível, um registro) ao concluir cada passo. Um lead com empresa + porte + setor já vale ligação de prospecção.
- **Inverter, ou pelo menos capturar e-mail cedo.** Testar variante que pede e-mail no passo 1 e qualifica depois (progressive profiling).
- **Pré-preencher o `context`** conforme o gatilho: quem clicou no card "Enterprise Plus" já deve chegar no modal com esse interesse marcado — hoje `openLead()` é chamado sem contexto na maioria dos gatilhos (`Hero`, `Faq`, `SpecialistCta`).
- **Adicionar campo "urgência"** (avaliando / decidindo neste trimestre / preciso agora). É o melhor qualificador isolado e custa um clique.

### 5.3 Multiplicar os canais de captura

- **Botão flutuante de WhatsApp** — fixo, canto inferior direito, com mensagem pré-preenchida contextual à página. No B2B brasileiro é frequentemente o canal de maior volume, e hoje o WhatsApp só aparece enterrado em duas seções.
- **Agendamento direto** — integrar Google Calendar Appointment Schedule ou Calendly: *"Agendar 15 minutos"* converte melhor que *"Falar com especialista"* porque devolve controle ao visitante e elimina a espera de "1 dia útil".
- **Barra de CTA fixa no mobile** — o site depende de navbar e seções finais; no celular o CTA desaparece do campo de visão.
- **Exit intent no desktop** — modal leve com oferta secundária (o diagnóstico), não o formulário completo.
- **CTA de meio de página** — inserir um bloco de conversão entre `PlansGrid` e `CompareAllTable`. Hoje há uma sequência longa sem oferta.

### 5.4 Velocidade de resposta

O site promete **"resposta em até 1 dia útil"** em três lugares. Em B2B de TI, a taxa de qualificação cai drasticamente conforme passam os minutos após o preenchimento — a diferença entre responder em minutos e responder no dia seguinte é grande o suficiente para valer investimento de engenharia.

**Implementar:**
- Notificação instantânea para o time (webhook Slack, ou WhatsApp via API) no `POST /api/lead`, além do e-mail.
- **Auto-resposta imediata** para o lead, via Resend, com: confirmação, nome do responsável, link de agendamento e uma peça de conteúdo relevante ao interesse marcado.
- **Roteamento por setor:** `sector === 'publico'` → `licitacoes@`; demais → `comercial@`. O campo já existe no schema e hoje é ignorado no roteamento.
- Se o SLA de minutos for viável, trocar a promessa de "1 dia útil" por algo mais forte. Se não for, **manter "1 dia útil"** — promessa quebrada é pior que promessa modesta.

### 5.5 Prova social — hoje é o ponto mais fraco do site

`constants/cases.ts` é **100% ficção declarada no próprio código**: "Indústria Acme", "Prefeitura · Cidade Digital", "Rede Hospitalar Norte", com métricas inventadas ("38% de redução", "4× de velocidade") e 8 logos "Cliente A" até "Cliente H". Isso está no ar em `/cases` e na home.

Além de não convencer ninguém, **métrica de resultado inventada em material comercial é risco real** — publicidade enganosa (CDC art. 37) e, em contexto de licitação, problema de idoneidade.

**Ação:**
1. **Remover as métricas fabricadas imediatamente.** Não é negociável.
2. Enquanto não houver case real autorizado, substituir por prova social **verdadeira e disponível hoje**:
   - As **7 credenciais Google** já em `constants/badges.ts` — hoje aparecem pequenas em `BadgesShowcase`. São o maior ativo de credibilidade da empresa e merecem destaque muito maior, com explicação do que cada uma significa (a maioria dos visitantes não sabe o que é "Premier Partner" nem quanto custa obter).
   - **ATAs vigentes** — número, órgão, vigência. Prova documental verificável, imbatível no setor público.
   - Números agregados que a empresa pode confirmar: anos de operação, total de usuários migrados, número de clientes ativos.
3. Construir um processo de coleta de case: template de autorização de uso de marca + roteiro de entrevista. Um único case real nomeado vale mais que dez fictícios.

### 5.6 SEO de conteúdo — hoje o site tem 11 páginas e nenhuma estratégia de busca

O funil depende inteiramente de tráfego direto e pago. Criar páginas para intenção de busca real:

- **Comparativos** — `/comparativo/google-workspace-vs-microsoft-365`. Alto volume, alta intenção comercial, e é exatamente a dúvida do decisor de TI. Aproveita a `CompareAllTable` que já existe.
- **Verticais** — `/segmentos/industria`, `/saude`, `/educacao`, `/varejo`. Mesma solução, linguagem e dores diferentes. Reaproveita a estrutura de `solucoes/[slug]`.
- **Geográficas** — "Google Workspace Belo Horizonte / Contagem / Minas Gerais". A empresa é de Contagem e não explora busca local. Combina com o `LocalBusiness` do item 4.3.
- **Setor público** — "como adquirir Google Workspace por ATA", "adesão a ata de registro de preços software", "licitação Google Cloud". Volume menor, ticket muito maior, concorrência quase zero.
- **Blog técnico** — Gemini no Workspace, políticas de DLP, casos de uso de AppSheet. Atrai o técnico que influencia a decisão.

Cada página nova: `metadata` completo, canonical, JSON-LD, e um CTA contextual ligado à escada de ofertas do item 5.1.

### 5.7 Nutrição

Leads de TI raramente compram na primeira visita — o ciclo é longo e passa por comitê. Com o Resend já integrado, montar uma sequência de 5 e-mails pós-conversão, segmentada por `interests` e `sector`, terminando em convite para diagnóstico. Sem isso, todo lead que não fecha em 30 dias é desperdiçado.

### 5.8 Ordem de implementação sugerida

| Prioridade | Item | Esforço | Impacto |
|---|---|---|---|
| 1 | Corrigir bug de perda de lead (3.1) | Baixo | Crítico |
| 2 | Dados reais + CNPJ + LGPD (Blocos 1 e 3.4) | Baixo | Crítico |
| 3 | Remover métricas fictícias (5.5) | Baixo | Alto (risco) |
| 4 | Analytics + captura de UTM (4.6 e 3.5) | Baixo | Alto |
| 5 | Remoção de preços + novo Hero (Bloco 2) | Médio | Alto |
| 6 | WhatsApp flutuante + CTA fixo mobile (5.3) | Baixo | Alto |
| 7 | SEO técnico: sitemap, robots, OG, JSON-LD (4.2 e 4.3) | Médio | Alto |
| 8 | Limpeza de `public/` (4.4) | Baixo | Médio |
| 9 | Diagnóstico gratuito + Kit ATA (5.1 ① e ③) | Médio | Alto |
| 10 | Calculadora M365 → Workspace (5.1 ②) | Alto | Muito alto |
| 11 | Páginas de comparativo e vertical (5.6) | Alto | Alto (prazo longo) |

---

## BLOCO 6 — CONSISTÊNCIA E LIMPEZA FINAL

- **`components/Faq.tsx`** tem 3 comentários `⚠ TODO: confirmar com comercial Hypercloud antes de production — prazos chutados / SLAs por tier` (linhas 29, 35, 41). O conteúdo desses itens ("24-72h", "SLAs personalizáveis") está no ar sem validação. Ver Bloco 7.
- **`components/AtasStrip.tsx`** linka `https://hypercloud.com.br/atas/arp_cimpar-software.pdf` e `.../ciasc-sc.pdf` — verificar se esses PDFs existem; se não, ou hospedar em `public/atas/` ou remover o link.
- **`app/cases/page.tsx`** linha 48 exibe ao visitante o texto *"Conteúdo placeholder até liberação formal do cliente"*. Isso não pode estar em produção.
- Atualizar **`CLAUDE.md`**: corrigir as fontes (Roboto Flex / Roboto Mono, não Inter / Instrument Serif / JetBrains Mono), a política de preços (agora "sem preço público em nenhuma superfície"), as âncoras (`#planos` em vez de `#pricing`) e documentar `constants/company.ts`.
- Atualizar **`.env.example`** com: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `LEAD_WEBHOOK_URL`.
- Verificar contraste AA em ambos os temas depois de qualquer mudança de cor. O texto branco sobre a foto do Hero é o ponto mais sensível.
- Testar todas as páginas em 360px de largura.

---

## BLOCO 7 — ITENS QUE EXIGEM CONFIRMAÇÃO HUMANA

**Não invente nada aqui. Pergunte, ou deixe explicitamente marcado como pendente no código com um comentário e um estado vazio visível apenas em dev.**

**A. Número de WhatsApp.** O código usa `wa.me/5531992391683` em dois lugares, mas o telefone institucional confirmado é **(31) 2120-1818** — que é fixo e provavelmente não é o WhatsApp. Confirmar qual número é o WhatsApp comercial antes de publicar.

**B. Cases e clientes.** Nenhum case real está disponível. Confirmar quais clientes autorizam menção nominal e quais métricas são auditáveis. Até lá, `/cases` deve mostrar credenciais e ATAs, não ficção.

**C. Domínio de produção.** Confirmar se é `https://www.hypercloud.com.br` — necessário para `metadataBase`, sitemap, canonical, OG e configuração do Resend.

**D. FAQ — prazos e SLA.** Confirmar com o comercial: prazo real de contratação (privado e público) e os SLAs de suporte por tier. Os textos atuais estão marcados como estimados no próprio código.

**E. ATAs.** Números, órgãos gerenciadores, vigências e itens cobertos — para publicar a tabela do item 5.1 ③ e verificar os links de `AtasStrip.tsx`.

**F. Analytics.** IDs do GA4, GTM e LinkedIn Insight Tag.

---

## ENTREGA

Trabalhe em blocos, na ordem de prioridade de 5.8. Ao final de cada bloco:

1. Rode `npx tsc --noEmit`, `npm run lint` e `npm run build` — os três precisam passar limpos.
2. Liste os arquivos criados, modificados e removidos.
3. Liste os itens do Bloco 7 que bloquearam alguma tarefa.
4. Não marque como concluído nada que dependa de dado não confirmado.

**Ao final de tudo, entregue um relatório com:** o que foi corrigido, o que ficou pendente de confirmação humana, e as métricas de Lighthouse (LCP, CLS, TBT) antes e depois.
