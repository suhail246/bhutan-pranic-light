"use client";

import React, { useEffect, useState } from "react";

import NavLogo from "./NavLogo";
import MenuItems from "./MenuItems";
import RightSecMenu from "./RightSecMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // const [dropdownOpen, setDropdownOpen] = useState({
  //   Event: false,
  // });

  const [dropdownOpen, setDropdownOpen] = useState(null);

  // const toggleDropdown = (key) => {
  //   setDropdownOpen(key);
  // };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`px-12 py-2 text-white font-semibold select-none fixed top-0 left-0 w-full z-50 transition duration-500 ease-in-out ${
        scrolled ? "bg-black-400 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1300px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLogo />

        {/* Menu Items */}
        <MenuItems
          dropdownOpen={dropdownOpen}
          // toggleDropdown={toggleDropdown}
        />

        {/* Right section */}
        <RightSecMenu />
      </div>
    </nav>
  );
};

export default Navbar;
