"use client";

import { useFilterActiveNonDefaultItems } from "@/lib/hooks";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const NewsCategoryListingSection = ({
  currentLanguage,
  newsCategoriesResponse,
  selectedCategoryId,
  categoryTitle,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();

  // Filter Active Non-Default Categories
  const activeCategories = useFilterActiveNonDefaultItems(
    newsCategoriesResponse?.fetchData || [],
    "activeStatus"
  );

  const debouncedCategoryQuery = useCallback(
    debounce((query) => {
      const params = new URLSearchParams(searchParams);

      if (query && query !== "all") {
        params.set("category", query);
      } else {
        params.delete("category");
      }

      router.push(`?${params.toString()}`);
    }, 250),
    [searchParams, router]
  );

  const handleCategoryQuery = (e) => {
    debouncedCategoryQuery(e.target.id);
  };

  // Function to delete the "category" query parameter if screen size is < 1280px
  const deleteCategoryOnSmallScreen = useCallback(() => {
    if (window.innerWidth < 1280 && searchParams.has("category")) {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  // Add resize event listener to check screen size
  useEffect(() => {
    deleteCategoryOnSmallScreen();

    window.addEventListener("resize", deleteCategoryOnSmallScreen);

    return () => {
      window.removeEventListener("resize", deleteCategoryOnSmallScreen);
    };
  }, [deleteCategoryOnSmallScreen]);

  // Render the Categories Listing
  if (activeCategories.length > 0) {
    return (
      <div className="hidden xl:flex xl:flex-col xl:gap-[24px] max-w-[250px]">
        {categoryTitle && (
          <h6 className="text-[18px] text-black-500 font-candara-rg font-bold leading-[100%]">
            {categoryTitle}
          </h6>
        )}

        <ul>
          <li
            id="all"
            onClick={handleCategoryQuery}
            className={`px-[16px] py-[4px] rounded-[14px] text-[16px] font-candara-rg cursor-pointer ${!selectedCategoryId ? "text-[#FE7437] bg-[#FFF1EC]" : "text-black-300"}`}
          >
            {t("All Categories")}
          </li>
          {activeCategories.map((category) => (
            <li
              key={category._id}
              id={category._id}
              onClick={handleCategoryQuery}
              className={`px-[16px] py-[4px] rounded-[14px] text-[16px] font-candara-rg cursor-pointer ${selectedCategoryId === category._id ? "text-[#FE7437] bg-[#FFF1EC]" : "text-black-300 hover:text-[#FE7437] transition-300"}`}
            >
              {category?.name?.[currentLanguage] || "Anonymous"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default NewsCategoryListingSection;
