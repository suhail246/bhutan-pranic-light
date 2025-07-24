"use client";

import {
  CarouselButtons,
  PageNavigationButton,
} from "@/components/public-pages-component";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import mongoose from "mongoose";
import Image from "next/image";
import { useCallback, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const CourseDetailsRegistrationForTrainingsSection = ({
  currentLanguage = "en",
  files = [],
  title,
  heading,
  itemList,
  iconLists = [],
  titleLists = [],
  descriptionLists = [],
  slug,
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const isTitleMissing = title.length === 0;
  const isHeadingMissing = heading.length === 0;
  const isItemListMissing =
    iconLists.length === 0 &&
    titleLists.length === 0 &&
    descriptionLists.length === 0;

  // If any of the required data is missing, return null
  if (isTitleMissing && isHeadingMissing && isItemListMissing) {
    return null;
  }

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    cssEase: "linear",
    variableWidth: true,
    initialSlide: 0,
    afterChange: (current) => {
      setActiveSlide(current);
    },
  };

  // OnClick Next Slide Function
  const nextSlide = () => {
    sliderRef?.slickNext();
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    sliderRef?.slickPrev();
  };

  // Extract image url by its id
  const getImageUrl = useCallback((id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const url = getFileSettingsValue(files, id)?.fileUrl || null;

      return url;
    } else {
      return null;
    }
  }, []);

  // Render Image Element
  const renderImageElement = useCallback((imageId, index) => {
    const url = getImageUrl(imageId);

    if (url) {
      return (
        <div className="w-full h-[427px] rounded-[20px] overflow-hidden relative mt-auto">
          <Image
            src={url}
            alt={`Registration Image ${index + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover hover:scale-[1.05] transition-300"
          />
        </div>
      );
    }
  }, []);

  return (
    <section
      id={`${slug}-course-details-training-registration-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
    >
      {/* Text details */}
      {!isTitleMissing || !isHeadingMissing ? (
        <div className="flex flex-col gap-3 md:gap-5">
          {/* Title */}
          {!isTitleMissing && (
            <PageNavigationButton btnText={title} extraClasses="w-fit h-fit" />
          )}

          <div className="flex items-center justify-between">
            {!isHeadingMissing && (
              // Heading
              <h1 className="text-[32px] md:text-[55px] font-candara-rg font-bold text-black-500">
                {heading}
              </h1>
            )}

            <div
              className={`hidden ${titleLists.length > 3 ? "md:flex md:items-center gap-4" : titleLists.length > 2 ? "md:flex md:items-center lg:hidden gap-4" : ""}`}
            >
              <CarouselButtons
                previousSlideFnc={prevSlide}
                nextSlideFnc={nextSlide}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Slider Registration Process */}
      {!isItemListMissing && (
        <div className="overflow-hidden w-full mt-5 md:mt-[60px] relative">
          <Slider
            ref={setSliderRef}
            key={`${slug}-${currentLanguage}`}
            {...settings}
            className="h-auto cursor-grab active:cursor-grabbing"
            dir="ltr"
          >
            {iconLists.map(
              (eachImage, index) =>
                eachImage && (
                  <div
                    key={`registration-process-${index + 1}`}
                    className="h-full px-2 md:px-3 max-w-[340px] md:max-w-[420px]"
                  >
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-[14px]">
                      <div
                        className={`size-[50px] rounded-[10px] flex items-center justify-center text-[28px] font-candara-rg rtl:order-2 rtl:last:ml-auto ${activeSlide === index ? "text-white bg-orange-500" : "text-black-500 bg-white border border-black-100"}`}
                      >
                        <span>{index + 1}</span>
                      </div>

                      {index < iconLists.length - 1 && (
                        <hr className="border-2 border-[#B4B5B9] border-dashed w-full" />
                      )}
                    </div>

                    {/* Registration info */}
                    <div className="mt-6 md:mt-[32px] flex flex-col justify-between gap-[24px]">
                      {titleLists?.[index] || descriptionLists?.[index] ? (
                        <div className="flex flex-col gap-[14px]">
                          {titleLists?.[index] && (
                            <h5 className="text-[24px] text-black-500 font-candara-rg font-bold rtl:text-right">
                              {titleLists?.[index]}
                            </h5>
                          )}

                          {descriptionLists?.[index] && (
                            <p className="text-[16px] md:text-[18px] text-black-500 font-candara-rg rtl:text-right">
                              {descriptionLists?.[index]}
                            </p>
                          )}
                        </div>
                      ) : null}

                      {renderImageElement(eachImage, index)}
                    </div>
                  </div>
                )
            )}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default CourseDetailsRegistrationForTrainingsSection;
