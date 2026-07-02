import { Metadata } from "next";
import TeachersGrid from "@/components/teachers/TeachersGrid";

export const metadata: Metadata = {
  title: "Our Teachers | WISEDELL ACADEMY",
  description: "Meet our dedicated team of qualified educators at WISEDELL ACADEMY in Masvingo, Zimbabwe.",
};

export default function TeachersPage() {
  return <TeachersGrid />;
}
