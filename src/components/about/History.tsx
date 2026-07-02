"use client";

import { motion } from "framer-motion";

export default function History() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
            Our History
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Founded in 2021, WISEDELL ACADEMY has grown from a small educational institution to one of Masvingo&apos;s leading private day secondary schools. Our journey began with a vision to provide quality education that nurtures both academic excellence and character development.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Over the years, we have remained committed to our founding principles while continuously evolving to meet the changing needs of our students and the community. Our dedication to holistic education has earned us a reputation for producing well-rounded individuals who excel academically and contribute positively to society.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, WISEDELL ACADEMY stands as a testament to what can be achieved when passion, dedication, and a clear vision come together. We continue to build on our rich heritage while embracing innovation to prepare our students for the challenges and opportunities of the future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
