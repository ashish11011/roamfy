import HeroBG from "@/conponents/tripHero";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <HeroBG text="Privacy Policy" />
      <PrivacyPolicy />
    </div>
  );
};

export default Page;

function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Roamify Planners</strong>, your privacy is important to us.
        This Privacy Policy explains how we collect, use, and safeguard your
        personal information when you interact with us—whether through our
        website, email, phone, or during your trip planning journey.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal details such as your name, contact number, email
        address, travel preferences, and trip-specific requirements when you
        submit a query or request a quote.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To create personalized travel packages for your group</li>
        <li>
          To contact you with trip updates, quotes, or booking confirmations
        </li>
        <li>To respond to your inquiries or support requests</li>
        <li>To improve our offerings based on user feedback</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share your data
        with trusted partners (like hotels, travel vendors, or transport
        services) only as needed to facilitate your trip. These partners are
        required to maintain confidentiality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We use reasonable technical and administrative measures to protect your
        data. However, no method of transmission or electronic storage is
        completely secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request access to your personal data, ask us to correct any
        inaccuracies, or request deletion by contacting us at{" "}
        <strong>roamifyplanners@gmail.com</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy as our services evolve. Changes will
        be reflected on this page with the updated effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have questions about this policy or how we use your information,
        feel free to contact us:
        <br />
        📧 <span className="font-medium">roamifyplanners@gmail.com</span>
        <br />
        📞 <span className="font-medium">+91 8239002370</span>
        <br />
        🌐{" "}
        <span className="font-medium">
          <Link
            href="https://www.roamifyplanners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 underline"
          >
            www.roamifyplanners.com
          </Link>
        </span>
      </p>
    </div>
  );
}
