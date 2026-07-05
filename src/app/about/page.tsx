import { Metadata } from "next";
import History from "@/components/about/History";
import DirectorProfile from "@/components/about/DirectorProfile";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import Timeline from "@/components/about/Timeline";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us",
  description: "Learn about WISEDELL ACADEMY's history, mission, vision, and our commitment to academic excellence in Masvingo, Zimbabwe. Discover our values, leadership, and educational philosophy.",
  keywords: ["about Wisedell Academy", "school history", "mission vision", "core values", "school leadership", "Masvingo school"],
  canonical: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "About", item: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <History />
      <DirectorProfile />
      <MissionVision />
      <CoreValues />
      <Leadership />
      <Timeline />
    </>
  );
}
