"use client";

import ROUTES from "@/constants/routes";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdClose } from "react-icons/md";

const MobileNavigationDrawer = ({ isOpen, setIsOpen }) => {
  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={isOpen ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className={`absolute lg:hidden top-0 left-0 w-full h-screen overflow-hidden bg-[rgba(66,66,66,0.8)] backdrop-blur-[10px] flex flex-col justify-between p-5 z-[99]`}
    >
      <MdClose
        color="#FBF9ED"
        size="30"
        className="self-end cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {/* Navigation Items Mobile view */}
      <ul className="flex flex-col gap-5 pl-0 mt-5 list-none">
        {[
          { name: "Dashboard", link: ROUTES.ADMIN_DASHBOARD_ECOMMERCE },
          { name: "Services", link: "#" },
          { name: "Features", link: "#" },
          { name: "Plans", link: "#" },
          { name: "Reviews", link: "#" },
          { name: "Team", link: "#" },
          { name: "Contact", link: "#" },
        ].map((item, index) => (
          <Link href={item.link} key={`${item.name}${index}`}>
            <li
              className={`w-fit text-3xl text-[#FBF9ED] font-poppins-sb capitalize cursor-pointer transition-all duration-300`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </motion.div>
  );
};

export default MobileNavigationDrawer;
