type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'mx-auto mb-14 max-w-3xl text-center' : 'mb-14 max-w-3xl'}>
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
        <span className="h-1 w-1 rounded-full bg-brand-500" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-text-muted sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
