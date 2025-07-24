"use client";

import { useEffect, useState } from "react";
import CoursePriceCard from "./CoursePriceCard";

const CoursePackagesCardSection = ({
  pricingTypes,
  pricingPackages,
  files,
  currentLanguage = "en",
}) => {
  const [activeTypeTab, setActiveTypeTab] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (pricingTypes.length > 0) {
      setActiveTypeTab(pricingTypes[0]);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const activePackages = activeTypeTab
      ? pricingPackages.filter(
          (pkg) => pkg?.coursePackageType === activeTypeTab
        )
      : [];

    setPackages(activePackages);
  }, [activeTypeTab, pricingPackages]);

  return (
    <>
      {/* Package Types */}
      {pricingTypes?.length > 0 && (
        <ul className="w-full md:min-w-[343px] md:w-fit md:mx-auto flex gap-[4px] mt-5 bg-white border border-black-100 rounded-[12px] p-[4px]">
          {pricingTypes.map((type, index) => (
            <li
              key={`package-type-${index + 1}`}
              onClick={() => setActiveTypeTab(type)}
              className={`${activeTypeTab === pricingTypes[index] ? "bg-orange-500 text-white" : "bg-transparent text-black-500 hover:text-orange-500 transition-300"} w-full text-[14px] font-candara-rg rounded-[10px] px-[10px] py-[8px] text-center cursor-pointer`}
            >
              <span>{type}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Packages List */}
      {packages?.length > 0 ? (
        <ul className={`flex flex-wrap justify-center gap-5 my-5`}>
          {packages.map((withTypePackage) => (
            <CoursePriceCard
              key={withTypePackage._id}
              priceDetails={withTypePackage}
              files={files}
            />
          ))}
        </ul>
      ) : pricingPackages.length > 0 ? (
        <ul
          className={`flex flex-wrap justify-center gap-5 ${packages?.length === 0 ? "mt-[44px]" : "mt-0"}`}
        >
          {pricingPackages.map((nonTypePackage) => (
            <CoursePriceCard
              key={nonTypePackage._id}
              priceDetails={nonTypePackage}
              files={files}
            />
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default CoursePackagesCardSection;
