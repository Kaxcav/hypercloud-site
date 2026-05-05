# Hypercloud — Fase de Execução do Redesign
**Documento de entregáveis — Fase 2**
**Data:** Maio de 2026

Este documento consolida quatro entregas estratégicas:
1. Texto reescrito da página "Sobre"
2. Wireframe detalhado da nova home
3. Conteúdo estruturado da página vertical Governo/ATAs
4. Diretrizes de implementação e checklist técnico

Os dois protótipos HTML (home + Governo/ATAs) são entregues em arquivos separados.

---

## 1. PÁGINA "SOBRE" — REESCRITA COMPLETA

### Diagnóstico do texto atual

O texto original do Sobre apresenta três problemas críticos:

1. **Erros gramaticais** — "cujo sócios" (deveria ser "cujos sócios"), "Intuito" com inicial maiúscula sem motivo
2. **Posicionamento confuso** — fala em "não ferir o DNA de outras empresas dos sócios" como se justificasse a existência da Hypercloud, transparecendo conflito societário em vez de proposta de valor
3. **Foco interno** — descreve a empresa pela ótica dos fundadores, não pela ótica de quem o cliente é e do que ele ganha

### Texto reescrito — pronto para implementação

---

#### **Hero da página Sobre**

**Olho:** QUEM SOMOS

**Headline:**
**Tecnologia estratégica, sem amarras de fabricante.**

**Sub-headline:**
A Hypercloud é uma consultoria brasileira especializada em projetos de Tecnologia da Informação para empresas privadas, governo e instituições de ensino e saúde. Atuamos como Premier Partner do Google e operamos com independência sobre todas as principais plataformas de nuvem do mercado.

---

#### **Seção: Nossa história**

Nascemos da convicção de que decisões de TI estratégica não deveriam estar presas a um único fornecedor. Por mais de uma década, nossos sócios construíram relacionamentos com os principais fabricantes de tecnologia do mundo — e foi a partir dessa experiência cruzada que a Hypercloud foi estruturada.

Hoje, somos uma operação independente, focada em entregar projetos que vão da infraestrutura de Data Center ao software de gestão empresarial, com a liberdade de recomendar exatamente a tecnologia que cada cliente precisa.

---

#### **Seção: O que nos diferencia (4 pilares)**

**01. Premier Partner do Google**
Pertencemos ao nível mais alto de parceria do Google Cloud no Brasil. Implementamos Google Workspace, Google Cloud Platform e Google for Education com certificação direta da fabricante.

**02. Multi-cloud por design**
Trabalhamos com AWS, Microsoft Azure e Google Cloud com profundidade técnica equivalente. Recomendamos a melhor arquitetura — não a que dá mais comissão.

**03. Especialistas em Setor Público**
Atendemos governos municipais, estaduais e federais por meio de ARP/ATAs vigentes. Conhecemos as exigências de licitação, compliance e integridade que o setor demanda.

**04. Metodologias certificadas**
Operamos com PMI, ITIL e processos ágeis. Nossos especialistas possuem certificações ativas das principais autoridades técnicas do mercado.

---

#### **Seção: Nosso compromisso**

A Hypercloud opera sob um Programa de Integridade formal, com Código de Ética, Canal de Denúncias e políticas de conformidade publicadas. Para nós, transparência não é diferencial — é pré-requisito.

[Botão] **Acessar políticas de compliance →**

---

#### **Seção: Setores que atendemos**

- **Empresas privadas** — Infraestrutura, produtividade e segurança em escala corporativa
- **Governo** — Aquisições via ATAs, modernização e transformação digital do setor público
- **Educação** — Google for Education, Chromebooks e plataformas para gestão acadêmica
- **Saúde** — Soluções para hospitais e clínicas, com foco em LGPD e dados sensíveis

---

#### **Seção: Conheça a equipe / clientes**

[Grid de logos de clientes — manter, mas curado por vertical]

[CTA primário] **Falar com um especialista →**
[CTA secundário] **Ver nossas soluções**

---

### Tom de voz aplicado

| Princípio | Aplicação |
|---|---|
| **Direto** | Frases curtas. Sem rodeios. Sem jargão desnecessário. |
| **Confiante, não arrogante** | Afirmamos diferenciais com fatos verificáveis (Premier Partner, certificações), não adjetivos vazios |
| **Cliente no centro** | "Você", "seu projeto", "sua organização" — não "nós, nós, nós" |
| **B2B/B2G adulto** | Sem emojis, sem gírias, sem promessas de "transformação mágica" |

---

## 2. WIREFRAME DETALHADO — NOVA HOME

### Estrutura geral (16 blocos)

```
┌─ BLOCO 01 ─ TOP BAR (utility) ─────────────────────┐
│ E-mail · Telefone · Redes sociais · Idioma         │
│ Altura: 36px · Fundo: navy escuro                  │
└────────────────────────────────────────────────────┘

┌─ BLOCO 02 ─ NAVBAR PRINCIPAL ──────────────────────┐
│ Logo · Soluções · Setores · ATAs · Sobre · Blog    │
│                            [Falar com especialista]│
│ Sticky · 72px · borda inferior sutil               │
└────────────────────────────────────────────────────┘

┌─ BLOCO 03 ─ HERO ──────────────────────────────────┐
│                                                    │
│  [Badge] PREMIER PARTNER GOOGLE                    │
│                                                    │
│  Tecnologia que move                               │
│  organizações inteiras.                            │
│                                                    │
│  Hypercloud é a parceira de referência em cloud,   │
│  produtividade e segurança para empresas, governo  │
│  e instituições no Brasil.                         │
│                                                    │
│  [CTA primário] Diagnóstico gratuito  [secundário] │
│                                       Ver soluções │
│                                                    │
│  ─────────────────────────────────                 │
│  10+ anos · 200+ clientes · 4 verticais            │
│                                                    │
│  → Visual à direita: Composição abstrata           │
│    (rede/malha tecnológica em mint sobre navy)     │
│                                                    │
│ Estágio: TOFU (descoberta)                         │
└────────────────────────────────────────────────────┘

┌─ BLOCO 04 ─ TRUST STRIP ───────────────────────────┐
│ "Confiança de quem move o Brasil"                  │
│ [logo] [logo] [logo] [logo] [logo] [logo] [logo]   │
│ Carrossel infinito · grayscale · hover colorido    │
└────────────────────────────────────────────────────┘

┌─ BLOCO 05 ─ PARA QUEM (verticais) ─────────────────┐
│ "Soluções por setor"                               │
│                                                    │
│ ┌─Empresas─┐ ┌─Governo─┐ ┌─Educação─┐ ┌─Saúde─┐    │
│ │ Ícone    │ │ Ícone   │ │ Ícone    │ │ Ícone │    │
│ │ Texto    │ │ Texto   │ │ Texto    │ │ Texto │    │
│ │ →        │ │ →       │ │ →        │ │ →     │    │
│ └──────────┘ └─────────┘ └──────────┘ └───────┘    │
│                                                    │
│ Estágio: MOFU (consideração por vertical)          │
└────────────────────────────────────────────────────┘

┌─ BLOCO 06 ─ PILARES DE SOLUÇÃO ────────────────────┐
│ "O que entregamos"                                 │
│                                                    │
│ ┌─Cloud & Infra─┐ ┌─Produtividade─┐                │
│ │ AWS · Azure   │ │ Workspace     │                │
│ │ GCP · Backup  │ │ AppSheet      │                │
│ │ Migração      │ │ Treinamentos  │                │
│ │ Saiba mais →  │ │ Saiba mais →  │                │
│ └───────────────┘ └───────────────┘                │
│                                                    │
│ ┌─Dados & IA────┐ ┌─Segurança─────┐                │
│ │ Power BI · DW │ │ Pentest       │                │
│ │ Machine Learn │ │ Firewall      │                │
│ │ BI Consulting │ │ Consultoria   │                │
│ │ Saiba mais →  │ │ Saiba mais →  │                │
│ └───────────────┘ └───────────────┘                │
│                                                    │
│ Layout: 2x2 desktop · 1 coluna mobile              │
└────────────────────────────────────────────────────┘

┌─ BLOCO 07 ─ POR QUE HYPERCLOUD ────────────────────┐
│ Layout em duas colunas                             │
│                                                    │
│  ESQUERDA (texto)        DIREITA (números)         │
│  ─────────────────       ───────────────────       │
│  "Por que escolher       10+  Anos no mercado      │
│   a Hypercloud?"         200+ Clientes ativos      │
│                          50+  Especialistas        │
│  Texto sobre os          15+  Estados atendidos    │
│  diferenciais            ★    Premier Partner      │
└────────────────────────────────────────────────────┘

┌─ BLOCO 08 ─ FAIXA ATAs (destaque setor público) ───┐
│ Fundo: navy escuro com accent mint                 │
│                                                    │
│ "Governo compra com a Hypercloud via ATA"          │
│ Lista de ATAs vigentes · Como contratar            │
│                                                    │
│ [CTA] Ver ATAs vigentes →                          │
│                                                    │
│ Estágio: BOFU (decisão para setor público)         │
└────────────────────────────────────────────────────┘

┌─ BLOCO 09 ─ CASES / DEPOIMENTOS ───────────────────┐
│ "Resultados reais"                                 │
│                                                    │
│ ┌─Case 1───┐ ┌─Case 2───┐ ┌─Case 3───┐             │
│ │ Logo     │ │ Logo     │ │ Logo     │             │
│ │ Métrica  │ │ Métrica  │ │ Métrica  │             │
│ │ Quote    │ │ Quote    │ │ Quote    │             │
│ │ Ver →    │ │ Ver →    │ │ Ver →    │             │
│ └──────────┘ └──────────┘ └──────────┘             │
└────────────────────────────────────────────────────┘

┌─ BLOCO 10 ─ PARCEIROS TECNOLÓGICOS ────────────────┐
│ "Operamos como parceiros oficiais"                 │
│ Google Cloud Premier · AWS Partner · Microsoft     │
│ Azure · + outras certificações                     │
└────────────────────────────────────────────────────┘

┌─ BLOCO 11 ─ BLOG / RECURSOS ───────────────────────┐
│ "Conhecimento técnico publicado"                   │
│ ┌─Post 1─┐ ┌─Post 2─┐ ┌─Post 3─┐                   │
│ │ Cat.   │ │ Cat.   │ │ Cat.   │                   │
│ │ Título │ │ Título │ │ Título │                   │
│ │ Data   │ │ Data   │ │ Data   │                   │
│ └────────┘ └────────┘ └────────┘                   │
└────────────────────────────────────────────────────┘

┌─ BLOCO 12 ─ CTA FINAL ─────────────────────────────┐
│ Fundo: navy com gradiente mint                     │
│                                                    │
│ "Pronto para começar?"                             │
│ Texto curto sobre diagnóstico gratuito             │
│                                                    │
│ [CTA primário] Falar com especialista              │
│ [CTA secundário] Solicitar proposta                │
│                                                    │
│ Estágio: BOFU (decisão)                            │
└────────────────────────────────────────────────────┘

┌─ BLOCO 13 ─ FOOTER ────────────────────────────────┐
│ 4 colunas: Hypercloud · Soluções · Contato · Legal │
│ Endereço · Telefone · E-mails segmentados          │
│ Redes sociais · Selo Google Premier                │
│ Compliance: links para PDFs                        │
│ Copyright dinâmico · Termos · Privacidade          │
└────────────────────────────────────────────────────┘

┌─ BLOCO 14 ─ FAB WHATSAPP (sticky) ─────────────────┐
│ Canto inferior direito · 56px circular             │
│ Mensagem pré-formatada                             │
└────────────────────────────────────────────────────┘
```

### Hierarquia de CTAs por estágio

| Bloco | Estágio | CTA principal | CTA secundário |
|---|---|---|---|
| Hero | TOFU | Diagnóstico gratuito | Ver soluções |
| Verticais | MOFU | Saiba mais (por vertical) | — |
| Pilares | MOFU | Saiba mais (por solução) | — |
| Faixa ATAs | BOFU (setor público) | Ver ATAs vigentes | — |
| Cases | MOFU | Ler caso completo | — |
| CTA Final | BOFU | Falar com especialista | Solicitar proposta |
| Sticky FAB | BOFU (atendimento direto) | WhatsApp | — |

### Comportamento responsivo

**Breakpoints recomendados:**
- Mobile: até 640px
- Tablet: 641px – 1024px
- Desktop: 1025px – 1440px
- Wide: 1441px+

**Adaptações principais:**

| Bloco | Desktop | Mobile |
|---|---|---|
| Top bar | Visível | Oculto (info migra para footer) |
| Navbar | Horizontal completa | Hamburger menu fullscreen |
| Hero | Texto + visual lado a lado | Empilhado, visual abaixo |
| Verticais | Grid 4 colunas | Grid 2 colunas, depois 1 |
| Pilares | Grid 2x2 | 1 coluna |
| Por que | 2 colunas | 1 coluna empilhada |
| Cases | 3 colunas | Carrossel horizontal |
| Footer | 4 colunas | Acordeão (clique para expandir) |

---

## 3. PÁGINA VERTICAL — GOVERNO / ATAs

### Estratégia editorial

Esta é a página mais estratégica do redesign. Setor público representa um diferencial competitivo real da Hypercloud (ATAs vigentes, programa de compliance, conhecimento de licitações). Atualmente está escondida em um dropdown.

A página deve responder, em ordem, três perguntas que um gestor público se faz:

1. *"Vocês entendem do meu mundo?"* → Linguagem específica de licitações, compliance, ARP
2. *"Como eu compro de vocês?"* → ATAs vigentes, modalidades, processo
3. *"Vocês são confiáveis?"* → Programa de Integridade, casos, certificações

### Conteúdo completo

---

#### **Hero**

**Olho:** GOVERNO

**Headline:**
**Modernizamos a gestão pública sem reinventar a roda da licitação.**

**Sub-headline:**
A Hypercloud é fornecedora de tecnologia para governos municipais, estaduais e federais. Operamos com ATAs vigentes, programa de integridade formal e conhecimento profundo das exigências do setor público brasileiro.

**Métricas em destaque:**
- 15+ Estados e municípios atendidos
- 8+ ATAs vigentes
- 100% Programa de integridade publicado

[CTA] **Acessar ATAs vigentes →**
[CTA secundário] **Falar com licitações →**

---

#### **Seção: Como o governo compra da Hypercloud**

Três caminhos formais de aquisição:

**01. Adesão a ATAs vigentes**
Sua administração pode aderir a uma de nossas Atas de Registro de Preços já homologadas, dispensando novo processo licitatório.

**02. Participação em pregões**
Acompanhamos editais de pregão eletrônico e presencial em todas as esferas. Equipe dedicada a licitações.

**03. Contratação direta (Lei 14.133/21)**
Para situações específicas previstas na Nova Lei de Licitações, atuamos com toda a documentação habilitatória pronta.

[Bloco informativo] **Quer saber se você pode aderir a uma ATA nossa? Fale com a equipe de licitações.**

---

#### **Seção: ATAs vigentes**

[Tabela ou grid de cards com:]

| Órgão Gerenciador | Objeto | Validade | Status |
|---|---|---|---|
| (preencher com dados reais) | Google Workspace | XX/XX/2026 | Vigente |
| ... | Cloud + Migração | ... | Vigente |
| ... | Chromebooks | ... | Vigente |

[CTA] **Solicitar documentação completa →**

---

#### **Seção: Soluções desenhadas para o governo**

**Modernização administrativa**
- Migração de e-mail para Google Workspace
- Implantação de assinatura eletrônica
- Drives compartilhados com governança
- Painéis de gestão em Power BI / Looker Studio

**Educação pública**
- Google for Education para redes municipais e estaduais
- Chromebooks com gestão centralizada
- Treinamento massivo de professores
- Plataformas de avaliação e gestão acadêmica

**Saúde pública**
- Prontuário eletrônico em nuvem
- Adequação à LGPD para dados sensíveis
- Telemedicina e plataformas de agendamento
- Análise de dados epidemiológicos

**Segurança e compliance**
- Pentest e análise de vulnerabilidades
- Adequação à LGPD
- Backup e continuidade operacional
- Política de segurança da informação

---

#### **Seção: Programa de Integridade**

**Texto de abertura:**
A administração pública exige fornecedores que operem dentro de padrões formais de integridade. A Hypercloud mantém programa de compliance ativo, com documentação publicada e canal de denúncias independente.

**Documentos publicados:**
- Código de Conduta Disciplinar
- Código de Ética e Conduta
- Código de Ética para Fornecedores
- Política de Procedimentos
- Programa de Integridade

[Lista clicável com ícones de PDF — leva aos documentos]

**Canal de Ouvidoria**
Mantemos canal anônimo de denúncia para colaboradores, fornecedores e clientes.

[CTA] **Acessar Canal de Ouvidoria →**

---

#### **Seção: Casos no setor público**

[3 cards de cases reais — preencher com material aprovado pelos clientes]

Cada card deve conter:
- Nome do órgão (com autorização)
- Desafio em uma frase
- Solução implementada
- Métrica de impacto (% de economia, redução de tempo, número de usuários)
- Modalidade de contratação (ATA, pregão, etc.)

---

#### **Seção: Equipe dedicada a licitações**

A Hypercloud mantém equipe especializada em processos de venda para o setor público. Todo o ciclo — desde análise de edital até pós-venda — é tratado por profissionais com experiência em direito administrativo aplicado a TI.

**Canais diretos:**
- E-mail: licitacoes@hypercloud.com.br
- Telefone: (31) 4042-4483
- WhatsApp comercial dedicado

---

#### **CTA Final da página**

**Headline:**
Pronto para modernizar sua gestão?

**Sub:**
Agendamos uma conversa de 30 minutos com nossa equipe de licitações para entender seu cenário e indicar o melhor caminho de contratação.

[CTA primário] **Agendar conversa →**
[CTA secundário] **Receber catálogo de ATAs por e-mail**

---

## 4. DIRETRIZES DE IMPLEMENTAÇÃO

### 4.1. Stack tecnológico recomendado

| Camada | Recomendação primária | Alternativa |
|---|---|---|
| **Front-end** | Next.js 14 (App Router) | Astro |
| **Estilização** | Tailwind CSS + CSS variables | CSS modules |
| **CMS (conteúdo)** | Sanity ou Strapi | WordPress headless |
| **Hospedagem** | Vercel | Netlify |
| **Formulários** | React Hook Form + backend próprio | HubSpot Forms |
| **Analytics** | GA4 + Microsoft Clarity | Plausible |
| **CRM/Leads** | RD Station ou HubSpot | Pipedrive |
| **Chat/WhatsApp** | API oficial WhatsApp Business | Click-to-chat simples |
| **Performance** | Imagens otimizadas via `next/image` | Cloudflare Images |

**Justificativa do stack:**
- **Next.js** entrega SSR/SSG nativo, performance superior e SEO técnico avançado — crucial para um site B2B
- **Sanity** permite gerenciamento de conteúdo estruturado (cases, ATAs, blog) sem amarrar ao WordPress
- **Tailwind** acelera o desenvolvimento e mantém consistência via design tokens

### 4.2. Cronograma sugerido

| Fase | Duração | Entregáveis |
|---|---|---|
| **Discovery & Estratégia** | 2 semanas | Briefing, personas, arquitetura final, sitemap |
| **UX / Wireframes** | 2 semanas | Wireframes de 8 páginas-chave aprovados |
| **UI / Design Hi-Fi** | 3 semanas | Design system + telas finais desktop e mobile |
| **Conteúdo & Copy** | 2 semanas (paralelo) | Textos finais aprovados para todas as páginas |
| **Desenvolvimento Front** | 4 semanas | Páginas codificadas, responsivas, com animações |
| **CMS + Integrações** | 2 semanas (paralelo) | Backend de conteúdo + formulários + tracking |
| **QA & Testes** | 1 semana | Testes funcionais, performance, acessibilidade |
| **Migração & Go-live** | 1 semana | Redirects 301, DNS, monitoramento pós-deploy |

**Total: 12 a 14 semanas** (3 a 3,5 meses)

### 4.3. Checklist técnico de implementação

#### Pré-desenvolvimento
- [ ] Briefing aprovado com stakeholders
- [ ] Acesso ao Google Search Console e Analytics atual
- [ ] Backup completo do site atual (banco + arquivos)
- [ ] Levantamento de URLs atuais para mapa de redirects 301
- [ ] Coleta de assets aprovados (logos de clientes, cases)
- [ ] Reescrita de todos os textos validados juridicamente

#### Design system
- [ ] Tokens definidos: cores, tipografia, espaçamentos, sombras
- [ ] Componentes base: botões, cards, inputs, badges, navbar, footer
- [ ] Componentes complexos: hero, faixa CTA, blog card, case card, ATA table
- [ ] Estados de hover, focus, active, disabled
- [ ] Versão dark/light se aplicável
- [ ] Documentação no Figma + tokens exportados para código

#### Desenvolvimento
- [ ] Setup Next.js + Tailwind + tipagem TypeScript
- [ ] Estrutura de rotas e layout compartilhado
- [ ] Implementação responsiva mobile-first
- [ ] Imagens otimizadas (WebP/AVIF + lazy loading)
- [ ] Fontes self-hosted ou via Google Fonts com `display: swap`
- [ ] Animações com `prefers-reduced-motion` respeitado
- [ ] Componentes acessíveis (ARIA, navegação por teclado)

#### CMS / Conteúdo
- [ ] Schema de conteúdo: páginas, posts, cases, ATAs, soluções
- [ ] Painel de edição amigável para equipe de marketing
- [ ] Preview de conteúdo antes de publicar
- [ ] Workflow de aprovação (rascunho → revisão → publicado)

#### SEO técnico
- [ ] Sitemap XML automático
- [ ] robots.txt configurado
- [ ] Meta titles e descriptions em todas as páginas
- [ ] Schema.org: Organization, BreadcrumbList, Article, FAQPage
- [ ] Open Graph e Twitter Cards
- [ ] Canonical URLs
- [ ] Hreflang (se aplicável)
- [ ] Mapa completo de redirects 301 do site antigo

#### Performance (metas)
- [ ] Lighthouse Score > 90 em todas as categorias
- [ ] LCP < 2,5s
- [ ] CLS < 0,1
- [ ] FID/INP < 200ms
- [ ] Bundle JS < 200kb gzipped na home
- [ ] Imagens responsivas com `srcset`

#### Acessibilidade (WCAG 2.1 AA)
- [ ] Contraste mínimo 4,5:1 para texto normal
- [ ] Navegação 100% por teclado
- [ ] Focus visível em todos os interativos
- [ ] Alt text em todas as imagens
- [ ] Labels em todos os formulários
- [ ] Skip links no topo
- [ ] Hierarquia de headings correta (H1 único por página)

#### Tracking & Analytics
- [ ] GA4 configurado com eventos personalizados
- [ ] Pixel do Meta (manter o atual)
- [ ] LinkedIn Insight Tag (recomendado para B2B)
- [ ] Microsoft Clarity para heatmaps e gravações
- [ ] Eventos: clique em CTA, submit de formulário, scroll depth, download de PDF
- [ ] Goals e conversões mapeados
- [ ] LGPD: banner de cookies funcional + política atualizada

#### Integrações
- [ ] Formulários conectados ao CRM (RD Station / HubSpot)
- [ ] Notificações de novos leads (Slack/e-mail)
- [ ] WhatsApp Business com mensagem segmentada por origem
- [ ] Newsletter (se aplicável) integrada
- [ ] Sitemap submetido ao Google Search Console

#### Segurança
- [ ] HTTPS com certificado válido
- [ ] Headers de segurança: HSTS, CSP, X-Frame-Options
- [ ] reCAPTCHA ou hCaptcha em formulários públicos
- [ ] Rate limiting em endpoints de submissão
- [ ] Backup automático diário do CMS

#### Pós-launch (primeiros 30 dias)
- [ ] Monitoramento diário do Search Console (erros 404, queda de tráfego)
- [ ] Auditoria semanal de conversões
- [ ] Heatmaps revisados para ajustes de UX
- [ ] A/B test de headline da home
- [ ] Plano de conteúdo do blog ativado
- [ ] Reunião de retrospectiva com stakeholders

### 4.4. Pontos críticos de atenção

⚠️ **Migração de URLs antigas**
O site atual tem dezenas de URLs já indexadas. Sem um plano completo de redirects 301, a perda de tráfego orgânico pode ser catastrófica. Documentar TODAS as URLs antes de iniciar o desenvolvimento.

⚠️ **Conteúdo de ATAs precisa ser real e atualizado**
A página de Governo só tem valor se as ATAs listadas forem verdadeiras e estiverem vigentes. Estabelecer processo no CMS para a equipe de licitações manter atualizadas em tempo real.

⚠️ **Cases dependem de aprovação dos clientes**
Cases mais ricos exigem autorização formal por escrito. Iniciar esse processo logo no início do projeto, em paralelo ao design.

⚠️ **Compliance é diferencial — destacar com cuidado**
O programa de integridade é um ativo real, mas se mal apresentado vira "obrigação legal". O design deve fazer isso parecer um diferencial competitivo, não um disclaimer.

⚠️ **Não copiar a paleta do Google**
A tentação visual é usar as cores do Google (azul/vermelho/amarelo/verde) por causa da parceria. Resultado: o site fica genérico e parece um revendedor sem identidade. A Hypercloud precisa ter paleta própria, com o selo Google como elemento, não como tema.

⚠️ **Performance no Brasil é crítica**
B2B brasileiro tem boa parcela de acessos via 3G/4G em conexões instáveis. Imagens pesadas e bundles JS gigantes matam a conversão. Performance é requisito, não bônus.

⚠️ **WhatsApp como canal direto exige operação**
Não basta colocar o botão. Alguém precisa responder em até 5 minutos no horário comercial, ou o lead esfria. Garantir que existe pessoa/equipe responsável antes de destacar o canal.

---

## 5. PRÓXIMOS PASSOS RECOMENDADOS

1. **Validar este documento com stakeholders** (CEO, marketing, comercial, jurídico)
2. **Aprovar copy do "Sobre"** e usar como referência de tom para o resto do site
3. **Iniciar coleta de cases** com 5 clientes prioritários (3 privados, 2 governo)
4. **Levantar ATAs vigentes reais** com a equipe de licitações
5. **Aprovar design system base** antes de começar o hi-fi de telas
6. **Definir cronograma final** com fornecedor de desenvolvimento
7. **Reservar budget para conteúdo do blog** nos primeiros 6 meses (mínimo 8 artigos)

---

**Os protótipos HTML da nova home e da página de Governo estão entregues em arquivos separados (`hypercloud-home.html` e `hypercloud-governo.html`).**
