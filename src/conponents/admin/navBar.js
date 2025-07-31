"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBarAdmin() {
  const pathname = usePathname();

  return (
    <div className=" flex items-center gap-2">
      {navTabs.map((item) => {
        return (
          <Link
            key={item.href}
            className={cn(
              " border border-gray-300 rounded py-1.5 font-medium text-sm px-6 hover:bg-gray-100 cursor-pointer",
              pathname === item.href && "bg-green-300"
            )}
            href={item.href}
          >
            {item.name}
          </Link>
        );
      })}
      <Button className={"ml-auto"} onClick={() => signOut()}>
        Signout
      </Button>
    </div>
  );
}

const navTabs = [
  {
    name: "Home",
    href: "/admin",
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
