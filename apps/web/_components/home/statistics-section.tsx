const STATS = [
  { value: "480+", label: "Идэвхтэй гишүүн" },
  { value: "4", label: "Хэлтэс" },
  { value: "25+", label: "Жилд зохион байгуулах арга хэмжээ" },
  { value: "15", label: "Байгуулагдснаас хойших жил" },
];

export function StatsSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          БСОН тоон мэдээлэл
        </p>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 max-w-full rounded-2xl border border-border bg-card px-3 py-5 text-center shadow-sm sm:px-6 sm:py-8"
            >
              <div className="font-serif text-2xl font-bold text-primary sm:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
