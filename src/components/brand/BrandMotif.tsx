import Image from "next/image";
import { clsx } from "@/lib/utils/clsx";

export type MotifVariant = "full" | "half" | "quarter" | "background";
export type MotifPosition =
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type BrandMotifProps = {
  /** How much of the artwork is visible. */
  variant?: MotifVariant;
  /** Which side/corner the visible fragment is anchored to. */
  position?: MotifPosition;
  /** Degrees of rotation applied to the artwork (kept subtle by convention). */
  rotation?: number;
  /** 0–1 opacity. */
  opacity?: number;
  /** Scale multiplier on top of the base size. */
  scale?: number;
  /** Apply a very slow continuous rotation (hero/background use only). */
  animate?: boolean;
  /** Extra classes on the outer clipping wrapper — use to size/position it. */
  className?: string;
  /** aria-hidden by default since this is decorative. */
  ariaHidden?: boolean;
  /** Set true only for an above-the-fold placement (e.g. the hero). */
  priority?: boolean;
};

const CLIP_PATHS: Record<string, string> = {
  full: "none",
  "half-left": "inset(0 50% 0 0)",
  "half-right": "inset(0 0 0 50%)",
  "quarter-top-left": "inset(0 50% 50% 0)",
  "quarter-top-right": "inset(0 0 50% 50%)",
  "quarter-bottom-left": "inset(50% 50% 0 0)",
  "quarter-bottom-right": "inset(50% 0 0 50%)",
};

function resolveClipPath(variant: MotifVariant, position: MotifPosition): string {
  if (variant === "full" || variant === "background") return CLIP_PATHS.full;
  if (variant === "half") {
    const side = position === "left" ? "left" : "right";
    return CLIP_PATHS[`half-${side}`];
  }
  const corner = position.startsWith("top-") || position.startsWith("bottom-")
    ? position
    : "bottom-right";
  return CLIP_PATHS[`quarter-${corner}`] ?? CLIP_PATHS.full;
}

/**
 * Renders a crop of the official Buildcon circular brand motif (Kenya red/green colourway).
 * Recognition, not repetition: vary variant/position/rotation/opacity per
 * placement rather than showing the complete artwork everywhere.
 */
export function BrandMotif({
  variant = "full",
  position = "right",
  rotation = 0,
  opacity = 1,
  scale = 1,
  animate = false,
  className,
  ariaHidden = true,
  priority = false,
}: BrandMotifProps) {
  const clipPath = resolveClipPath(variant, position);

  return (
    <div
      aria-hidden={ariaHidden}
      className={clsx("relative pointer-events-none select-none", className)}
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      <div
        className={clsx(
          "relative h-full w-full",
          animate && "motion-safe:animate-spin-slow",
        )}
        style={{
          opacity,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <Image
          src="/brand/buildcon-motif-original.png"
          alt=""
          fill
          sizes="(max-width: 768px) 60vw, 40vw"
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}
