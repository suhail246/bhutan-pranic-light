import React from "react";

import { FaArrowUpRightFromSquare } from "react-icons/fa6"; // Correct for v6 icons
import { FaMicrophoneAlt, FaGlobeAsia } from "react-icons/fa";
import Button from "@/components/public-pages-component/common/BhuYellowBtn";
import { LuArrowUpRight } from "react-icons/lu";
import Image from "next/image";
import ShineOverlay from "./HeroBgImageOpacity";

const ConferenceSection = () => {
  return (
    <div className="w-full px-2">
      <div className="max-screen-width mx-auto bg-white py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Image Section */}
        <div className="flex flex-col w-[100%] h-[550px] relative mt-[20px]">
          <div className="rounded-[10px] relative group w-[100%] h-[50%] overflow-hidden">
            <Image
              src="/bhutan-pranic/IMG_3682.JPG"
              alt="Home About 3"
              fill
              sizes="(max-width: 768px)"
              className="object-cover"
            />

            {/* Shine overlay */}
            <ShineOverlay hoverContainerSize="group-hover:w-[200%] group-hover:h-[300%]" />
          </div>

          <div className="flex gap-4 mt-2 h-[50%]">
            <div className="rounded-[10px] relative group w-[100%] overflow-hidden">
              <Image
                src="/bhutan-pranic/home-page-images/home-img-2.JPG"
                alt="Home About 3"
                fill
                sizes="(max-width: 768px)"
                className="object-cover"
              />

              {/* Shine overlay */}
              <ShineOverlay hoverContainerSize="group-hover:w-[200%] group-hover:h-[300%]" />
            </div>
            <div className="rounded-[10px] relative group w-[100%] overflow-hidden">
              <Image
                src="/bhutan-pranic/home-page-images/home-img-4.JPG"
                alt="Home About 3"
                fill
                sizes="(max-width: 768px)"
                className="object-cover"
              />

              {/* Shine overlay */}
              <ShineOverlay hoverContainerSize="group-hover:w-[200%] group-hover:h-[300%]" />
            </div>
          </div>
          <div className="w-[150px] h-[150px] absolute top-[40%] left-[36%]">
            {/* 🔁 Rotating Yellow SVG */}
            <div className="w-full h-full animate-spin-slow">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z"
                  fill="#FFBA00"
                />
              </svg>
            </div>

            {/* ❌ NOT Rotating Content */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
              <button className="rounded-full bg-[#000] w-[40px] h-[40px] ml-2 flex items-center justify-center">
                <span className="text-center text-[25px] text-white">
                  <LuArrowUpRight />
                </span>
              </button>
              <p className="text-[15px] text-[#000] text-center mt-1">
                Buy ticket
              </p>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col gap-[10px] mt-[10px]">
          <span
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-offset="100"
            className="primary-font-family uppercase text-sm font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-[10px] w-fit"
          >
            About us
          </span>
          <h2 className="primary-font-family text-3xl font-bold leading-snug mt-[5px]">
            Lorem ipsum dolor sit amet.{" "}
          </h2>
          <p
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-offset="100"
            className="primary-font-family text-gray-700"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            minus debitis itaque accusantium pariatur, perferendis hic facilis
            ad porro architecto! Magni illum assumenda suscipit pariatur
            corporis quo repudiandae omnis ut.
          </p>

          {/* Keynotes */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-offset="100"
            className="bg-[#FBF9F4] p-2 mt-[30px] rounded-md flex items-start gap-[15px]"
          >
            <FaMicrophoneAlt
              data-aos="flip-left"
              className="mt-1 text-xl text-black w-[40px] h-[30px] bg-grey-500 rounded-full flex-shrink-0 hover:bg-yellow-200 scale-x-[-1]"
            />
            <div>
              <h3 className="primary-font-family font-semibold">
                Lorem, ipsum.
              </h3>
              <p className="primary-font-family text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dolores nihil, quasi dolorum laboriosam exercitationem nam
                itaque rem repellat natus.
              </p>
            </div>
          </div>

          {/* Off Site Trips */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-offset="100"
            className="bg-[#FBF9F4] p-2 mt-[20px] rounded-md flex items-start gap-[15px]"
          >
            <FaGlobeAsia
              data-aos="flip-left"
              className="mt-1 text-xl text-black w-[40px] h-[30px] bg-grey-500 flex-shrink-0 rounded-full hover:bg-yellow-200 scale-x-[-1]"
            />
            <div>
              <h3 className="primary-font-family font-semibold">
                Lorem, ipsum.
              </h3>
              <p className="primary-font-family text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                eligendi vero eos nihil ipsum placeat error quisquam ipsam
                officiis facilis aperiam, unde at tenetur excepturi ex
                cupiditate reiciendis porro incidunt.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1500"
            data-aos-offset="100"
            className="mt-[20px] mb-3"
          >
            <Button children={"BECOME AN ATTENDEE"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceSection;
