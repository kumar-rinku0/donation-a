"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MotionNav from "@/components/motion-nav";

const navLinks = [
  { id: "/", name: "Home" },
  { id: "/about", name: "About Us" },
  { id: "/donate", name: "Donate" },
];

const MobileNav = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <MotionNav navLinks={navLinks} />
      <Link href={"/"} className="flex">
        <span className="text-xl">Alpha Donate</span>
      </Link>
    </div>
  );
};

const DesktopNav = ({ className }: { className: string }) => {
  const pathname = usePathname();
  return (
    <div className={className}>
      <Link href={"/"} className="flex">
        <span className="text-xl">Alpha Donate</span>
      </Link>
      <div className="flex justify-center items-center gap-8">
        {navLinks.map((link, idx) => {
          return (
            <Link
              href={link.id}
              key={idx}
              title={link.name}
              className={`capitalize ${
                link.id === pathname ? "text-green-700" : "text-black"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-[#e4e6f4] border-b border-gray-300">
      <nav className="px-16 py-8">
        <DesktopNav className="hidden md:flex md:justify-around md:items-center" />
        <MobileNav className="flex md:hidden gap-4 items-center justify-center" />
      </nav>
    </div>
  );
};

export default Navbar;
