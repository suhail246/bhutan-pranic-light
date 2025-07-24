"use client";

import { IoIosArrowForward } from "react-icons/io";

import { sidebarView } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";

const Breadcrumb = ({ currentTab, mainParentTab, firstChildTab }) => {
  const { leftSidebarViewType } = useAppSelector((state) => state.layout);

  return (
    <div
      className={`${globalStyleObj.flexBetween} ${leftSidebarViewType === sidebarView.DETACHED ? "bg-transparent" : `${globalStyleObj.backgroundLight900Dark300} shadow-light`} absolute left-0 top-0 w-full px-5 py-3`}
    >
      <h4
        className={`font-poppins-sb text-[10px] sm:text-[15px] uppercase text-dark-weight-550 dark:text-light-weight-800 tracking-tight sm:tracking-normal`}
      >
        {currentTab}
      </h4>
      <div className={`${globalStyleObj.flexCenter} gap-1 sm:gap-2`}>
        <h5
          className={`text-[10px] sm:text-[13px] font-poppins-rg tracking-tight sm:tracking-normal text-light-weight-400`}
        >
          {mainParentTab}
        </h5>
        {firstChildTab && (
          <>
            <IoIosArrowForward size={13} className="text-light-weight-400" />
            <h5
              className={`text-[10px] sm:text-[13px] font-poppins-rg text-light-weight-400 tracking-tight sm:tracking-normal`}
            >
              {firstChildTab}
            </h5>
          </>
        )}

        {mainParentTab && (
          <IoIosArrowForward size={13} className="text-light-weight-400" />
        )}

        <h5
          className={`text-[10px] sm:text-[13px] font-poppins-rg tracking-tight sm:tracking-normal text-dark-weight-550 dark:text-light-weight-800`}
        >
          {currentTab}
        </h5>
      </div>
    </div>
  );
};

export default Breadcrumb;
