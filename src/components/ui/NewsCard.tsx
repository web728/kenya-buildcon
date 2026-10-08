import Image from "next/image";
import Link from "next/link";
import type { NewsSummary } from "@/lib/data/news";

export function NewsCard({ item }: { item: NewsSummary }) {
  const date = new Date(item.publishedAt as unknown as string).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-border bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-light">
        {item.featuredImageUrl ? (
          <Image
            src={item.featuredImageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{item.category}</p>
        <p className="mt-1 text-xs text-brand-body">{date}</p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-brand-dark">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-brand-body">{item.excerpt}</p>
      </div>
    </Link>
  );
}
