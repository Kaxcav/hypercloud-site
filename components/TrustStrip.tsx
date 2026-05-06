import Image from 'next/image';

const partnerLogos = [
  {
    file: 'google-clound_select-Tecnology_partner.jpeg',
    alt: 'Google Cloud Select Technology Partner'
  },
  {
    file: 'google-clound_select-services-partner.jpeg',
    alt: 'Google Cloud Select Services Partner'
  },
  {
    file: 'google-workspace_premier-Co-sell-service_partner.jpeg',
    alt: 'Google Workspace Premier Co-Sell Partner'
  },
  {
    file: 'google-workspace_select_tecnology_partner.jpeg',
    alt: 'Google Workspace Select Technology Partner'
  }
];

export function TrustStrip() {
  return (
    <section
      aria-label="Credenciais oficiais Google"
      className="border-b border-slate-200/70 bg-slate-50/70"
    >
      <div className="container-shell flex flex-col items-center gap-5 py-7 sm:py-8 lg:gap-6 lg:py-9">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-[11px]">
            Premier Google Cloud Partner — credenciais oficiais
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {partnerLogos.map((logo) => (
            <div
              key={logo.file}
              className="flex h-[88px] items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-medium sm:h-[96px]"
            >
              <Image
                src={`/logo/logos partner/${logo.file}`}
                alt={logo.alt}
                width={200}
                height={72}
                className="h-auto max-h-[68px] w-auto object-contain sm:max-h-[76px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
