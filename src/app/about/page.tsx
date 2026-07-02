import { Metadata } from "next";
import History from "@/components/about/History";
import DirectorProfile from "@/components/about/DirectorProfile";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import Timeline from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "About Us | WISEDELL ACADEMY",
  description: "Learn about WISEDELL ACADEMY's history, mission, vision, and our commitment to academic excellence in Masvingo, Zimbabwe.",
};

export default function AboutPage() {
  return (
    <>
      <History />
      <DirectorProfile />
      <MissionVision />
      <CoreValues />
      <Leadership />
      <Timeline />
    </>
  );
}
