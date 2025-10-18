"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/donate", label: "Donate" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="h-20 flex items-center justify-around px-8 bg-gray-800 text-white">
      <h1>Alpha Donate</h1>
      <nav>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={
                  pathname === link.href ? "text-green-300" : "text-white"
                }
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
