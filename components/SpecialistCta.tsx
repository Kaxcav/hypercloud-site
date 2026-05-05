import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

type SpecialistCtaProps = {
  id?: string;
  title?: string;
  description?: string;
};

export function SpecialistCta({
  id = 'falar-com-especialista',
  title = 'Fale com um especialista da Hypercloud',
  description = 'Escolha o canal que fizer mais sentido para seu momento. Você pode falar por WhatsApp ou enviar um e-mail direto para nossa equipe.'
}: SpecialistCtaProps) {
  return (
    <section id={id} className="border-t border-slate-200/60 bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-shell max-w-5xl">
        <div className="rounded-[28px] border border-slate-200/60 bg-slate-50 p-6 sm:p-8 lg:p-10">
          <span className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Falar com um especialista
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tighter text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="https://wa.me/5531992391683?text=Olá,%20quero%20falar%20com%20um%20especialista%20da%20Hypercloud."
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 transition hover:border-brand-200 hover:shadow-soft"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">WhatsApp</p>
                <p className="mt-2 text-lg font-bold tracking-tight text-slate-900">+55 31 99239-1683</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Fale direto com nossa equipe comercial pelo WhatsApp.</p>
              </div>
            </Link>

            <Link
              href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
              className="flex items-start gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 transition hover:border-brand-200 hover:shadow-soft"
            >
              <Mail className="mt-0.5 h-5 w-5 text-brand-600" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">E-mail</p>
                <p className="mt-2 text-lg font-bold tracking-tight text-slate-900">contato@hypercloud.com.br</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">Envie seu contexto e retornamos com orientação comercial.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
