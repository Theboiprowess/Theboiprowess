"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { getCurrentYear } from "@/lib/date-utils";

const currentYear = getCurrentYear();

const events = [
  {
    id: 1,
    title: "Term 1 Opening Day",
    date: `${currentYear}-01-13`,
    time: "07:30",
    location: "School Campus",
    description: "Students return for the start of Term 1. Orientation for new students.",
  },
  {
    id: 2,
    title: "Term 1 Closing Day",
    date: `${currentYear}-04-02`,
    time: "12:00",
    location: "School Campus",
    description: "End of Term 1. Students collect reports and holiday assignments.",
  },
  {
    id: 3,
    title: "Term 2 Opening Day",
    date: `${currentYear}-05-05`,
    time: "07:30",
    location: "School Campus",
    description: "Students return for the start of Term 2.",
  },
];

export default function UpcomingEvents() {
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
            Upcoming Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mark your calendars for these important events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-primary font-bold text-lg mb-2">
                  <Calendar size={20} />
                  {new Date(event.date).toLocaleDateString("en-ZW", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  {event.time}
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">
                {event.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin size={18} />
                <span>{event.location}</span>
              </div>
              <p className="text-gray-600 mb-4">{event.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news-events"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            View All Events
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
