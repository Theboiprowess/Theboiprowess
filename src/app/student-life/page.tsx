import { Metadata } from "next";
import Clubs from "@/components/student-life/Clubs";
import Sports from "@/components/student-life/Sports";
import Activities from "@/components/student-life/Activities";

export const metadata: Metadata = {
  title: "Student Life | WISEDELL ACADEMY",
  description: "Discover the vibrant student life at WISEDELL ACADEMY with clubs, sports, and activities in Masvingo, Zimbabwe.",
};

export default function StudentLifePage() {
  return (
    <>
      <Clubs />
      <Sports />
      <Activities />
    </>
  );
}
