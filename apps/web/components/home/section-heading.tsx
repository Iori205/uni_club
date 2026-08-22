type SectionHeadingProps = { eyebrow: string; title: string; action?: string };

export function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return <div className="mb-12 flex items-end justify-between gap-8 lg:mb-14"><div><p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#20579d]">{eyebrow}</p><h2 className="max-w-3xl text-3xl font-bold leading-[1.16] tracking-[-0.035em] text-[#202b3e] sm:text-4xl lg:text-[46px]">{title}</h2></div>{action ? <a href="#contact" className="hidden shrink-0 items-center gap-3 pb-1 text-sm font-semibold text-[#263247] transition-colors hover:text-[#20579d] sm:flex">{action}<span aria-hidden>→</span></a> : null}</div>;
}
