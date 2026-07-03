"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { getCopyrightYear } from "@/lib/date-utils";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="WISEDELL ACADEMY Logo" width={48} height={48} className="object-contain" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">WISEDELL</h3>
                <p className="text-xs text-secondary font-semibold">ACADEMY</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering Future Leaders Through Academic Excellence. With God We Work Hard and Shine.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-secondary transition-colors">Academics</Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-secondary transition-colors">Admissions</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-secondary transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-secondary flex-shrink-0" size={20} />
                <span className="text-gray-300">
                  3210 Jongwe Street<br />
                  Pangolin, Masvingo<br />
                  Zimbabwe
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary flex-shrink-0" size={20} />
                <a href="tel:+263778022980" className="text-gray-300 hover:text-secondary transition-colors">
                  +263 77 802 2980
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary flex-shrink-0" size={20} />
                <a href="mailto:wisedellacademy@gmail.com" className="text-gray-300 hover:text-secondary transition-colors">
                  wisedellacademy@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates and news.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {getCopyrightYear(2025)} WISEDELL ACADEMY. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-secondary-light transition-all hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}
