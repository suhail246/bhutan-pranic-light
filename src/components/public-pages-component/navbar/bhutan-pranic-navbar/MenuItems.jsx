import React from "react";

const MenuItems = ({ dropdownOpen, toggleDropdown }) => {
  return (
    <ul className="primary-font-family hidden md:flex items-center gap-9">
      {["home", "about-us", "Event", "contact-us", "register"].map(
        (menuKey) => (
          <li
            key={menuKey}
            className="relative cursor-pointer capitalize hover:text-[#FFBA00] transition"
            //   onMouseEnter={() => toggleDropdown(menuKey)}
            //   onMouseLeave={() => toggleDropdown(null)} // Optional: hide on leave
          >
            {menuKey}
          </li>
        )
      )}
    </ul>
  );
};

export default MenuItems;
