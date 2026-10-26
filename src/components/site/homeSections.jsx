import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  MapPin,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero-grid">
        <div className="home-hero-copy">
          <span className="site-eyebrow">
            A little escape. A whole lot of life.
          </span>
          <h1>
            Find your next
            <br />
            <span>great adventure.</span>
          </h1>
          <p className=" [word-spacing:4px] tracking-wider leading-[1.8rem]">
            Plan your next family holiday, honeymoon or group adventure with
            Roamify Planners. Explore India and international destinations with
            personalized packages, comfortable stays and seamless travel
            arrangements
          </p>
          <div className="hero-actions">
            <Link href="#package" className="site-button">
              Explore trips <ArrowUpRight size={18} />
            </Link>
            <Link
              href="#group-tour-packages"
              className="site-button site-button-outline"
            >
              Find your group <Users size={18} />
            </Link>
          </div>
          <div className="hero-note">
            <Compass size={18} />
            <span>Corporate retreats · College tours · Honeymoon escapes</span>
          </div>
        </div>
        <div className="hero-photography">
          <Image
            src="/15.jpeg"
            alt="Travellers hiking together through the mountains"
            className="hero-main-image"
            width={600}
            height={400}
            fetchPriority="high"
          />
          {/* <img
            src="/hero1.jpg"
            alt="A traveller taking in a waterfall"
            className="hero-inset-image"
          /> */}
          <div className="hero-sticker">
            <Sparkles size={22} className="mb-2" />
            GO PLACES.
            <br />
            MAKE MEMORIES.
          </div>
          {/* <span className="hero-photo-label">
            <MapPin size={14} /> Somewhere beyond the everyday
          </span> */}
        </div>
      </div>
    </section>
  );
}

export function TravelBenefits() {
  const benefits = [
    {
      Icon: Compass,
      title: "Your kind of adventure",
      description: "Trips shaped around what you love.",
    },
    {
      Icon: Users,
      title: "Better when shared",
      description: "Group getaways with room to be yourself.",
    },
    {
      Icon: Plane,
      title: "We take care of the details",
      description: "From the first plan to the journey home.",
    },
  ];
  return (
    <section className="travel-perks" aria-label="Travel with Roamify">
      <div className="site-container travel-perks-grid">
        {benefits.map(({ Icon, title, description }) => (
          <div key={title} className="travel-perk">
            <Icon size={28} strokeWidth={1.5} />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PlanningSteps() {
  const steps = [
    [
      "Tell us your travel story",
      "A team retreat, a college escape, or a trip for two. Share your destination, dates, and the things you love.",
    ],
    [
      "Leave the planning to us",
      "We bring the stays, transport, sightseeing, and little details together into a trip that feels like you.",
    ],
    [
      "Pack your bags. Make memories.",
      "Show up for the views, the conversations, and the moments you’ll talk about long after you’re home.",
    ],
  ];
  return (
    <section className="site-section">
      <div className="site-container planning-grid">
        <img
          src="/about-us-1.jpeg"
          alt="Travellers exploring together"
          className="planning-image"
          loading="lazy"
        />
        <div>
          <span className="site-eyebrow">Less planning. More living.</span>
          <h2 className="site-title">
            Your next story starts with a simple plan.
          </h2>
          <div className="mt-6">
            {steps.map(([title, description], index) => (
              <div className="planning-step" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/contact-us" className="site-text-link mt-8">
            Let’s plan your trip <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
