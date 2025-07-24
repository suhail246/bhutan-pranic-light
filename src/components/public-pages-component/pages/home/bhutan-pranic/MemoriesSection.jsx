"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import ShineOverlay from "./HeroBgImageOpacity";
import Image from "next/image";

const images = [
  "/bhutan-pranic/IMG_7130.JPG",
  "/bhutan-pranic/_DSC0302.JPG",
  "/bhutan-pranic/IMG_3682.JPG",
  "/bhutan-pranic/IMG_6908.JPG",
  "/bhutan-pranic/_DSC0302.JPG",
];

export default function MemoriesSection() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < images.length - 3) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="py-16 bg-white w-full overflow-hidden relative">
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1500"
        data-aos-offset="100"
        className="text-center mb-10"
      >
        <span className="primary-font-family uppercase text-sm font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-[10px] w-fit">
          LAST YEAR MEMORY
        </span>
        <h2 className="primary-font-family text-3xl font-bold mt-3">
          Recent Memories 2024
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Image Cards */}
        <div className="flex overflow-x-hidden transition-all duration-500">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${current * (100 / 3)}%)`,
              minWidth: "100%",
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="min-w-[calc(33.333%-1rem)] rounded-xl overflow-hidden relative"
              >
                <div className="relative w-full h-[500px] group overflow-hidden rounded-xl">
                  {/* IMAGE */}
                  <div className="w-full h-full rounded-[10px] relative overflow-hidden group">
                    <Image
                      src={img}
                      alt="Home"
                      fill
                      sizes="(max-width: 768px) 100vw, 100vw"
                      className="object-cover"
                    />
                    {/* Shine overlay */}
                    <ShineOverlay hoverContainerSize="group-hover:w-[200%] group-hover:h-[200%]" />
                  </div>

                  {/* SLIDE UP BOX */}
                  <div
                    className="
      absolute 
      bottom-[-300px] 
      left-10
      w-[80%] 
      mx-auto
      h-[150px] 
      bg-white 
      text-white 
      flex items-center justify-center 
      translate-y-0 
      group-hover:translate-y-[-350px] 
      transition-all duration-500 ease-in-out
      rounded-t-xl
    "
                  >
                    <div className="w-full h-full py-3 px-2">
                      <div className="w-[100%] px-2 h-full flex justify-space-between">
                        {/* left side */}
                        <div className="flex flex-col gap-[10px]">
                          <button className="rounded-full bg-yellow-200 w-[40px] h-[40px] mt-[5px]">
                            <span className="text-center text-[35px] text-[#000]">
                              <LuArrowUpRight />
                            </span>
                          </button>

                          <h3 className="primary-font-family text-[#000] text-[25px]">
                            Event confrence
                          </h3>
                        </div>
                        <div className="w-[60px] h-[60px] rounded-full">
                          <img
                            src="/bhutan-pranic/app-logo/app-logo.jpg"
                            alt="logo"
                            className="overflow-hidden mt-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
