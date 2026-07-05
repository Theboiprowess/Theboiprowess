import { Metadata } from "next";
import AdmissionRequirements from "@/components/admissions/AdmissionRequirements";
import SchoolFees from "@/components/admissions/SchoolFees";
import ApplicationForm from "@/components/admissions/ApplicationForm";
import { getNextAcademicYear } from "@/lib/date-utils";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

const nextAcademicYear = getNextAcademicYear();

export const metadata: Metadata = generateSEOMetadata({
  title: `Admissions ${nextAcademicYear}`,
  description: `Apply to WISEDELL ACADEMY in Masvingo, Zimbabwe for the ${nextAcademicYear} academic year. Learn about admission requirements, school fees, and start your online application. Limited spaces available.`,
  keywords: ["school admissions", "apply online", "admission requirements", "school fees", "enrollment", "registration", "boarding school", "day school"],
  canonical: "/admissions",
});

export default function AdmissionsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Admissions", item: "/admissions" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <AdmissionRequirements />
      <SchoolFees />
      <ApplicationForm />
    </>
  );
}
