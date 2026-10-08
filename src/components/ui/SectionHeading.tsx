import { clsx } from "@/lib/utils/clsx";

export function SectionHeading({
  title,
  intro,
  align = "left",
  light = false,
  className,
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2
        className={clsx(
          "text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight",
          light ? "text-white" : "text-brand-dark",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/80" : "text-brand-body",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
