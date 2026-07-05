import { Metadata } from "next";
import TeachersGrid from "@/components/teachers/TeachersGrid";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Our Teachers",
  description: "Meet our dedicated team of qualified educators at WISEDELL ACADEMY in Masvingo, Zimbabwe. Our experienced teachers are committed to academic excellence and student success.",
  keywords: ["teachers", "educators", "qualified teachers", "teaching staff", "school faculty", "Masvingo teachers"],
  canonical: "/teachers",
});

export default function TeachersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Teachers", item: "/teachers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <TeachersGrid />
    </>
  );
}
