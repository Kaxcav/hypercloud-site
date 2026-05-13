'use client';

// components/EndpointVsCeu.tsx
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary } from '@/components/buttons';
import { Smartphone, Cpu } from 'lucide-react';

const rows: { dim: string; endpoint: string; ceu: string }[] = [
  {
    dim: 'Foco principal',
    endpoint: 'Usuário e dispositivos multiplataforma (iOS, Android, Windows, Mac).',
    ceu: 'Hardware ChromeOS — o dispositivo em si.'
  },
  {
    dim: 'Escopo de controle',
    endpoint: 'Gerencia o acesso aos dados da empresa em qualquer aparelho.',
    ceu: 'Gerencia o sistema operacional e o hardware do Chromebook.'
  },
  {
    dim: 'Nível de restrição',
    endpoint: 'Exige senha, criptografia e apaga dados corporativos remotamente.',
    ceu: 'Bloqueia portas USB, desativa hardware, força modo quiosque e impede login fora do domínio.'
  },
  {
    dim: 'Instalação / provisionamento',
    endpoint: 'Baseado em perfil de trabalho ou login do usuário.',
    ceu: 'Zero-touch enrollment: o dispositivo já sai da caixa configurado para a empresa.'
  },
  {
    dim: 'Atualizações',
    endpoint: 'Controla versões de apps específicos.',
    ceu: 'Controla versão do ChromeOS e agenda updates.'
  },
  {
    dim: 'Preço / licenciamento',
    endpoint: 'Assinatura mensal por usuário (recorrente).',
    ceu: 'Licença por dispositivo (geralmente perpétua pela vida útil do hardware).'
  }
];

export function EndpointVsCeu() {
  return (
    <section
      aria-label="Endpoint Management vs Chrome Enterprise Upgrade"
      className="border-y border-border bg-surface-soft"
    >
      <div className="container-shell py-20 sm:py-28 lg:py-32">
        <SectionHeader
          eyebrow="Gestão de dispositivos"
          title={
            <>
              Endpoint Management vs{' '}
              <span className="font-extrabold text-gradient-brand">Chrome Enterprise Upgrade.</span>
            </>
          }
          description="Comprar Workspace Enterprise Plus dá controle sobre dados e usuários no Google. CEU controla o dispositivo ChromeOS (hardware + sistema). Não são substitutos — são complementares em cenários com fleet Chromebook."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ColumnCard
            icon={Smartphone}
            title="Workspace Enterprise Plus"
            subtitle="Endpoint Management"
            field="endpoint"
          />
          <ColumnCard
            icon={Cpu}
            title="Chrome Enterprise Upgrade"
            subtitle="CEU"
            field="ceu"
          />
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-text-muted">
          <span className="font-bold text-text-strong">Resumo:</span> se você não tem
          Chromebooks, Endpoint Management resolve. Se tem fleet de Chromebooks
          corporativos com necessidade de bloqueio físico/OS, CEU é obrigatório —
          vendemos as duas.
        </p>

        <div className="mt-6 flex justify-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

function ColumnCard({
  icon: Icon,
  title,
  subtitle,
  field
}: {
  icon: typeof Smartphone;
  title: string;
  subtitle: string;
  field: 'endpoint' | 'ceu';
}) {
  return (
    <div className="group rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition group-hover:rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-subtle">
            {subtitle}
          </p>
          <h3 className="text-[15px] font-extrabold text-text-strong">{title}</h3>
        </div>
      </div>

      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.dim}>
            <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-subtle">
              {row.dim}
            </dt>
            <dd className="mt-1 text-[13px] leading-relaxed text-text">{row[field]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CTAButton() {
  const { open: openLead } = useLeadDialog();
  return (
    <button
      type="button"
      onClick={() => openLead('Workspace + CEU')}
      className={btnPrimary('md')}
    >
      Falar com Especialista
    </button>
  );
}
