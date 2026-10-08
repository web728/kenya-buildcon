import Image from "next/image";
import { event } from "@/config/event";
import { clsx } from "@/lib/utils/clsx";

interface OrganiserLogosProps {
  boxClassName?: string;
  onDark?: boolean;
  showDivider?: boolean;
  className?: string;
}

const ORGANISER_WEBSITES: Record<string, string> = {
  "Futurex Trade Fair & Events Pvt. Ltd.": "https://www.futurextrade.com/",
  "ETSIPL": "https://www.etsipl.in/",
};

export function OrganiserLogos({
  boxClassName,
  onDark = false,
  showDivider = true,
  className,
}: OrganiserLogosProps) {
  return (
    <div
      className={clsx(
        "flex w-full max-w-sm items-center justify-center gap-3 sm:gap-6 lg:max-w-none",
        className
      )}
    >
      {event.organisers.map((org, index) => {
        const websiteUrl =
          ORGANISER_WEBSITES[org.name] ||
          (index === 0 ? "https://www.futurextrade.com/" : "https://www.etsipl.in/");

        return (
          <div key={org.name} className="contents sm:flex sm:items-center sm:gap-6">
            {/* Logo Link Container */}
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${org.name}`}
              className={clsx(
                "relative flex h-14 flex-1 items-center justify-center px-1 transition-all duration-300 hover:opacity-90 active:scale-95 sm:h-16 sm:w-44 sm:flex-none lg:h-20 lg:w-52",
                boxClassName,
                onDark &&
                  "rounded-xl border border-white/10 bg-white/90 p-2.5 shadow-sm backdrop-blur-md hover:bg-white"
              )}
            >
              <Image
                src={org.logo}
                alt={org.name}
                fill
                sizes="(max-width: 640px) 40vw, 210px"
                className="object-contain"
                priority
              />
            </a>

            {/* Vertical Divider (Side-by-side balanced) */}
            {showDivider && index < event.organisers.length - 1 && (
              <span
                aria-hidden="true"
                className={clsx(
                  "h-8 w-[1px] shrink-0",
                  onDark ? "bg-white/20" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}