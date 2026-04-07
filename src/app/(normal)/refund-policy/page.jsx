import HeroBG from "@/conponents/tripHero";
import Link from "next/link";
import React from "react";

const Page = () => {
    return (
        <div>
            <HeroBG text="Refund Policy" />
            <PrivacyPolicy />
        </div>
    );
};

export default Page;

function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

            <p className="mb-4">
                At <strong>Roamify Planners</strong>, we strive to provide the best travel
                experience. This Refund Policy outlines the terms under which refunds
                may be processed for our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Eligibility for Refunds
            </h2>
            <p className="mb-4">
                Refunds may be considered in case of cancellations made within the
                allowed time frame or if a service cannot be delivered as promised.
                Certain bookings (such as hotels, transport, or third-party services)
                may be subject to their own cancellation policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                2. Refund Process
            </h2>
            <p className="mb-4">
                Once your refund request is approved, the refunded amount will be
                credited within <strong>5–7 working days</strong> to the original
                payment method used during booking.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                3. Non-Refundable Situations
            </h2>
            <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Last-minute cancellations</li>
                <li>No-shows for bookings</li>
                <li>Services already utilized</li>
                <li>Non-refundable third-party bookings</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Changes & Cancellations
            </h2>
            <p className="mb-4">
                Any changes or cancellations must be communicated to us in advance.
                Charges may apply depending on the timing and nature of the booking.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">
                5. Contact Us
            </h2>
            <p className="mb-4">
                For any refund-related queries, feel free to reach out to us:
            </p>

            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">Roamify Planners</p>
                <p>📧 roamifyplanners@gmail.com</p>
                <p>📞 +91 8239002370</p>
                <p>
                    🌐{" "}
                    <Link
                        href="https://www.roamifyplanners.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 underline"
                    >
                        www.roamifyplanners.in
                    </Link>
                </p>
            </div>

            <p className="mt-6 text-sm text-gray-500">
                Note: This policy may be updated from time to time. Please review it
                periodically for any changes.
            </p>
        </div>
    );
}
