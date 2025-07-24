import React from "react";
import {
  FaSearch,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaPlus,
} from "react-icons/fa";

const RightSecMenu = () => {
  return (
    <div className="flex items-center gap-5 mr-[100px]">
      {/* Search icon */}
      <button
        aria-label="Search"
        className="hover:text-green-400 transition-colors"
      >
        <FaSearch className="w-5 h-5" />
      </button>

      {/* Divider */}
      <div className="border-l border-white opacity-50 h-5"></div>

      {/* Social Icons */}
      <div className="flex items-center gap-3 text-green-400">
        <a
          href="#facebook"
          aria-label="Facebook"
          className="bg-white hover:bg-[#FFBA00] rounded-full p-2 transition"
        >
          <FaFacebookF className="w-5 h-5" />
        </a>
        <a
          href="#instagram"
          aria-label="Instagram"
          className="bg-white hover:bg-[#FFBA00] rounded-full p-2 transition"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
        <a
          href="#linkedin"
          aria-label="LinkedIn"
          className="bg-white hover:bg-[#FFBA00] rounded-full p-2 transition"
        >
          <FaLinkedinIn className="w-5 h-5" />
        </a>
        <a
          href="#pinterest"
          aria-label="Pinterest"
          className="bg-white hover:bg-[#FFBA00] rounded-full p-2 transition"
        >
          <FaPinterestP className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default RightSecMenu;
