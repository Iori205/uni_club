import { Users, BookOpen, Megaphone, Target } from "lucide-react";

const DEPARTMENTS = [
  {
    icon: Users,
    title: "Удирдах зөвлөл",
    body: "Жилийн үйл ажиллагааны бодлогыг тодорхойлж, байгууллагыг багш нар, хамтрагч талуудын өмнө төлөөлж, бүх хэлтсийн ажлыг удирдан зохицуулна.",
  },
  {
    icon: BookOpen,
    title: "Судалгаа, сургалтын хэлтэс",
    body: "Манлайллын академи, кейс судалгаа, эрдэм шинжилгээний клиник болон эрдмийн ур чадварын сургалтуудыг зохион байгуулна.",
  },
  {
    icon: Megaphone,
    title: "Маркетингийн хэлтэс",
    body: "Албан ёсны мэдээлэл, хэвлэн нийтлэл, дизайн болон байгууллагын кампус доторх ба цахим орчны төлөөллийг хариуцна.",
  },
  {
    icon: Target,
    title: "Зохион байгуулалт төлөвлөлтийн хэлтэс",
    body: "Форум, тэмцээн, гишүүдийн арга хэмжээг эхнээс нь дуустал төлөвлөж, логистик, төсөв, хамтын ажиллагааг зохион байгуулна.",
  },
];

export function DepartmentsSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Хэлтсүүд
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Байгууллага хэрхэн ажилладаг вэ
        </h2>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((dept) => (
            <article
              key={dept.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent">
                <dept.icon className="size-5 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-foreground">
                {dept.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {dept.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
