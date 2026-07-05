import { Metadata } from "next";
import NewsSection from "@/components/news-events/NewsSection";
import EventsSection from "@/components/news-events/EventsSection";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "News & Events",
  description: "Stay updated with the latest news, announcements, and upcoming events at WISEDELL ACADEMY in Masvingo, Zimbabwe. Read about school achievements, important dates, and community activities.",
  keywords: ["school news", "school events", "announcements", "academic calendar", "school activities", "Masvingo school news", "upcoming events"],
  canonical: "/news-events",
});

export default function NewsEventsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "News & Events", item: "/news-events" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <NewsSection />
      <EventsSection />
    </>
  );
}
