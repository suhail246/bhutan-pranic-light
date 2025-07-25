"use client";

import Countdown from "react-countdown";
import { Renderer } from "./Render";
import HeadingBtn from "./HeadingBtn";
import SummitSection from "./SummitSection";

const BhuHeroSection = () => {
  // Set your target date for the countdown
  const targetDate = new Date("2025-01-15T00:00:00"); // Adjust this to your target date

  return (
    <div
      className="relative h-screen bg-cover"
      style={{
        backgroundImage: 'url("/bhutan-pranic/bg/gradiant-bg-color.jpg")',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bhutan-pranic/bg/_DSC1544.jpg')",
          opacity: "0.2",
        }}
      ></div>
      <div className="max-screen-width mx-auto relative flex flex-col justify-center items-start h-full px-10">
        {/* this is for content area of hero sec */}
        <HeadingBtn />
        {/* this section for upper content in image */}
        <SummitSection />
        <div className="absolute left-[80%] bottom-[110px] w-1/3  h-auto">
          <Renderer />
        </div>
        {/* // hero speaker image */}
        <img
          src="/bhutan-pranic/home-page-images/WhatsApp Image 2025-07-22 at 8.17.52 PM 1.png"
          alt="Hero"
          className="absolute right-[100px] bottom-0 w-[70%] h-auto z-10"
        />
      </div>
    </div>
  );
};
export default BhuHeroSection;
