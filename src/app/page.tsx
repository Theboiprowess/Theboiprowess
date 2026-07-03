import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Features from "@/components/home/Features";
import CallToAction from "@/components/home/CallToAction";
import LatestNews from "@/components/home/LatestNews";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import PageLoadSmokeReveal from "@/components/effects/PageLoadSmokeReveal";
import MouseSmokeTrail from "@/components/effects/MouseSmokeTrail";

export const metadata: Metadata = {
  title: "Home | WISEDELL ACADEMY",
  description: "Welcome to WISEDELL ACADEMY - Empowering Future Leaders Through Academic Excellence",
};

export default function Home() {
  return (
    <PageLoadSmokeReveal duration={1.5} opacity={0.5}>
      <MouseSmokeTrail opacity={0.3} size={40} delay={50} />
      <Hero />
      <Statistics />
      <Features />
      <CallToAction />
      <LatestNews />
      <UpcomingEvents />
      <Testimonials />
      <GalleryPreview />
    </PageLoadSmokeReveal>
  );
}
