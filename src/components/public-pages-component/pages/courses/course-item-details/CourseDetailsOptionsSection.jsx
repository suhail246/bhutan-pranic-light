// "use client";

import { PageNavigationButton } from "@/components/public-pages-component";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import mongoose from "mongoose";
import Image from "next/image";
import { useCallback } from "react";

const CourseDetailsOptionsSection = ({
  files = [],
  optionTitle = "",
  optionHeading = "",
  optionSubHeading = "",
  iconLists = [],
  titleLists = [],
  descriptionLists = [],
  slug = "",
}) => {
  const isTitleMissing = optionTitle.length === 0;
  const isHeadingMissing = optionHeading.length === 0;
  const isSubHeadingMissing = optionSubHeading.length === 0;
  const isItemListMissing =
    iconLists.length === 0 &&
    titleLists.length === 0 &&
    descriptionLists.length === 0;

  // If any of the required data is missing, return null
  if (
    isTitleMissing &&
    isHeadingMissing &&
    isSubHeadingMissing &&
    isItemListMissing
  ) {
    return null;
  }

  const getIconUrl = useCallback((iconId) => {
    if (mongoose.Types.ObjectId.isValid(iconId)) {
      const url = getFileSettingsValue(files, iconId)?.fileUrl || null;

      return url;
    } else {
      return null;
    }
  }, []);

  const renderOptionsIconElement = useCallback((iconId, index) => {
    const url = getIconUrl(iconId);

    if (url) {
      return (
        <div className="size-[44px] rounded-[10px] bg-black-500 overflow-hidden flex items-center justify-center">
          <div className="size-[28px] relative">
            <Image
              src={url}
              alt={`Icon ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vh, 100vh"
            />
          </div>
        </div>
      );
    }
  }, []);

  return (
    <section
      id={`${slug}-course-details-options-section`}
      className="w-full px-[8px] lg:px-[46px] mt-[40px] md:mt-[80px]"
    >
      {/* Options Text details */}
      {!isTitleMissing || !isHeadingMissing || !isSubHeadingMissing ? (
        <div className="flex flex-col md:items-center gap-3 md:gap-5">
          {/* Title */}
          {!isTitleMissing && (
            <PageNavigationButton
              btnText={optionTitle}
              extraClasses="w-fit h-fit"
            />
          )}

          {!isHeadingMissing || !isSubHeadingMissing ? (
            <div className="w-full flex flex-col md:items-center gap-[14px]">
              {!isHeadingMissing && (
                // Heading
                <h1 className="text-[32px] md:text-[55px] font-candara-rg font-bold text-black-500 md:text-center">
                  {optionHeading}
                </h1>
              )}

              {!isSubHeadingMissing && (
                // Sub Heading
                <p className="w-full md:max-w-[651px] text-[16px] md:text-[20px] font-candara-rg text-black-500 leading-[100%] md:text-center">
                  {optionSubHeading}
                </p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Options Item List */}
      {!isItemListMissing && (
        <ul className="w-full flex flex-wrap justify-center gap-5 mt-[24px] md:mt-[54px]">
          {iconLists.map((eachIcon, index) => (
            <li
              key={`course-option-${index + 1}`}
              className="w-full md:max-w-[315px] rounded-[24px] bg-white p-[32px] border border-black-100 flex flex-col gap-[32px] shadow-light hover:translate-y-[-10px] hover:shadow-lg transition-300"
            >
              {/* Option Item Icon */}
              {eachIcon && renderOptionsIconElement(eachIcon, index)}

              {/* Option Item Title and Description */}
              {titleLists?.[index] || descriptionLists?.[index] ? (
                <div className="flex flex-col gap-[8px]">
                  {/* Option Item Title */}
                  {titleLists?.[index] && (
                    <h4 className="text-[23px] text-black-500 font-candara-rg font-bold">
                      {titleLists?.[index]}
                    </h4>
                  )}

                  {/* Option Item Description */}
                  {descriptionLists?.[index] && (
                    <p className="text-[16px] text-[#666D80] font-candara-rg">
                      {descriptionLists?.[index]}
                    </p>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CourseDetailsOptionsSection;
