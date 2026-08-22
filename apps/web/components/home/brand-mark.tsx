import { cn } from "../../lib/utils";

export function BsonLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-10 items-center justify-center">
        <svg
          viewBox="0 0 40 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-10"
          aria-hidden="true"
        >
          <path
            d="M20 1.5 3 8.2v11.6C3 31 10.3 39.6 20 42.5 29.7 39.6 37 31 37 19.8V8.2L20 1.5Z"
            className="fill-primary"
            stroke="currentColor"
            strokeOpacity="0"
          />
          <path
            d="M20 4.1 5.3 9.9v9.9C5.3 29.6 11.6 37 20 39.7 28.4 37 34.7 29.6 34.7 19.8V9.9L20 4.1Z"
            className="fill-none"
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <text
            x="20"
            y="27"
            textAnchor="middle"
            className="fill-primary-foreground font-sans"
            fontSize="18"
            fontWeight="700"
          >
            B
          </text>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-base font-bold tracking-tight text-foreground">
          БСОН
        </span>
        <span className="mt-0.5 text-[11px] text-muted-foreground">
          Бизнесийн сургууль · МУИС
        </span>
      </div>
    </div>
  );
}
