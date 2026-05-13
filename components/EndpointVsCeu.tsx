'use client';

// components/EndpointVsCeu.tsx
import { useLeadDialog } from '@/components/LeadDialogProvider';
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
      <div className="container-shell py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
            Gestão de dispositivos
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
            Endpoint Management vs{' '}
            <span className="font-extrabold text-gradient-brand">
              Chrome Enterprise Upgrade.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Comprar Workspace Enterprise Plus dá controle sobre{' '}
            <span className="font-semibold text-text-strong">dados e usuários</span>{' '}
            no Google. CEU é uma licença separada que controla o{' '}
            <span className="font-semibold text-text-strong">dispositivo ChromeOS</span>{' '}
            (hardware + sistema). Não são substitutos — são complementares em
            cenários com fleet Chromebook.
          </p>
        </div>

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
    <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
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
      className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-[12.5px] font-bold text-white shadow-brand transition hover:opacity-95"
    >
      Falar com Especialista
    </button>
  );
}
