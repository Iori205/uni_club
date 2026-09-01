import Link from "next/link";
import { SearchX } from "lucide-react";
import { LinkButton } from "../_components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-background">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-5 py-24 text-center lg:px-8">
        <SearchX className="size-12 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-serif text-3xl font-normal text-foreground">
          Хуудас олдсонгүй
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Таны хайж буй хуудас олдсонгүй эсвэл устсан байж болзошгүй.
        </p>
        <LinkButton
          href="/"
          className="mt-2 h-10 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Нүүр хуудас руу буцах
        </LinkButton>
        <Link
          href="/news"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Эсвэл мэдээ үзэх
        </Link>
      </div>
    </section>
  );
}
