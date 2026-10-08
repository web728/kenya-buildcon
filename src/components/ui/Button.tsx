import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark focus-visible:outline-brand-red",
  secondary:
    "bg-brand-green text-white hover:bg-brand-green-dark focus-visible:outline-brand-green",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-brand-dark focus-visible:outline-white",
  ghost:
    "border-2 border-brand-dark/15 text-brand-dark hover:border-brand-red hover:text-brand-red focus-visible:outline-brand-red",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-wide transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = clsx(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _href, ...rest } = props as ButtonAsButton;
  void _v;
  void _s;
  void _c;
  void _ch;
  void _href;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
