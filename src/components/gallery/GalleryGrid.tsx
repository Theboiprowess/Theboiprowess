"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { id: 1, category: "Academic", title: "Classroom Learning", height: "h-64" },
  { id: 2, category: "Sports", title: "Football Match", height: "h-80" },
  { id: 3, category: "Events", title: "School Assembly", height: "h-64" },
  { id: 4, category: "Academic", title: "Mathematics Class", height: "h-72" },
  { id: 5, category: "Sports", title: "Basketball Team", height: "h-64" },
  { id: 6, category: "Events", title: "Prize Giving", height: "h-80" },
  { id: 7, category: "Academic", title: "English Lesson", height: "h-64" },
  { id: 8, category: "Sports", title: "Athletics Day", height: "h-72" },
  { id: 9, category: "Events", title: "Sports Day", height: "h-64" },
  { id: 10, category: "Academic", title: "Commerce Lesson", height: "h-80" },
  { id: 11, category: "Sports", title: "Volleyball Match", height: "h-64" },
  { id: 12, category: "Academic", title: "Heritage Studies", height: "h-72" },
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? galleryImages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      return prev === galleryImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Photo Gallery
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Capturing memorable moments and achievements at WISEDELL ACADEMY
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="break-inside-avoid"
            >
              <div
                onClick={() => setSelectedImage(index)}
                className={`relative ${image.height} bg-gradient-to-br from-primary to-primary-dark rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/50 text-sm">{image.title}</span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">View Image</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 text-white hover:text-secondary transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-white hover:text-secondary transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <div className="max-w-4xl w-full">
              <div className="aspect-video bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mb-4">
                <span className="text-white/50 text-2xl">{galleryImages[selectedImage].title}</span>
              </div>
              <div className="text-center text-white">
                <h3 className="font-heading text-2xl font-bold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-300">{galleryImages[selectedImage].category}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
