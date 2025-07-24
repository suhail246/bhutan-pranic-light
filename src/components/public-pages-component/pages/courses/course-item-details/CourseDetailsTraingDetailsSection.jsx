"use client";

import { CarouselButtons } from "@/components/public-pages-component";
import { useEffect, useRef, useState } from "react";

const CourseDetailsTraingDetailsSection = ({
  heading,
  titleLists = [],
  descriptionLists = [],
  slug,
}) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const tabRefs = useRef([]);

  const isHeadingMissing = heading.length === 0;
  const isItemListMissing =
    titleLists.length === 0 && descriptionLists.length === 0;

  // Scroll active tab into view
  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return; // Skip scroll on first mount
    }

    if (tabRefs.current?.[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  // OnClick Next Slide Function
  const nextSlide = () => {
    sliderRef?.slickNext();

    if (activeTab < titleLists.length - 1) {
      setActiveTab(activeTab + 1);
    }

    const elem = document.getElementById(
      `${slug}-course-details-training-details-section`
    );
    elem.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // OnClick Previous Slide Function
  const prevSlide = () => {
    sliderRef?.slickPrev();

    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }

    const elem = document.getElementById(
      `${slug}-course-details-training-details-section`
    );
    elem.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  // If any of the required data is missing, return null
  if (isHeadingMissing && isItemListMissing) {
    return null;
  }

  return (
    <section
      id={`${slug}-course-details-training-details-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
    >
      {!isHeadingMissing && (
        <h1 className="text-[32px] md:text-[55px] text-black-500 font-candara-rg font-bold md:text-center mb-[14px] md:mb-5">
          {heading}
        </h1>
      )}

      {!isItemListMissing && (
        <div className="w-full max-w-[970px] mx-auto overflow-x-auto scrollbar-hide">
          <ul className="flex flex-shrink-0 gap-3">
            {titleLists.map(
              (eachItem, index) =>
                eachItem && (
                  <button
                    key={`training-details-tab-${index + 1}`}
                    ref={(el) => (tabRefs.current[index] = el)}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`min-w-fit rounded-[12px] px-[14px] py-[12px] text-[18px] md:text-[20px] font-candara-rg cursor-pointer ${activeTab === index ? "bg-orange-500 text-white" : "bg-white text-black-500 border border-black-100"}`}
                  >
                    {eachItem}
                  </button>
                )
            )}
          </ul>
        </div>
      )}

      <div className="w-full md:max-w-[970px] mx-auto rounded-[24px] border border-black-100 bg-white p-[24px] lg:p-[48px] flex flex-col md:flex-row gap-5 lg:gap-[80px] mt-[24px] md:mt-[10px]">
        {titleLists?.[activeTab] && (
          <h1 className="text-[32px] lg:text-[40px] text-black-500 font-candara-rg">
            {titleLists[activeTab]}
          </h1>
        )}

        {descriptionLists?.[activeTab] && (
          <div className="flex flex-col gap-[24px] md:gap-[40px]">
            <div
              dangerouslySetInnerHTML={{
                __html: descriptionLists?.[activeTab],
              }}
              id="course-details-training-details-description-container"
              className="max-w-[613px]"
            ></div>

            <div className="flex items-center gap-4">
              <CarouselButtons
                previousSlideFnc={prevSlide}
                nextSlideFnc={nextSlide}
                btnSize="size-[48px]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseDetailsTraingDetailsSection;
