import HeroBG from "@/conponents/tripHero";
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
        At [Your Company Name], we value your privacy and are committed to
        protecting your personal data. This Privacy Policy outlines how we
        collect, use, and safeguard your information when you use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address,
        phone number, and travel preferences when you fill out forms on our site
        or contact us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To provide travel recommendations and customer service</li>
        <li>To send booking confirmations and important updates</li>
        <li>To improve our website and services</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell, trade, or rent your personal information to others. We
        may share your information with trusted third-party partners who assist
        us in operating our site and services, as long as they agree to keep
        this information confidential.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement a variety of security measures to maintain the safety of
        your personal information. However, no method of transmission over the
        Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your personal data by
        contacting us at [support@email.com].
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions regarding this policy, you can contact us at:
        <br />
        📧 <span className="font-medium">support@yourcompany.com</span>
      </p>
    </div>
  );
}
