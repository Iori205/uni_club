import {
  Target,
  Compass,
  GraduationCap,
  Users,
  BookOpen,
  Megaphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Эрхэм зорилго",
    body: "Бизнесийн сургуулийн оюутнуудыг эрдэм судлал, практик үйл ажиллагаа, нийгмийн оролцоогоор дамжуулан чадварлаг, ёс зүйтэй мэргэжилтэн болгон төлөвшүүлэх.",
  },
  {
    icon: Compass,
    title: "Алсын хараа",
    body: "Монгол Улсын их дээд сургуулиудын оюутны байгууллагуудыг тэргүүлэгч, бүс нутагтаа оюутны манлайллын үлгэр жишээ байгууллага байх.",
  },
  {
    icon: GraduationCap,
    title: "Оюутны хөгжил",
    body: "Судалгаа, шинжилгээ, илтгэх ур чадварыг хөгжүүлэх, хичээлийн хөтөлбөрийг нөхөж дэмжих системтэй сургалтууд.",
  },
  {
    icon: Users,
    title: "Манлайлал",
    body: "Хэлтэс, төсөл, арга хэмжээнд бодит хариуцлага хүлээх — гишүүд баг, төсөв, хамтын ажиллагааг өөрсдөө удирдана.",
  },
  {
    icon: BookOpen,
    title: "Мэргэжлийн өсөлт",
    body: "Сургалт, менторшип, салбарын мэргэжилтнүүдтэй хийх хэлэлцүүлэг нь гишүүдийг дадлага, ажлын байранд бэлтгэнэ.",
  },
  {
    icon: Megaphone,
    title: "Хамт олон",
    body: "Курс, мэргэжлээс үл хамааран бие биенээ дэмждэг оюутан, төгсөгчдийн халуун дулаан сүлжээ.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            БСОН-ы тухай
          </p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-normal leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Суралцахуй, үйлчлэл, манлайлал дээр тулгуурласан оюутны байгууллага
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            2011 онд байгуулагдсан БСОН бол Монгол Улсын Их Сургуулийн Бизнесийн
            сургуулийн оюутнуудын албан ёсны байгууллага юм. Бид багш нар,
            төгсөгчид, хамтрагч байгууллагуудтай хамтран гишүүдийнхээ эрдмийн
            болон мэргэжлийн хөгжилд чиглэсэн боломжуудыг бүрдүүлдэг.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="min-w-0 max-w-full rounded-2xl border border-border bg-card py-3 px-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent">
                <feature.icon
                  className="size-5 text-primary"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="mt-4 font-serif text-lg font-normal text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
