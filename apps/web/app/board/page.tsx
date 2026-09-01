import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBoardMembers } from "../../lib/board-data";
import { SafeImage } from "../../_components/ui/safe-image";
import { EmptyState } from "../../_components/ui/empty-state";

export const metadata: Metadata = {
  title: "Удирдах зөвлөл | БСОН",
  description: "БСОН-ы удирдах зөвлөлийн гишүүдийн танилцуулга.",
};

export default async function BoardPage() {
  const members = await getBoardMembers().catch(() => []);
  const chairman = members.find(
    (m) => m.role === "Удирдах зөвлөлийн тэргүүн",
  );
  const viceChairman = members.find((m) => m.role === "Дэд тэргүүн");
  const leadNames = new Set(
    [chairman?.name, viceChairman?.name].filter(Boolean),
  );
  const leads = [chairman, viceChairman].filter(
    (m): m is NonNullable<typeof m> => Boolean(m),
  );
  const restMembers = members.filter((m) => !leadNames.has(m.name));

  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-5xl px-5 pt-6 pb-14 lg:px-8 lg:pt-6 lg:pb-16">
        <Link
          href="/#departments"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary md:absolute md:top-8 md:left-14"
        >
          <ArrowLeft className="size-4" />
          Буцах
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Удирдах зөвлөл
        </p>
        <h1 className="mt-3 font-serif text-3xl font-normal tracking-tight text-foreground lg:text-4xl">
          Удирдах зөвлөлийн гишүүд
        </h1>

        {members.length === 0 ? (
          <div className="mt-9">
            <EmptyState message="Удирдах зөвлөлийн мэдээлэл одоогоор алга байна." />
          </div>
        ) : (
          <>
            {leads.length > 0 && (
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                {leads.map((member) => (
                  <article
                    key={member.name}
                    className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:text-left"
                  >
                    <SafeImage
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      className="size-20 shrink-0 rounded-full object-cover sm:size-24"
                    />
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {member.role}
                      </p>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {restMembers.length > 0 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {restMembers.map((member) => (
                  <article
                    key={member.name}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:text-left"
                  >
                    <SafeImage
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      className="size-14 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="font-serif text-base font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-primary">
                        {member.role}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
