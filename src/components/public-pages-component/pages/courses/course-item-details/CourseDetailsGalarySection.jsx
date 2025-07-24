"use client";

import { getFileSettingsValue } from "@/utils/website-settings-helper";
import mongoose from "mongoose";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const CourseDetailsGalarySection = ({ files = [], itemList = [], slug }) => {
  const [sliderRef, setSliderRef] = useState(null);

  const isItemListMissing = itemList.length === 0;

  // If any of the required data is missing, return null
  if (isItemListMissing) {
    return null;
  }

  // Slider settings
  const settings = useMemo(() => {
    return {
      // className: "slider variable-width",
      dots: false,
      infinite: true,
      // centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      // speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      variableWidth: true,
    };
  });

  const getImageUrl = useCallback((id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const url = getFileSettingsValue(files, id)?.fileUrl || null;

      return url;
    } else {
      return null;
    }
  }, []);

  const renderImageElement = useCallback((imageId, index) => {
    const url = getImageUrl(imageId);

    if (url) {
      return (
        <Image
          src={url}
          alt={`Galary Image ${index + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vh, 100vh"
          className="object-cover hover:scale-[1.05] transition-300"
        />
      );
    }
  }, []);

  return (
    <section
      id={`${slug}-course-details-galary-section`}
      className="w-full mt-[40px] md:mt-[80px] overflow-hidden rounded-[20px]"
    >
      <Slider
        ref={setSliderRef}
        {...settings}
        className="cursor-grab active:cursor-grabbing"
      >
        {itemList.map(
          (eachItem, index) =>
            eachItem && (
              <div key={`galary-item-${index + 1}`} className={`pr-5`}>
                <div
                  className={`${index % 2 !== 0 ? "w-[274px] lg:w-[322px]" : "w-[274px] lg:w-[525px]"} h-[255px] lg:h-[300px] relative rounded-[20px] overflow-hidden`}
                >
                  {renderImageElement(eachItem, index)}
                </div>
              </div>
            )
        )}
      </Slider>
    </section>
  );
};

export default CourseDetailsGalarySection;
