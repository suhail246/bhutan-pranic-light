"use client";

import {
  ClearCache,
  HomeButton,
  NavbarLanguages,
  NavbarThemeSwitcher,
  NavFullScreenToggleButton,
  NavLogo,
  NavProfile,
  ToggleButton,
} from "../../..";

import {
  layout,
  position,
  sidebarView,
  sidebarVisibility,
  topbarColor,
  widthType,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const Navbar = ({
  layoutType,
  layoutPositionType,
  topbarColorType,
  layoutWidthType,
  leftSidebarVisibilityType,
  leftSidebarViewType,
  userDetails,
}) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { active } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <header
      aria-label="Admin Pages Navbar"
      className={`${
        topbarColorType === topbarColor.LIGHT_COLOR
          ? `${globalStyleObj.backgroundLight900Dark200}`
          : `${active}`
      }
      ${
        layoutType === layout.HORIZONTAL
          ? "px-5 md:px-10 lg:px-[50px]"
          : layoutType === layout.SEMI_BOX
            ? "px-5 2xl:rounded-sm"
            : "px-5"
      }
      ${
        layoutPositionType === position.FIXED
          ? layoutType === layout.VERTICAL &&
            leftSidebarViewType === sidebarView.DETACHED
            ? `sticky w-full lg:fixed lg:left-0 lg:z-[999] lg:px-[50px]`
            : "sticky z-[9]"
          : window.innerWidth < 768
            ? "sticky"
            : layoutType === layout.VERTICAL &&
                leftSidebarViewType === sidebarView.DETACHED
              ? `w-full lg:absolute lg:left-0 lg:z-[999] lg:px-[50px]`
              : ""
      }
      ${globalStyleObj.flexBetween} top-0 h-[70px] border-b dark:border-0`}
    >
      <div
        className={`${globalStyleObj.flexBetween} ${layoutWidthType === widthType.BOXED ? `mx-auto w-full max-w-[1300px]` : `w-full`} h-full`}
      >
        <div className={`${globalStyleObj.flexStart} h-full gap-2 md:gap-5`}>
          {layoutType === layout.HORIZONTAL ? (
            <NavLogo topbarColorType={topbarColorType} />
          ) : layoutType === layout.SEMI_BOX &&
            leftSidebarVisibilityType === sidebarVisibility.HIDDEN ? (
            <NavLogo topbarColorType={topbarColorType} />
          ) : layoutType === layout.VERTICAL &&
            leftSidebarViewType === sidebarView.DETACHED &&
            window.innerWidth > 1024 ? (
            <NavLogo topbarColorType={topbarColorType} />
          ) : null}

          <ToggleButton />
        </div>

        <div className={`${globalStyleObj.flexStart} h-full gap-1 sm:gap-2`}>
          <ClearCache />

          <HomeButton />

          <NavbarLanguages userDetails={userDetails} />

          <NavFullScreenToggleButton />

          <NavbarThemeSwitcher />

          {/* <NavbarNotification /> */}

          <NavProfile userDetails={userDetails} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
