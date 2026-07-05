import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema, generateJsonLd } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us",
  description: "Get in touch with WISEDELL ACADEMY in Masvingo, Zimbabwe. Contact us for admissions inquiries, general information, or to schedule a school visit. Our team is ready to assist you.",
  keywords: ["contact Wisedell Academy", "school contact", "admissions inquiry", "school visit", "Masvingo school contact", "phone number", "email address"],
  canonical: "/contact",
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
