import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal do Cliente',
  description: 'Área institucional reservada para clientes Hypercloud.'
};

export default function PortalDoClientePage() {
  return (
    <section className="bg-white py-24">
      <div className="container-shell max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Portal do Cliente</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Estrutura reservada para login, gestão de relacionamento, acompanhamento de jornadas e futuras integrações de suporte enterprise.
        </p>
      </div>
    </section>
  );
}
