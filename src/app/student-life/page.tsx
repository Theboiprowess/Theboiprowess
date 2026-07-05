import { Metadata } from "next";
import Clubs from "@/components/student-life/Clubs";
import Sports from "@/components/student-life/Sports";
import Activities from "@/components/student-life/Activities";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Student Life",
  description: "Discover the vibrant student life at WISEDELL ACADEMY with clubs, sports, and activities in Masvingo, Zimbabwe. We offer a well-rounded education beyond academics.",
  keywords: ["student life", "school clubs", "sports activities", "extracurricular activities", "school sports", "student clubs", "Masvingo school activities"],
  canonical: "/student-life",
});

export default function StudentLifePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Student Life", item: "/student-life" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <Clubs />
      <Sports />
      <Activities />
    </>
  );
}
