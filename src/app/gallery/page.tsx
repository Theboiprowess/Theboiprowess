import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery | WISEDELL ACADEMY",
  description: "Browse our photo gallery showcasing school events, activities, and student achievements at WISEDELL ACADEMY in Masvingo, Zimbabwe.",
};

export default function GalleryPage() {
  return <GalleryGrid />;
}
