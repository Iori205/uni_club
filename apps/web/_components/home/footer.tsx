"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsonLogo } from "./brand-mark";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM2.9 8.9h4.16V21H2.9Zm6.55 0h3.99v1.65h.06a4.37 4.37 0 0 1 3.93-2.16c4.2 0 4.98 2.77 4.98 6.37V21h-4.15v-5.36c0-1.28-.02-2.92-1.78-2.92s-2.05 1.39-2.05 2.83V21H9.45Z" />
    </svg>
  );
}

const MENU = [
  { label: "Нүүр", hash: null },
  { label: "Бидний тухай", hash: "about" },
  { label: "Мэдээ", hash: "news" },
  { label: "Үйл ажиллагаа", hash: "events" },
  { label: "Холбоо барих", hash: "contact" },
] as const;

function navHref(hash: string | null, isHome: boolean): string {
  if (isHome) return hash ? `#${hash}` : "#";
  return hash ? `/#${hash}` : "/";
}

export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.4fr]">
          <div>
            <BsonLogo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Монгол Улсын Их Сургуулийн Бизнесийн сургуулийн албан ёсны оюутны
              байгууллага. 2011 оноос хойш манлайлал, судалгаа, мэргэжлийн
              төлөвшлийг дэмжин ажиллаж байна.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Цэс
            </h3>
            <ul className="mt-5 space-y-3">
              {MENU.map((item) => (
                <li key={item.label}>
                  <Link
                    href={navHref(item.hash, isHome)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Холбоо барих
            </h3>
            <ul className="mt-5 space-y-4 text-[15px] text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm">
                  МУИС, Бизнесийн сургууль, 4 дугаар байр, Их сургуулийн гудамж
                  1, Улаанбаатар 14192
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:bson@num.edu.mn"
                  className="transition-colors hover:text-primary"
                >
                  bsonclub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href="tel:+97677307730"
                  className="transition-colors hover:text-primary"
                >
                  +976 8911 8686
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: LinkedinIcon, label: "LinkedIn" },
              ].map((social) => (
                <span key={social.label} className="group/social relative">
                  <span
                    tabIndex={0}
                    aria-label={`${social.label} (удахгүй нэмэгдэнэ)`}
                    title={`${social.label} — удахгүй нэмэгдэнэ`}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground/50 transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:border-primary/40 focus-visible:text-primary focus-visible:outline-none"
                  >
                    <social.icon className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-200 group-hover/social:opacity-100 group-focus-within/social:opacity-100"
                  >
                    {social.label} — удахгүй
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 БСОН, Монгол Улсын Их Сургууль.</p>
          <p>Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
