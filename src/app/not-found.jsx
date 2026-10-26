import Link from "next/link";
import { Compass, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="site-container site-section text-center">
      <Compass size={48} className="text-primary mx-auto mb-6" />
      <span className="site-eyebrow">A little off the beaten path</span>
      <h1 className="site-title">Let’s find your way back.</h1>
      <p className="text-sub max-w-md mx-auto mt-5 mb-8">
        We couldn’t find this page. Your next adventure is still out there.
      </p>
      <Link href="/" className="site-button">
        Back to exploring <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
