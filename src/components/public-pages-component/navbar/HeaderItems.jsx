"use client";

import { getFESettingsFieldValues } from "@/utils/website-settings-helper";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  AppLogo,
  HeaderLinks,
  LanguageSwitcher,
  Menubar,
  ToggleNavMenuItem,
} from "..";

const HeaderItems = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // const [isMenuDropDownOpen, setIsMenuDropDownOpen] = useState(false);
  // const pathname = usePathname();

  // // Extract specific settings from settingsData using a helper function
  // const { show_language_switcher, enable_sticky_header } =
  //   getFESettingsFieldValues(settingsData, [
  //     "show_language_switcher",
  //     "enable_sticky_header",
  //   ]);

  // // Function to update the mobile menu dropdown status based on screen width
  // const updateMenuDropDownStatus = useCallback(() => {
  //   if (window.innerWidth >= 1024) {
  //     setIsMenuDropDownOpen(false);
  //   } else {
  //     setIsMenuDropDownOpen(false);
  //   }
  // }, []);

  // // Add a resize event listener to handle mobile menu dropdown on window resize
  // useEffect(() => {
  //   updateMenuDropDownStatus();
  //   window.addEventListener("resize", updateMenuDropDownStatus);
  //   return () => {
  //     window.removeEventListener("resize", updateMenuDropDownStatus);
  //   };
  // }, [updateMenuDropDownStatus]);

  return (
    <nav
      className={`relative p-4 w-full  top-0 left-0 z-50 flex items-center ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      {/* Left: Logo */}
      <div className="absolute left-6">
        <AppLogo />
      </div>

      {/* Center: Navigation Links */}
      <ul className="mx-auto hidden lg:flex gap-12 text-yellow-400 font-medium items-center">
        <HeaderLinks />
      </ul>
      <div className="absolute right-6 flex space-x-4 text-white">
        <button className="text-white hover:text-gray-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <a href="#" className="text-white hover:text-gray-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" />
          </svg>
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" />
          </svg>
        </a>
      </div>
    </nav>

    // <nav
    //   className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    //     scrolled ? "bg-black shadow-md" : "bg-transparent"
    //   }`}
    // >
    //   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center text-white">
    // {/* AppLogo component: Displays the application logo */}
    // <AppLogo
    // pathname={pathname}
    // filesList={filesList}
    // settingsData={settingsData}
    // enable_sticky_header={enable_sticky_header}
    // />

    // {/* HeaderLinks component: Displays the navigation links (hidden on mobile) */}
    // {/* <ul className="hidden lg:flex items-center"> */}
    // <HeaderLinks
    // pathname={pathname}
    // menuTree={menuTree}
    // currentLanguage={currentLanguage}
    // enable_sticky_header={enable_sticky_header}
    // />
    // {/* </ul>  */}
    // </div>
    // </nav>

    //   {/* LanguageSwitcher component: Displays the language switcher (hidden on mobile) */}
    //   {/* {show_language_switcher && show_language_switcher === 1 ? (
    //       <div className="hidden lg:flex lg:items-center gap-[8px] p-[8px]">
    //         <LanguageSwitcher
    //           pathname={pathname}
    //           languageList={languageList}
    //           currentLanguage={currentLanguage}
    //           enable_sticky_header={enable_sticky_header}
    //         />
    //       </div>
    //     ) : null} */}

    //   {/* Menubar component: Displays the mobile menu toggle button */}
    //   {/* <Menubar
    //       pathname={pathname}
    //       isMenuDropDownOpen={isMenuDropDownOpen}
    //       setIsMenuDropDownOpen={setIsMenuDropDownOpen}
    //     /> */}
    //   {/* </div> */}

    //   {/* Mobile menu dropdown (hidden on larger screens) */}
    //   {/* {menuTree.length > 0 && (
    //     <motion.div
    //       initial={{ maxHeight: 0, opacity: 0 }}
    //       animate={{
    //         maxHeight: isMenuDropDownOpen ? 800 : 0,
    //         opacity: isMenuDropDownOpen ? 1 : 0,
    //       }}
    //       exit={{ maxHeight: 0, opacity: 0 }}
    //       transition={{
    //         duration: 0.4,
    //         ease: [0.12, 0, 0.39, 0],
    //       }}
    //       className={`overflow-hidden lg:hidden transition-300`}
    //     > */}
    //   {/* <ul>
    //         {menuTree.map((eachMenu) =>
    //           eachMenu.children && eachMenu.children.length > 0 ? (
    //             <ToggleNavMenuItem
    //               key={eachMenu._id}
    //               navItemDetails={eachMenu}
    //               pathname={pathname}
    //               currentLanguage={currentLanguage}
    //               isSmallDevice={true}
    //               enable_sticky_header={enable_sticky_header}
    //               setIsMenuDropDownOpen={setIsMenuDropDownOpen}
    //             />
    //           ) : (
    //             <li
    //               key={eachMenu._id}
    //               className={`${
    //                 pathname.startsWith(eachMenu.link) && eachMenu.link !== "/"
    //                   ? "text-orange-500"
    //                   : pathname === "/" && eachMenu.link === "/"
    //                     ? "text-orange-500"
    //                     : "text-black-500"
    //               } text-[18px] font-candara-rg flex items-center gap-2 px-[10px] py-[12px]`}
    //             >
    //               <Link
    //                 href={eachMenu.link}
    //                 onClick={() => setIsMenuDropDownOpen(false)}
    //                 className="px-[10px] py-[6px] flex items-center gap-[8px]"
    //               >
    //                 <span>
    //                   {eachMenu?.name[currentLanguage || "en"] || "Not Found"}
    //                 </span>
    //               </Link>
    //             </li>
    //           )
    //         )}
    //       </ul>

    //       {show_language_switcher && show_language_switcher === 1 ? (
    //         <div className="flex items-center gap-[8px] px-[10px] py-[8px]">
    //           <LanguageSwitcher
    //             pathname={pathname}
    //             languageList={languageList}
    //             currentLanguage={currentLanguage}
    //           />
    //         </div>
    //       ) : null}
    //     </motion.div> */}
    //   {/* )} */}
    // // </header>
  );
};

export default HeaderItems;
