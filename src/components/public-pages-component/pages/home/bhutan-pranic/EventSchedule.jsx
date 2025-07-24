import React from "react";
import EventCard from "./EventCard";
import EventCalender from "./EventCalender";

const EventSchedule = () => {
  return (
    <div className="w-full bg-[#fdfaf5] h-full mt-[50px]">
      <div className="max-screen-width mx-auto h-[1160px] flex flex-col items-center justify-center relative">
        {/* Label */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="1500"
          data-aos-offset="100"
          className="primary-font-family absolute top-[90px] text-bold bg-gray-200 text-[#000] px-3 rounded mb-4 uppercase tracking-wide"
        >
          <span className="primary-font-family uppercase text-sm font-semibold text-gray-700 px-2 py-1 rounded-[10px] w-fit">
            Event Schudules
          </span>
        </div>

        {/* Heading */}
        <h2
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="1500"
          data-aos-offset="100"
          className="primary-font-family absolute top-[130px] leading-[52px] tracking-[-0.88px] text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Our Events Schedule Plan
        </h2>

        {/* Cards */}
        <EventCalender />
        <div className="absolute top-[430px] flex flex-col gap-7">
          <EventCard src={"/bhutan-pranic/home-page-images/home-img-6.JPG"} />
          <EventCard src={"/bhutan-pranic/bg/_DSC1544.JPG"} />
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
