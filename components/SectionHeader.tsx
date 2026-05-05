type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'mx-auto mb-14 max-w-3xl text-center' : 'mb-14 max-w-3xl'}>
      <span className="mb-4 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        {eyebrow}
      </span>
      <h2 className="text-balance text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
