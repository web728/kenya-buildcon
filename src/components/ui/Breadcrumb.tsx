import Link from "next/link";
import { event } from "@/config/event";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-border bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-1.5 px-5 py-3 text-xs text-brand-body sm:px-8 lg:px-10">
        <li>
          <Link href="/" className="hover:text-brand-red">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {item.href && i !== items.length - 1 ? (
              <Link href={item.href} className="hover:text-brand-red">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-brand-dark">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
