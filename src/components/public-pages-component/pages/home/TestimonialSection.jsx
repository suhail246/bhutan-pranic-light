"use client";

import { useTransformCustomDate } from "@/lib/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CarouselButtons, PageNavigationButton } from "../..";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const TestimonialSection = ({
  currentLanguage,
  activeTestimonials,
  contentData = {},
  extraClasses = "pt-[80px]",
}) => {
  const [sliderRef, setSliderRef] = useState(null);

  const title = contentData?.["home-section-7-testimonial-title"] || "";
  const heading = contentData?.["home-section-7-testimonial-heading"] || "";

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // OnClick Next Slide Function
  const nextSlide = () => {
    sliderRef?.slickNext();
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    sliderRef?.slickPrev();
  };

  return (
    <>
      <section
        id="home-page-testimonial-section"
        className={`w-full ${extraClasses}`}
      >
        <div className="w-full md:px-[60px] flex flex-col items-center md:items-start md:flex-row md:justify-between gap-[14px] md:gap-5">
          {title && (
            <PageNavigationButton btnText={title} extraClasses="md:hidden" />
          )}

          {heading && (
            <h1 className="w-full max-w-[659px] text-center md:text-left text-[28px] md:text-[56px] font-candara-rg font-bold text-black-500 leading-[34.18px] md:leading-[68.36px]">
              {heading}
            </h1>
          )}

          <div className="hidden md:flex items-end gap-5">
            <CarouselButtons
              previousSlideFnc={prevSlide}
              nextSlideFnc={nextSlide}
            />
          </div>
        </div>

        {activeTestimonials.length > 0 && (
          <div className="overflow-hidden w-full mt-5 md:mt-[60px] relative">
            <Slider ref={setSliderRef} {...settings}>
              {activeTestimonials.map((testimonial) => (
                <div key={testimonial._id} className="px-3">
                  <div className="w-full rounded-[20px] border border-black-100 bg-white p-[24px] flex flex-col">
                    {/* Rating */}
                    {testimonial?.rating && (
                      <div className="flex items-center rtl:justify-end gap-[8px]">
                        {/* RATING STAR */}
                        <div className="flex items-center gap-[2px] rtl:order-2">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <React.Fragment key={`star-${index + 1}`}>
                              {index + 1 <=
                              Math.round(Number(testimonial.rating)) ? (
                                <FaStar className="text-[#F89E55]" />
                              ) : (
                                <FaRegStar className="text-black-500/30" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        <span className="text-[16px] text-[#666D80] font-candara-rg leading-[24px] tracking-[-2%]">
                          {testimonial.rating}
                        </span>
                      </div>
                    )}

                    {/* Message */}
                    {testimonial?.message?.[currentLanguage] ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: testimonial.message[currentLanguage],
                        }}
                        className="mt-[12px] text-[14px] md:text-[18px] text-black-500 font-candara-rg leading-[21px] md:leading-[27px] rtl:text-right"
                      />
                    ) : null}

                    {/* Bio */}
                    <div className="mt-[40px] flex items-center rtl:justify-end gap-[12px]">
                      {testimonial?.image?.fileUrl ? (
                        <div className="relative size-[44px] rounded-full overflow-hidden bg-[#D6F5FF] rtl:order-2">
                          <Image
                            src={testimonial.image.fileUrl}
                            alt={
                              testimonial?.name?.[currentLanguage] ||
                              "User Image"
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}

                      {testimonial?.name?.[currentLanguage] ? (
                        <div className="flex flex-col justify-between rtl:items-end gap-[2px]">
                          <h6 className="text-[16px] font-candara-rg font-bold text-black-500 leading-[24px]">
                            {testimonial.name[currentLanguage]}
                          </h6>
                          <span className="text-[14px] font-candara-rg text-[#666D80] leading-[22.4px]">
                            {useTransformCustomDate(testimonial.createdAt)}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </section>
    </>
  );
};

export default TestimonialSection;
