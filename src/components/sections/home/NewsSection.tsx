import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NewsCard } from "@/components/ui/NewsCard";
import { getPublishedNews } from "@/lib/data/news";

export async function NewsSection() {
  const news = await getPublishedNews(3);
  if (news.length === 0) return null;

  return (
    <section className="bg-brand-light py-24 sm:py-28">
      <Container>
        <SectionHeading title="Show Updates & Industry News" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
        </div>

        <div className="mt-12">
          <Button href="/news" variant="ghost">
            View All News
          </Button>
        </div>
      </Container>
    </section>
  );
}
