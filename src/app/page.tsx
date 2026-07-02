import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Features from "@/components/home/Features";
import CallToAction from "@/components/home/CallToAction";
import LatestNews from "@/components/home/LatestNews";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";

export const metadata: Metadata = {
  title: "Home | WISEDELL ACADEMY",
  description: "Welcome to WISEDELL ACADEMY - Empowering Future Leaders Through Academic Excellence",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <Features />
      <CallToAction />
      <LatestNews />
      <UpcomingEvents />
      <Testimonials />
      <GalleryPreview />
    </>
  );
}
