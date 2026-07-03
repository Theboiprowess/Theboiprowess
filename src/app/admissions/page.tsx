import { Metadata } from "next";
import AdmissionRequirements from "@/components/admissions/AdmissionRequirements";
import SchoolFees from "@/components/admissions/SchoolFees";
import ApplicationForm from "@/components/admissions/ApplicationForm";
import { getNextAcademicYear } from "@/lib/date-utils";

const nextAcademicYear = getNextAcademicYear();

export const metadata: Metadata = {
  title: `Admissions ${nextAcademicYear} | WISEDELL ACADEMY`,
  description: `Apply to WISEDELL ACADEMY in Masvingo, Zimbabwe for the ${nextAcademicYear} academic year. Learn about admission requirements, school fees, and start your online application.`,
};

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionRequirements />
      <SchoolFees />
      <ApplicationForm />
    </>
  );
}
