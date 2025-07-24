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
        Welcome to Roamify Planners. By accessing or using our services, you
        agree to comply with the terms and conditions outlined below. Please
        read them carefully before proceeding with any bookings or queries.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Booking Confirmation
      </h2>
      <p className="mb-4">
        All bookings are subject to availability and will only be confirmed upon
        receipt of the advance payment. The final itinerary will be shared after
        the booking is confirmed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Payments</h2>
      <p className="mb-4">
        Payment must be made in the manner and schedule communicated during the
        booking. Any delay in payment may result in cancellation or change in
        pricing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Cancellations & Refunds
      </h2>
      <p className="mb-4">
        Cancellation charges will apply based on when the cancellation is made
        prior to the departure date. No refunds will be issued for last-minute
        cancellations or no-shows.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Changes to Itinerary
      </h2>
      <p className="mb-4">
        Roamify Planners reserves the right to modify the itinerary due to
        unavoidable circumstances such as weather, strikes, or third-party
        delays. We will inform you of such changes as early as possible.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Responsibility</h2>
      <p className="mb-4">
        While we ensure smooth operations, we are not responsible for delays or
        damages caused by transport providers, hotel staff, or external agencies
        involved in the tour. We act solely as a coordinator.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Travel Documents</h2>
      <p className="mb-4">
        It is the responsibility of the travelers to carry valid ID proofs,
        permits, and any required documents during the trip. We are not liable
        for entry denial by any authority due to missing documents.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Code of Conduct</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          Participants are expected to maintain decorum and respect local
          culture.
        </li>
        <li>
          Any damage to property during the trip will be the sole responsibility
          of the individual/group.
        </li>
        <li>
          Roamify Planners reserves the right to remove any participant
          misbehaving or disrupting the tour experience for others.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Health & Safety</h2>
      <p className="mb-4">
        All participants must disclose any existing medical conditions
        beforehand. Roamify Planners is not responsible for any health issues
        arising during the trip due to undisclosed conditions or negligence.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Force Majeure</h2>
      <p className="mb-4">
        We are not liable for any failure or delay in performance due to causes
        beyond our control, including but not limited to natural disasters,
        political unrest, or transport strikes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Jurisdiction</h2>
      <p className="mb-4">
        All disputes will be subject to the jurisdiction of courts located in
        Jaipur, Rajasthan, India.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h2>
      <p>
        For queries regarding bookings, payments, or policies, contact us at:
        <br />
        📧{" "}
        <Link
          href="mailto:roamifyplanners@gmail.com"
          className="font-medium text-blue-600"
        >
          roamifyplanners@gmail.com
        </Link>
        <br />
        📞 +91 8239002370
      </p>
    </div>
  );
}
