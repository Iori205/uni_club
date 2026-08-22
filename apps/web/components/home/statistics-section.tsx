const STATS = [
  { value: "480+", label: "Идэвхтэй гишүүн" },
  { value: "4", label: "Хэлтэс" },
  { value: "25+", label: "Жилд зохион байгуулах арга хэмжээ" },
  { value: "15", label: "Байгуулагдснаас хойших жил" },
];

export function StatsSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          БСОН тоон мэдээлэл
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm"
            >
              <div className="font-serif text-4xl font-bold text-primary lg:text-5xl">
                {stat.value}
              </div>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
