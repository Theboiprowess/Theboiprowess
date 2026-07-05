import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Gallery",
  description: "Browse our photo gallery showcasing school events, activities, sports, and student achievements at WISEDELL ACADEMY in Masvingo, Zimbabwe. See our vibrant school community in action.",
  keywords: ["school gallery", "photos", "school events", "student activities", "sports photos", "achievements", "Masvingo school"],
  canonical: "/gallery",
});

export default function GalleryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Gallery", item: "/gallery" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <GalleryGrid />
    </>
  );
}
