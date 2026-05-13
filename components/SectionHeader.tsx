type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Default 'center'. */
  align?: 'center' | 'left';
  /** Default 'wide' (max-w-3xl). 'narrow' usa max-w-2xl. */
  maxWidth?: 'narrow' | 'wide';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  maxWidth = 'wide'
}: SectionHeaderProps) {
  const widthClass = maxWidth === 'narrow' ? 'max-w-2xl' : 'max-w-3xl';
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`mb-12 ${widthClass} ${alignClass}`}>
      <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
