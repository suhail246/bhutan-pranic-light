"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CommingSoonImage = () => {
  return (
    <motion.div
      initial={{ y: "-20px" }}
      animate={{ y: ["-20px", 0, "-20px"] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity, // Infinite loop
        repeatType: "loop",
      }}
      className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] relative"
    >
      <Image
        src="/assets/comingsoon.png"
        alt="comming soon"
        fill
        sizes="(max-width: 576px) 150px, 200px"
        loading="lazy"
        className="bg-cover"
      />
    </motion.div>
  );
};

export default CommingSoonImage;
