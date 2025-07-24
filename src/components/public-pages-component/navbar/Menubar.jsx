"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Menubar = ({ pathname, isMenuDropDownOpen, setIsMenuDropDownOpen }) => {
  return (
    <motion.button
      type="button"
      onClick={() => setIsMenuDropDownOpen(!isMenuDropDownOpen)}
      initial={{ rotate: 0, opacity: 0.8 }}
      animate={{ rotate: isMenuDropDownOpen ? 90 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="lg:hidden size-[24px] relative"
    >
      <Image
        src={
          isMenuDropDownOpen
            ? "/bin-yaber-assets/icons/menubar/menubar-close.png"
            : "/bin-yaber-assets/icons/menubar/menubar-linear.png"
        }
        alt={isMenuDropDownOpen ? "menubar close" : "menubar linear"}
        fill
        sizes="(max-width: 768px) 24px, 24px"
      />
    </motion.button>
  );
};

export default Menubar;
