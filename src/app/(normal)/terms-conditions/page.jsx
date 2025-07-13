import HeroBG from "@/conponents/tripHero";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <HeroBG text="Terms and Conditions" />
      <TermsAndConditions />
    </div>
  );
};

export default Page;

function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        By accessing and using our website, you agree to comply with and be
        bound by the following terms and conditions. Please read them carefully
        before using our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By using this website, you agree to be bound by these Terms and all
        applicable laws and regulations. If you do not agree with any of these
        terms, you are prohibited from using or accessing this site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use License</h2>
      <p className="mb-4">
        Permission is granted to temporarily download one copy of the materials
        on our website for personal, non-commercial transitory viewing only.
        This is the grant of a license, not a transfer of title.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          You agree not to misuse our services or interfere with their normal
          operation.
        </li>
        <li>
          You agree not to attempt unauthorized access to any part of our
          website.
        </li>
        <li>
          You may not use the site to distribute spam, malware, or other harmful
          content.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Booking & Payments</h2>
      <p className="mb-4">
        All bookings made through our website are subject to availability and
        confirmation. Prices and availability are subject to change without
        prior notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Limitation of Liability
      </h2>
      <p className="mb-4">
        We are not liable for any indirect, incidental, or consequential damages
        that may arise from the use or inability to use our website or services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on this site, including text, graphics, logos, and images,
        is the property of [Your Company Name] and is protected by applicable
        copyright and trademark laws.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifications</h2>
      <p className="mb-4">
        We reserve the right to revise these Terms and Conditions at any time.
        By using this website, you agree to be bound by the current version.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by and construed in accordance with the laws of
        [Your Country/State], and you irrevocably submit to the exclusive
        jurisdiction of the courts in that location.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        9. Contact Information
      </h2>
      <p>
        For any questions or concerns about these Terms and Conditions, you may
        contact us at:
        <br />
        📧{" "}
        <Link
          href={"mailto:rishabh@roamifyplanners.in"}
          className="font-medium text-blue-600"
        >
          rishabh@roamifyplanners.in
        </Link>
      </p>
    </div>
  );
}
