import type { Metadata } from "next";
import { JoinForm } from "../../_components/join/join-form";

export const metadata: Metadata = {
  title: "Нэгдэх | БСОН",
  description: "БСОН клубт гишүүнээр элсэх эсвэл бидэнтэй холбогдох хүсэлт илгээх.",
};

export default function JoinPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-2xl px-5 py-14 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Нэгдэх / Холбоо барих
        </p>
        <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
          БСОН-ы нэг хэсэг болоорой
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">
          Гишүүнчлэл нь МУИС-ийн Бизнесийн сургуулийн бүх оюутанд нээлттэй.
          Доорх маягтыг бөглөвөл бид тантай удахгүй холбогдох болно.
        </p>

        <div className="mt-8">
          <JoinForm />
        </div>
      </div>
    </section>
  );
}
