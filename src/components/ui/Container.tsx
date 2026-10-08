import { clsx } from "@/lib/utils/clsx";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
