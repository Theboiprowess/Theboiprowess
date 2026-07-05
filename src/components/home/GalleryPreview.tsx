"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  album: string | null;
  featured: boolean;
  order_index: number;
}

export default function GalleryPreview() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch gallery");
      const data = await response.json();
      // Get first 6 featured images, or first 6 images if no featured ones
      const featured = data.filter((img: GalleryItem) => img.featured).slice(0, 6);
      setGalleryImages(featured.length > 0 ? featured : data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching gallery:", error);
      // Fallback to empty array on error
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) {
    return null; // Don't show section if no images
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Life at WISEDELL ACADEMY
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A glimpse into our vibrant school community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer"
            >
              <img
                src={image.image_url}
                alt={image.title || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            View Full Gallery
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
