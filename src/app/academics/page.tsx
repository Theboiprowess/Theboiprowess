import { Metadata } from "next";
import OLevelSubjects from "@/components/academics/OLevelSubjects";
import ALevelSubjects from "@/components/academics/ALevelSubjects";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Academics",
  description: "Explore our comprehensive O Level and A Level academic programs at WISEDELL ACADEMY in Masvingo, Zimbabwe. We offer sciences, arts, commercial subjects, and more.",
  keywords: ["O Level subjects", "A Level subjects", "academic programs", "science subjects", "arts subjects", "commercial subjects", "Zimbabwe curriculum"],
  canonical: "/academics",
});

export default function AcademicsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Academics", item: "/academics" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <OLevelSubjects />
      <ALevelSubjects />
    </>
  );
}
