import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | WISEDELL ACADEMY",
  description: "Get in touch with WISEDELL ACADEMY in Masvingo, Zimbabwe. Contact us for inquiries, admissions, and general information.",
};

export default function ContactPage() {
  return (
    <>
      <ContactInfo />
      <ContactForm />
    </>
  );
}
