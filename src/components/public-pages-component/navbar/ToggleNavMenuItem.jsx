"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ToggleNavMenuItem = ({
 isSmallDevice = false,
  setIsMenuDropDownOpen,
}) => {
  const { children, link, name, _id } = navItemDetails;
  const [isToggle, setIsToggle] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // Design After 1024px size (LG)
  if (!isSmallDevice) {
    return (
      <>
        <li
          key={_id}
          onMouseEnter={() => setIsToggle(true)}
          onMouseLeave={() => setIsToggle(false)}
          className={`${pathname === "/" ? (enable_sticky_header === 1 ? "text-black-500" : "text-[#fff]") : "text-black-500"} ${pathname.includes(link) ? "border-b-2 border-orange-500" : ""} transition-300 text-[15px] font-candara-rg flex items-center gap-2 relative px-[10px] py-[6px] cursor-pointer hover:text-orange-500 transition-300`}
        >
          <Link href={link}>
            {name[currentLanguage || "en"] || "Not Found"}
          </Link>

          <ChevronDown
            size={18}
            onClick={() => setIsToggle((prev) => !prev)}
            className={`${isToggle ? "rotate-[180deg]" : "rotate-[0deg]"} transition-300`}
          />

          {/* Dropdown Animation */}
          <AnimatePresence>
            {isToggle && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 w-[300px]
                   bg-white rounded-lg shadow-lg overflow-hidden flex flex-col before:absolute before:inset-0 before:-z-10 before:rounded-lg before:border-[2px] before:border-white/30"
              >
                {/* Dropdown Content Goes Here */}
                {children && children.length > 0
                  ? children.map((eachChild, index) => (
                      <Link
                        key={eachChild._id}
                        href={eachChild.link}
                        className={`${
                          pathname === eachChild.link
                            ? "bg-orange-500 text-white"
                            : ""
                        } hover:bg-orange-500 hover:text-white text-black-500 transition-300 px-4 py-2`}
                      >
                        <li className="text-[15px] font-candara-rg">
                          <span>
                            {eachChild?.name[currentLanguage || "en"] ||
                              "Not Found"}
                          </span>
                        </li>
                      </Link>
                    ))
                  : null}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      </>
    );
  }

  // Design for smaller screens (width < 1024px)
  return (
    <li
      key={_id}
      className={`text-[18px] font-candara-rg cursor-pointer ${
        pathname.startsWith(link) && link !== "/"
          ? "text-orange-500"
          : pathname === "/" && link === "/"
            ? "text-orange-500"
            : "text-black-500"
      }`}
    >
      <div className="flex items-center gap-[8px] px-[10px] py-[12px]">
        <Link
          href={link}
          onClick={() => setIsMenuDropDownOpen(false)}
          className="px-[10px] py-[6px] flex items-center gap-[8px]"
        >
          {name[currentLanguage || "en"] || "Not Found"}
        </Link>

        <ChevronDown
          size={20}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          className={`${isDropDownOpen ? "rotate-[180deg]" : "rotate-[0deg]"} transition-300`}
        />
      </div>

      {/* Dropdown Animation */}
      <AnimatePresence>
        {isDropDownOpen && (
          <ScrollArea
            className={`${enable_sticky_header === 1 ? "w-full h-[300px]" : "w-full h-fit"}`}
          >
            <motion.ul
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: "fit-content", opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-auto px-[20px]"
            >
              {children && children.length > 0
                ? children.map((eachChild, index) => (
                    <li
                      key={eachChild._id}
                      className={`text-[16px] font-candara-rg px-[10px] py-[12px] ${
                        pathname.startsWith(eachChild.link) &&
                        eachChild.link !== "/"
                          ? "text-orange-500"
                          : pathname === "/" && eachChild.link === "/"
                            ? "text-orange-500"
                            : "text-black-500"
                      }`}
                    >
                      <Link
                        href={eachChild.link}
                        onClick={() => setIsMenuDropDownOpen(false)}
                      >
                        <span>
                          {eachChild?.name[currentLanguage || "en"] ||
                            "Not Found"}
                        </span>
                      </Link>
                    </li>
                  ))
                : null}
            </motion.ul>
          </ScrollArea>
        )}
      </AnimatePresence>
    </li>
  );
};

export default ToggleNavMenuItem;
