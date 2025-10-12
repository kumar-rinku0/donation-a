import React from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/donate", label: "Donate" },
];

const Navbar = () => {
  return (
    <div className="h-20 flex items-center justify-around px-8 bg-gray-800 text-white">
      <h1>Alpa Donate</h1>
      <nav>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
