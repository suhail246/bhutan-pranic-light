"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const TabNavigation = ({ activeTabList }) => {
  // If activeTabList is empty, return null
  if (activeTabList.length < 1) return null;

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  // Extract theme data from the store
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  // Handle Tab Change
  const handleTabChange = (index) => {
    const selectedTab = activeTabList[index].tabName;
    const params = new URLSearchParams(searchParams);

    // Update the URL with the selected tab
    params.set("tab", selectedTab);
    history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <ul
      className={`${globalStyleObj.backgroundLight900Dark300} lg:min-w-fit lg:h-fit lg:max-h-[500px] flex flex-wrap lg:flex-col rounded-sm shadow-light p-1`}
    >
      {activeTabList.map((eachTab, index) => (
        <li
          key={eachTab?.sectionName || `cms-section-${index + 1}`}
          onClick={() => handleTabChange(index)}
          className={`text-[14px] font-poppins-rg p-3 rounded-sm cursor-pointer flex-shrink-0 ${
            currentTab === eachTab?.tabName
              ? `${bgColor} ${hoverBgColor} ${textColor} hover:text-white transition-300`
              : "text-dark-weight-400 dark:text-light-weight-450"
          }`}
        >
          {eachTab?.sectionName
            ?.split("-")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ")}
        </li>
      ))}
    </ul>
  );
};

export default TabNavigation;
