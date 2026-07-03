import { Metadata } from "next";
import { formatDate } from "@/lib/date-utils";

const effectiveDate = formatDate(new Date());

export const metadata: Metadata = {
  title: "Terms of Service | WISEDELL ACADEMY",
  description: "Read the Terms of Service for using the WISEDELL ACADEMY website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">1. Acceptance</h2>
              <p className="text-gray-700">
                By using the Wisedell Academy website, you agree to these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">2. Website Use</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use the website lawfully.</li>
                <li>Provide accurate information.</li>
                <li>Respect the rights of other users.</li>
                <li>Not attempt to interfere with the operation or security of the website.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">3. Admissions</h2>
              <p className="text-gray-700 mb-4">
                Submitting an online application does not guarantee admission.
              </p>
              <p className="text-gray-700">
                Admission decisions remain at the sole discretion of Wisedell Academy and are subject to the school&apos;s admission policies and available places.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">4. Accounts</h2>
              <p className="text-gray-700 mb-4">If an account is provided:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Keep your login credentials secure.</li>
                <li>Do not share your password.</li>
                <li>Notify the school immediately of any unauthorised account access.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Users are responsible for all activity on their accounts.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">5. Payments</h2>
              <p className="text-gray-700 mb-4">Where applicable:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fees must be paid according to the school&apos;s payment policies.</li>
                <li>Online payments are processed by authorised payment providers.</li>
                <li>Applicable refunds are governed by the school&apos;s refund policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All website content, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Logos</li>
                <li>Images</li>
                <li>Graphics</li>
                <li>Documents</li>
                <li>Text</li>
                <li>Videos</li>
                <li>Software</li>
              </ul>
              <p className="text-gray-700 mt-4">
                is the property of Wisedell Academy or its licensors and may not be copied or distributed without written permission.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">7. User Conduct</h2>
              <p className="text-gray-700 mb-4">Users must not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Upload malicious software.</li>
                <li>Attempt unauthorised access.</li>
                <li>Submit false information.</li>
                <li>Abuse communication forms.</li>
                <li>Violate applicable laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">8. Availability</h2>
              <p className="text-gray-700">
                We aim to keep the website available at all times but cannot guarantee uninterrupted access. Maintenance or technical issues may occasionally affect availability.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                Wisedell Academy is not liable for indirect or consequential damages arising from the use of the website, except where required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">10. External Links</h2>
              <p className="text-gray-700">
                The website may contain links to external websites. Wisedell Academy is not responsible for the content, security, or privacy practices of those websites.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">11. Changes to These Terms</h2>
              <p className="text-gray-700">
                We may update these Terms of Service from time to time. Continued use of the website after changes are published constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by the laws of Zimbabwe, and any disputes shall be resolved in the appropriate courts of Zimbabwe.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">13. Contact</h2>
              <p className="text-gray-700 mb-4">
                For questions regarding these Terms:
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
