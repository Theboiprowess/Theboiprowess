import { Metadata } from "next";
import { formatDate } from "@/lib/date-utils";

const effectiveDate = formatDate(new Date());

export const metadata: Metadata = {
  title: "Privacy Policy | WISEDELL ACADEMY",
  description: "Learn how WISEDELL ACADEMY collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-gray-700">
                Wisedell Academy is committed to protecting the privacy of our students, parents, guardians, staff, and website visitors. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">We may collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Home address</li>
                <li>Parent/Guardian information</li>
                <li>Student information</li>
                <li>Date of birth</li>
                <li>Admission details</li>
                <li>Academic records (where applicable)</li>
                <li>Payment information (processed securely through third-party payment providers)</li>
                <li>IP address</li>
                <li>Browser information</li>
                <li>Device information</li>
                <li>Cookies and analytics data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">Your information may be used to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Process admission applications</li>
                <li>Communicate with parents and students</li>
                <li>Manage student records</li>
                <li>Respond to enquiries</li>
                <li>Send important school announcements</li>
                <li>Improve our website</li>
                <li>Maintain website security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">4. Cookies</h2>
              <p className="text-gray-700 mb-4">Our website may use cookies to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Remember user preferences</li>
                <li>Improve website performance</li>
                <li>Analyse visitor traffic</li>
                <li>Enhance user experience</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Users may disable cookies in their browser, although some features may not function correctly.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">5. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell or rent personal information.
              </p>
              <p className="text-gray-700 mb-4">
                Information may only be shared:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>With authorised school staff</li>
                <li>With service providers supporting our operations</li>
                <li>When required by law</li>
                <li>To protect the safety and security of our students and users</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organisational measures to protect personal information from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Unauthorised access</li>
                <li>Loss</li>
                <li>Misuse</li>
                <li>Alteration</li>
                <li>Disclosure</li>
              </ul>
              <p className="text-gray-700 mt-4">
                No online system can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">7. Student Privacy</h2>
              <p className="text-gray-700">
                Student information is treated with strict confidentiality and is only accessible to authorised personnel with legitimate educational or administrative responsibilities.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our website may use third-party services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Google Analytics</li>
                <li>Email providers</li>
                <li>Payment processors</li>
                <li>Cloud hosting (e.g. Vercel)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                These providers maintain their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">9. Your Rights</h2>
              <p className="text-gray-700 mb-4">You may request to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Update your details</li>
                <li>Request deletion where permitted by law</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-700">
                Information relating to children is collected only for educational and administrative purposes and is handled with appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. The latest version will always be published on this website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related enquiries, contact:
              </p>
              <div className="text-gray-700 space-y-2">
                <p><strong>Wisedell Academy</strong></p>
                <p><strong>Email:</strong> wisedellacademy@gmail.com</p>
                <p><strong>Phone:</strong> +263 77 802 2980</p>
                <p><strong>Address:</strong> 3210 Jongwe Street, Pangolin, Masvingo, Zimbabwe</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
