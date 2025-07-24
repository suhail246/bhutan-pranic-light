"use client";
import { useState } from "react";

const EventCalender = () => {
  const [activeDay, setActiveDay] = useState(2); // Default active is Day 02

  const days = [
    { id: 1, day: "Day 01", date: "01", month: "January ", year: "2025" },
    { id: 2, day: "Day 02", date: "08", month: "JAN", year: "2025" },
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="1500"
      data-aos-offset="100"
      className="flex gap-6 flex-wrap justify-center absolute top-[225px]"
    >
      {days.map((item) => {
        const isActive = item.id === activeDay;

        return (
          <div
            key={item.id}
            onClick={() => setActiveDay(item.id)}
            className={`w-32 text-center shadow-md cursor-pointer rounded-md transition-all duration-300 ease-in-out`}
          >
            {/* Top Header */}
            <div
              className={`py-2 text-sm font-semibold ${
                isActive
                  ? "bg-black-400 text-white rounded-t-md"
                  : "bg-grey text-gray-600 rounded-t-md"
              }`}
            >
              {item.day}
            </div>

            {/* Bottom Content */}
            {/* Bottom Content */}

            <div
              className={`py-4 ${
                isActive
                  ? "bg-yellow-200 text-black rounded-b-md"
                  : "bg-white text-black rounded-b-md"
              }`}
            >
              <p className="text-3xl font-bold">{item.date}</p>
              <p className="text-sm font-semibold">{item.month}</p>
              <p
                className={`text-sm font-semibold ${
                  isActive ? "" : "text-gray-600"
                }`}
              >
                {item.year}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventCalender;
