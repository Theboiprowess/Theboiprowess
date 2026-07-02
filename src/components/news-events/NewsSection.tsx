"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "WISEDELL ACADEMY Achieves 95% Pass Rate in O-Level Examinations",
    excerpt: "Our students have excelled in the 2024 O-Level examinations with a remarkable 95% pass rate, surpassing the national average.",
    date: "January 15, 2024",
    category: "Academic Excellence",
    image: "/news/exam-results.jpg",
  },
  {
    id: 2,
    title: "Student Wins National Essay Competition",
    excerpt: "Congratulations to our Form 4 student for winning first place in the national essay writing competition on environmental sustainability.",
    date: "November 28, 2023",
    category: "Student Achievement",
    image: "/news/essay-competition.jpg",
  },
  {
    id: 3,
    title: "Partnership with Local University Announced",
    excerpt: "WISEDELL ACADEMY has established a partnership with a local university to provide advanced learning opportunities and career guidance for our students.",
    date: "September 15, 2023",
    category: "Partnerships",
    image: "/news/partnership.jpg",
  },
  {
    id: 4,
    title: "Sports Team Regional Champions",
    excerpt: "Our football team has been crowned regional champions after an impressive season, demonstrating teamwork and dedication.",
    date: "August 30, 2023",
    category: "Sports",
    image: "/news/football-champions.jpg",
  },
  {
    id: 5,
    title: "New Classroom Block Opened",
    excerpt: "We are proud to announce the opening of our new classroom block, providing additional learning space for our growing student body.",
    date: "July 20, 2023",
    category: "Infrastructure",
    image: "/news/classroom-block.jpg",
  },
  {
    id: 6,
    title: "Inter-School Sports Competition",
    excerpt: "WISEDELL ACADEMY hosted a successful inter-school sports competition, bringing together schools from across the region.",
    date: "June 15, 2023",
    category: "Sports",
    image: "/news/sports-competition.jpg",
  },
];

export default function NewsSection() {
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
            Latest News
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay informed about the latest happenings at WISEDELL ACADEMY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-white/50 text-sm">News Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-secondary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-primary mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{news.date}</span>
                  </div>
                  <button className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
