"use client";
import React, { useEffect, useState } from "react";

export const Renderer = () => {
  const targetDate = new Date().getTime() + 4 * 24 * 60 * 60 * 1000; // 2 days from now

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col text-center gap-5 ml-[150px]">
      <div className="inline-block text-center rounded-lg border border-white/15 bg-white/10 w-[150px] text-white px-[30px] py-[16px] font-bold">
        <span className="text-lg">{timeLeft.days}</span> <br />{" "}
        <span className="text-lg">Days</span>
      </div>
      <div className="inline-block text-center rounded-lg border border-white/15 bg-white/10 w-[150px] text-white px-[30px] py-[16px] font-bold">
        <span className="text-lg">{timeLeft.hours}</span> <br />{" "}
        <span className="text-lg">Hours</span>
      </div>
      <div className="inline-block text-center rounded-lg border border-white/15 bg-white/10 w-[150px] text-white px-[30px] py-[16px] font-bold">
        <span className="text-lg">{timeLeft.minutes}</span> <br />
        <span className="text-lg">Minutes</span>
      </div>
      <div className="inline-block text-center rounded-lg border border-white/15 bg-white/10 w-[150px] text-white px-[30px] py-[16px] font-bold">
        <span className="text-lg">{timeLeft.seconds}</span> <br />{" "}
        <span className="text-lg">Seconds</span>
      </div>
    </div>
  );
};
