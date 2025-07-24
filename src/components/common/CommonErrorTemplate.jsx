"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WordFocus } from "..";

const CommonErrorTemplate = ({ errorTitle, errorDescription }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-3 relative">
      {/* Error SVG */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[10%]">
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
            width={250}
            height={200}
          />
        </motion.div>
      </div>
      {/* <h1 className="text-[16px] md:text-[20px] text-dark-weight-400 dark:text-light-weight-800 font-poppins-md mb-4 text-center">
        {errorTitle}
      </h1> */}

      <WordFocus
        sentence={errorTitle}
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

      <p className="text-[13px] md:text-[15px] text-light-weight-400 font-poppins-rg text-center w-full max-w-[500px]">
        {errorDescription}
      </p>
    </div>
  );
};

export default CommonErrorTemplate;
