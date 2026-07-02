import { Metadata } from "next";
import OLevelSubjects from "@/components/academics/OLevelSubjects";
import ALevelSubjects from "@/components/academics/ALevelSubjects";

export const metadata: Metadata = {
  title: "Academics | WISEDELL ACADEMY",
  description: "Explore our comprehensive O Level and A Level academic programs at WISEDELL ACADEMY in Masvingo, Zimbabwe.",
};

export default function AcademicsPage() {
  return (
    <>
      <OLevelSubjects />
      <ALevelSubjects />
    </>
  );
}
