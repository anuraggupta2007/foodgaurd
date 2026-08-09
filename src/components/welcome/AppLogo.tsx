import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: string;
};

export function AppLogo({ className }: AppLogoProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      aria-hidden={false}
    >
      <div
        className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15 sm:size-[4.5rem]"
        role="img"
        aria-label="Product ingredient analysis"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-9 text-primary sm:size-10"
          aria-hidden="true"
        >
          <path
            d="M24 8c-2.5 0-4.5 2-4.5 4.5v2.2c-6.2 1.4-10.5 7-10.5 13.3 0 7.7 6.3 14 14 14s14-6.3 14-14c0-6.3-4.3-11.9-10.5-13.3V12.5C28.5 10 26.5 8 24 8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 22h8M24 18v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="34"
            cy="34"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M38.5 38.5L42 42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="sr-only">Ingredient Insight</p>
    </div>
  );
}
