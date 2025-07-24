"use client";

import {
  layout,
  sidebarMainSize,
  sidebarSize,
  sidebarView,
  sidebarVisibility,
  toggleStatus,
  topbarColor,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  changeLeftSidebarVisibilityType,
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
} from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ToggleButton = () => {
  const {
    layoutType,
    leftSidebarSizeType,
    toggleButtonStatus,
    leftSidebarSizeMain,
    toggleSmallButtonStatus,
    topbarColorType,
    leftSidebarVisibilityType,
    leftSidebarViewType,
  } = useAppSelector((state) => state.layout);
  const dispatch = useAppDispatch();

  const handleSidebarToggel = () => {
    const status = toggleButtonStatus === toggleStatus.CLOSE;
    const statusSmDevice = toggleSmallButtonStatus === toggleStatus.CLOSE;

    if (window.innerWidth < 768 && layoutType !== layout.HORIZONTAL) {
      dispatch(changeToggleSmallButtonStatus(statusSmDevice));
    } else {
      if (
        layoutType === layout.SEMI_BOX &&
        leftSidebarVisibilityType === sidebarVisibility.HIDDEN
      ) {
        dispatch(changeLeftSidebarVisibilityType(sidebarVisibility.SHOW));
      } else {
        dispatch(changeToggleButtonStatus(status));
      }
    }
  };

  return (
    <button
      onClick={handleSidebarToggel}
      type="button"
      className={`h-full cursor-pointer ${
        leftSidebarSizeMain === sidebarMainSize.SM_HOVER ||
        layoutType === layout.HORIZONTAL ||
        (layoutType === layout.VERTICAL &&
          leftSidebarViewType === sidebarView.DETACHED)
          ? "lg:hidden"
          : ""
      }`}
    >
      {["bar_1", "bar_2", "bar_3"].map((bar) => {
        let dynamicClasses;

        if (
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ||
          (layoutType === layout.HORIZONTAL && !toggleButtonStatus) ||
          (layoutType === layout.TWO_COLUMN && toggleButtonStatus) ||
          (layoutType === layout.SEMI_BOX &&
            leftSidebarVisibilityType === sidebarVisibility.HIDDEN) ||
          window.innerWidth < 768
        ) {
          switch (bar) {
            case "bar_1":
              dynamicClasses =
                "w-[12px] rotate-[40deg] rtl:rotate-[-40deg] translate-y-[3px] translate-x-[13px] rtl:translate-x-[-13px]";
              break;
            case "bar_3":
              dynamicClasses =
                "w-[12px] -rotate-[40deg] rtl:rotate-[40deg] -translate-y-[3px] translate-x-[13px] rtl:translate-x-[-13px]";
              break;
            default:
              dynamicClasses = "w-[22px] rotate-[180deg] rtl:rotate-[-180deg]";
              break;
          }
        } else {
          switch (bar) {
            case "bar_1":
              dynamicClasses = "w-[16px]";
              break;
            case "bar_3":
              dynamicClasses = "w-[12px]";
              break;
            default:
              dynamicClasses = "w-[20px]";
              break;
          }
        }

        return (
          <span
            key={bar}
            className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.backgroundLight200Dark350}` : `${globalStyleObj.topbarDarkToggleBarColor}`} transition-300 my-[4px] block h-[2px] rounded-sm ${dynamicClasses}`}
          ></span>
        );
      })}
    </button>
  );
};

export default ToggleButton;
