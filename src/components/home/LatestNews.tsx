"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "WISEDELL ACADEMY Celebrates Outstanding O-Level Results",
    excerpt: "Our students have achieved exceptional results in the 2024 O-Level examinations with a 95% pass rate.",
    date: "2024-01-15",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600",
  },
  {
    id: 2,
    title: "New Classroom Block Opened",
    excerpt: "We are excited to announce the opening of our new classroom block, providing additional learning space for our growing student body.",
    date: "2024-01-10",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
  },
  {
    id: 3,
    title: "Sports Day 2024 - A Celebration of Excellence",
    excerpt: "Our annual sports day was a tremendous success with students showcasing their athletic talents and team spirit.",
    date: "2024-01-05",
    category: "Events",
    image: "https://images.unsplash.com/photo-1461896836934-voices-1?w=600",
  },
];

export default function LatestNews() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Latest News
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest happenings at WISEDELL ACADEMY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} />
                  <span>{new Date(item.date).toLocaleDateString("en-ZW")}</span>
                  <span className="text-secondary">• {item.category}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news-events"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            View All News
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
