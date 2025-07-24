"use client";

import { Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

const CourseDetailsJumpingLinks = ({
  isOptionsExists,
  isPricingExists,
  isTrainingDetailsExists,
  isFAQsExists,
  slug,
}) => {
  const translate = useTranslations();

  const jumpingLinks = useMemo(() => {
    return [
      {
        id: "course-details-jumping-link-1",
        label: "Options",
        isExists: isOptionsExists,
        link: `${slug}-course-details-options-section`,
      },
      {
        id: "course-details-jumping-link-2",
        label: "Fees",
        isExists: isPricingExists,
        link: `${slug}-course-details-pricing-section`,
      },
      {
        id: "course-details-jumping-link-3",
        label: "Training Details",
        isExists: isTrainingDetailsExists,
        link: `${slug}-course-details-training-details-section`,
      },
      {
        id: "course-details-jumping-link-4",
        label: "FAQs",
        isExists: isFAQsExists,
        link: `${slug}-course-details-faqs-section`,
      },
    ].filter((eachLink) => eachLink.isExists);
  });

  // Function to handle smooth scrolling
  const handleSmoothScroll = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetSection = document.getElementById(id);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth", // Enable smooth scrolling
        block: "start", // Align the top of the section with the top of the viewport
      });
    }
  };

  return (
    <div className="flex items-center justify-center mt-2">
      {jumpingLinks.map((eachLink, index) => (
        <div key={eachLink.id} className="flex items-center">
          {index !== 0 && <Minus className="rotate-[90deg] text-blue-600" />}

          <Link
            href={`#${eachLink.link}`}
            onClick={(e) => handleSmoothScroll(e, eachLink.link)} // Add smooth scroll handler
            className="text-[16px] md:text-[18px] text-blue-600 font-candara-rg hover:text-orange-500 transition-300"
          >
            {translate(eachLink.label)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseDetailsJumpingLinks;
