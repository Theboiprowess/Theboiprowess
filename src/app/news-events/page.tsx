import { Metadata } from "next";
import NewsSection from "@/components/news-events/NewsSection";
import EventsSection from "@/components/news-events/EventsSection";

export const metadata: Metadata = {
  title: "News & Events | WISEDELL ACADEMY",
  description: "Stay updated with the latest news, announcements, and upcoming events at WISEDELL ACADEMY in Masvingo, Zimbabwe.",
};

export default function NewsEventsPage() {
  return (
    <>
      <NewsSection />
      <EventsSection />
    </>
  );
}
