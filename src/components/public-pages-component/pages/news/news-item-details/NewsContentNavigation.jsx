"use client";

import { Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewsContentNavigation = ({
  currentLanguage,
  newsArticleDetailsResponse,
  isSmallScreen = false,
}) => {
  const [navigationItems, setNavigationItems] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const doc = document.getElementById("news-article-item-details-container");

    // console.log(doc);

    if (doc) {
      // Get all <section> elements
      const sections = doc.querySelectorAll("section");
      // console.log(sections);

      // Extract section IDs and <h1> textContent
      const navigationFields = [];

      sections.forEach((section) => {
        const h1 = section.querySelector("h1");
        // console.log(h1);
        if (h1) {
          navigationFields.push({ id: section.id, label: h1.textContent });
        }
      });

      // Update state
      setNavigationItems(navigationFields);
    }
  }, [currentLanguage, newsArticleDetailsResponse]);

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
    <>
      {navigationItems.length > 0 ? (
        !isSmallScreen ? (
          <div className="hidden xl:flex flex-col gap-[16px] min-w-[200px]">
            <h6 className="text-[18px] text-black-500 font-candara-rg font-bold">
              {t("Related Content")}
            </h6>

            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)} // Add smooth scroll handler
                className="text-[16px] text-black-300 font-candara-rg hover:text-orange-500 transition-300"
              >
                {item?.label || "Anonymous"}
              </Link>
            ))}
          </div>
        ) : (
          <div className="xl:hidden w-full flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-0">
            {navigationItems.map((item, index) => (
              <div key={item.id}>
                {index !== 0 && (
                  <Minus className="hidden md:inline rotate-[90deg] text-blue-600" />
                )}
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => handleSmoothScroll(e, item.id)} // Add smooth scroll handler
                  className="text-[14px] text-blue-600 font-candara-rg hover:text-orange-500 transition-300"
                >
                  {item?.label || "Anonymous"}
                </Link>
              </div>
            ))}
          </div>
        )
      ) : null}
    </>
  );
};

export default NewsContentNavigation;
