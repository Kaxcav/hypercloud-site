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
  const loop = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section
      aria-label="Credenciais oficiais Google"
      className="border-b border-slate-200/70 bg-white"
    >
      <div className="container-shell flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="shrink-0 lg:max-w-[220px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Confiança comprovada
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-800">
            Credenciais oficiais Google
          </p>
        </div>

        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
          }}
        >
          <div className="marquee-track flex w-max items-center gap-12 will-change-transform">
            {loop.map((logo, index) => (
              <div
                key={`${logo.file}-${index}`}
                className="flex h-14 w-[160px] shrink-0 items-center justify-center"
              >
                <Image
                  src={`/logo/logos partner/${logo.file}`}
                  alt={logo.alt}
                  width={160}
                  height={56}
                  className="h-full w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
