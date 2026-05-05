import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suporte',
  description: 'Área de suporte e chamados da Hypercloud.'
};

export default function SuportePage() {
  return (
    <section className="bg-white py-24">
      <div className="container-shell max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Suporte e Chamados</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Estrutura preparada para centralizar abertura de chamados, atendimento enterprise e futura integração com portal do cliente.
        </p>
      </div>
    </section>
  );
}
