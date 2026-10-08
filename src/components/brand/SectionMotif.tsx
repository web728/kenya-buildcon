import { BrandMotif, type MotifPosition } from "./BrandMotif";
import { clsx } from "@/lib/utils/clsx";

type SectionMotifProps = {
  position?: MotifPosition;
  size?: "sm" | "md" | "lg";
  opacity?: number;
  rotation?: number;
  className?: string;
};

const SIZE_MAP: Record<"sm" | "md" | "lg", string> = {
  sm: "w-[280px] h-[280px] md:w-[380px] md:h-[380px]",
  md: "w-[380px] h-[380px] md:w-[560px] md:h-[560px]",
  lg: "w-[520px] h-[520px] md:w-[760px] md:h-[760px]",
};

const CORNER_OFFSET: Record<string, string> = {
  "top-left": "top-0 left-0 -translate-x-1/3 -translate-y-1/3",
  "top-right": "top-0 right-0 translate-x-1/3 -translate-y-1/3",
  "bottom-left": "bottom-0 left-0 -translate-x-1/3 translate-y-1/3",
  "bottom-right": "bottom-0 right-0 translate-x-1/3 translate-y-1/3",
  left: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  right: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

/**
 * A low-opacity cropped motif fragment for section backgrounds/corners.
 * Place inside a `relative overflow-hidden` section wrapper.
 */
export function SectionMotif({
  position = "bottom-right",
  size = "md",
  opacity = 0.08,
  rotation = 0,
  className,
}: SectionMotifProps) {
  const isQuarter = position.includes("-");
  return (
    <div className={clsx("absolute z-0", SIZE_MAP[size], CORNER_OFFSET[position], className)}>
      <BrandMotif
        variant={isQuarter ? "quarter" : "half"}
        position={position}
        opacity={opacity}
        rotation={rotation}
        className="h-full w-full"
      />
    </div>
  );
}
