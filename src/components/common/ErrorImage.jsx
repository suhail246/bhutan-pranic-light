"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ErrorImage = () => {
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
    >
      <Image
        src="/assets/error.svg"
        alt="error image"
        width={400}
        height={400}
      />
    </motion.div>
  );
};

export default ErrorImage;
