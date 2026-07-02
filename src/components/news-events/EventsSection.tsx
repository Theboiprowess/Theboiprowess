"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Term 1 Opening Day",
    description: "Students return for the start of Term 1. Orientation for new students.",
    date: "January 13, 2026",
    time: "7:30 AM",
    location: "School Campus",
    category: "Academic",
  },
  {
    id: 2,
    title: "Term 1 Closing Day",
    description: "End of Term 1. Students collect reports and holiday assignments.",
    date: "April 2, 2026",
    time: "12:00 PM",
    location: "School Campus",
    category: "Academic",
  },
  {
    id: 3,
    title: "Term 2 Opening Day",
    description: "Students return for the start of Term 2.",
    date: "May 5, 2026",
    time: "7:30 AM",
    location: "School Campus",
    category: "Academic",
  },
  {
    id: 4,
    title: "Term 2 Closing Day",
    description: "End of Term 2. Students collect reports and holiday assignments.",
    date: "August 7, 2026",
    time: "12:00 PM",
    location: "School Campus",
    category: "Academic",
  },
  {
    id: 5,
    title: "Term 3 Opening Day",
    description: "Students return for the start of Term 3.",
    date: "September 8, 2026",
    time: "7:30 AM",
    location: "School Campus",
    category: "Academic",
  },
  {
    id: 6,
    title: "Term 3 Closing Day",
    description: "End of Term 3 and academic year. Students collect reports.",
    date: "December 4, 2026",
    time: "12:00 PM",
    location: "School Campus",
    category: "Academic",
  },
];

export default function EventsSection() {
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
            Mark your calendars for these important school events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-3 text-center min-w-[70px]">
                  <div className="text-primary font-bold text-2xl">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-primary text-xs uppercase font-semibold">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-secondary/20 text-secondary text-xs font-semibold px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
