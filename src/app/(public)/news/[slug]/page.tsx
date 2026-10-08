import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getNewsBySlug } from "@/lib/data/news";
import { event } from "@/config/event";
import { pageMetadata } from "@/lib/seo/pageMetadata";

// MongoDB-backed — must reflect admin publish/unpublish immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "Article Not Found", robots: { index: false, follow: true } };
  return pageMetadata({
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    path: `/news/${slug}`,
    image: item.featuredImageUrl || undefined,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  const date = new Date(item.publishedAt as unknown as string).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.seoDescription || item.excerpt,
    datePublished: new Date(item.publishedAt as unknown as string).toISOString(),
    image: item.featuredImageUrl ? [`${siteUrl}${item.featuredImageUrl}`] : undefined,
    publisher: {
      "@type": "Organization",
      name: event.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logos/kenya-buildcon-logo.png` },
    },
    mainEntityOfPage: `${siteUrl}/news/${slug}`,
  };

  return (
    <article className="bg-white pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <Breadcrumb items={[{ label: "News", href: "/news" }, { label: item.title }]} />
      <Container className="max-w-3xl py-12 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{item.category}</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">{item.title}</h1>
        <p className="mt-3 text-sm text-brand-body">{date}</p>

        {item.featuredImageUrl ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-brand-light">
            <Image src={item.featuredImageUrl} alt={item.title} fill className="object-cover" />
          </div>
        ) : null}

        <div className="prose prose-neutral mt-10 max-w-none text-brand-body">
          {item.body.split("\n\n").map((para: string, i: number) => (
            <p key={i} className="mb-5 leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/news" variant="ghost">
            Back to All News
          </Button>
        </div>
      </Container>
    </article>
  );
}
