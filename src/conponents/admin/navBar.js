"use client";
import { LogOut, ArrowUpRight } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBarAdmin() {
  const pathname = usePathname();
  return (
    <header>
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link href="/" aria-label="Roamify Planners website">
          <img
            src="/logo-black.png"
            alt="Roamify Planners"
            className="w-32 h-auto"
          />
        </Link>
        <Link href="/" className="site-text-link">
          View website <ArrowUpRight size={16} />
        </Link>
      </div>
      <nav
        aria-label="Administration"
        className="flex flex-wrap items-center gap-2"
      >
        {navTabs.map((item) => {
          const active =
            pathname === item.href ||
            (item.href === "/admin/group-trips" &&
              pathname === "/admin/group-trip") ||
            (item.href === "/admin" && pathname === "/admin/trip");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary text-white border-primary" : "bg-white border-gray-200 hover:border-primary"}`}
            >
              {item.name}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => signOut()}
          className="site-text-link ml-auto px-3 py-2"
        >
          Sign out <LogOut size={16} />
        </button>
      </nav>
    </header>
  );
}

const navTabs = [
  {
    name: "Trips",
    href: "/admin",
  },
  {
    name: "Group Trips",
    href: "/admin/group-trips",
  },
  {
    name: "Contact Us",
    href: "/admin/contact-us",
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
  },
];
