import { BrandMotif } from "./BrandMotif";

/**
 * Standard motif treatment for inner-page hero banners: a large fragment
 * bleeding off the right edge, low enough opacity to stay behind copy.
 */
export function PageHeroMotif({ className }: { className?: string }) {
  return (
    <div
      className={
        "pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 md:block " +
        (className ?? "")
      }
    >
      <BrandMotif variant="half" position="right" opacity={0.14} rotation={-4} className="h-full w-full" />
    </div>
  );
}
