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
      className="border-b border-slate-200/70 bg-white"
    >
      <div className="container-shell flex flex-col items-center gap-5 py-6 sm:py-7 lg:flex-row lg:justify-between lg:gap-10">
        <div className="flex items-center gap-3 lg:shrink-0">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 sm:text-xs">
            Premier Google Cloud Partner
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 lg:w-auto lg:flex-1 lg:justify-end">
          {partnerLogos.map((logo) => (
            <div
              key={logo.file}
              className="flex h-12 w-[140px] shrink-0 items-center justify-center sm:h-14 sm:w-[160px]"
            >
              <Image
                src={`/logo/logos partner/${logo.file}`}
                alt={logo.alt}
                width={180}
                height={64}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
