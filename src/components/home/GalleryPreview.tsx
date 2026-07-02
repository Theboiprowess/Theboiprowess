"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7ef0?w=600",
  "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600",
];

export default function GalleryPreview() {
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
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
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
