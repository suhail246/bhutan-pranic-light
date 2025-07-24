"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Liam Schmidt",
    position: "Teacher",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Attending the Pranic Healing course in Thimphu was a life-changing experience. The techniques helped me manage stress and feel more aligned spiritually.”",
  },
  {
    name: "Sonam Choden",
    position: "Teacher",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Attending the Pranic Healing course in Thimphu was a life-changing experience. The techniques helped me manage stress and feel more aligned spiritually.”",
  },
  {
    name: "Ahmed Musa",
    position: "Teacher",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    review:
      "Attending the Pranic Healing course in Thimphu was a life-changing experience. The techniques helped me manage stress and feel more aligned spiritually.”",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[index];

  return (
    <div className="w-full h-full mt-[50px]">
      <div className="max-screen-width mx-auto bg-white flex flex-col lg:flex-row overflow-hidden mt-24">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 py-12 md:py-16 flex flex-col justify-center gap-5">
          <span className="primary-font-family inline-block bg-gray-200 text-sm px-4 py-1 rounded-md font-semibold w-fit">
            TESTIMONIAL
          </span>

          <h2 className="primary-font-family text-2xl md:text-4xl font-bold text-[#0b0b28]">
            What Our Attendees Say
          </h2>

          {/* Stars */}
          <div className="flex text-yellow-400 text-xl">
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          {/* Quote */}
          <p className="primary-font-family text-gray-700 text-base md:text-[17px] leading-[28px] relative pr-6">
            “{testimonial.review}”
            <span className="absolute top-[-10px] right-0 text-yellow-400 text-3xl font-bold">
              ”
            </span>
          </p>

          {/* User Info */}
          <div className="flex items-center gap-4 mt-3">
            <img
              src={testimonial.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <div>
              <h4 className="primary-font-family font-bold text-gray-900">
                {testimonial.name}
              </h4>
              <p className="primary-font-family text-sm text-gray-600">
                {testimonial.position}
              </p>
            </div>
            <img
              src={testimonial.companyLogo}
              className="h-6 ml-auto"
              alt="Company"
            />
          </div>

          {/* Arrows */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] lg:w-1/2 relative overflow-hidden">
          <Image
            src="/bhutan-pranic/IMG_3682.JPG"
            alt="Attendees"
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
