"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const TopReferralsPages = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { active } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <>
      <div className="mt-5 px-3">
        <div className="flex overflow-hidden rounded-full">
          <div className={`h-[12px] ${active}`} style={{ width: "25%" }}></div>
          <div className="h-[12px] bg-[#299CDB]" style={{ width: "18%" }}></div>
          <div className="h-[12px] bg-[#0AB39C]" style={{ width: "22%" }}></div>
          <div className="h-[12px] bg-[#F7B84B]" style={{ width: "16%" }}></div>
          <div className="h-[12px] bg-[#F06548]" style={{ width: "19%" }}></div>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 px-3 font-poppins-rg text-[14px] text-light-weight-400">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`${active} size-[10px] rounded-full`}></span>
            <p>www.google.com</p>
          </div>
          <span className="text-dark-weight-500 dark:text-light-weight-800">
            24.58%
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`size-[10px] rounded-full bg-[#299CDB]`}></span>
            <p>www.youtube.com</p>
          </div>
          <span className="text-dark-weight-500 dark:text-light-weight-800">
            17.51%
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`size-[10px] rounded-full bg-[#0AB39C]`}></span>
            <p>www.meta.com</p>
          </div>
          <span className="text-dark-weight-500 dark:text-light-weight-800">
            23.05%
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`size-[10px] rounded-full bg-[#F7B84B]`}></span>
            <p>www.medium.com</p>
          </div>
          <span className="text-dark-weight-500 dark:text-light-weight-800">
            12.22%
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`size-[10px] rounded-full bg-[#F06548]`}></span>
            <p>Other</p>
          </div>
          <span className="text-dark-weight-500 dark:text-light-weight-800">
            17.58%
          </span>
        </div>
      </div>

      <div className="mt-5 px-3 text-center font-poppins-rg text-[14px] text-light-weight-400">
        <button type="button" className="underline">
          See All
        </button>
      </div>
    </>
  );
};

export default TopReferralsPages;
