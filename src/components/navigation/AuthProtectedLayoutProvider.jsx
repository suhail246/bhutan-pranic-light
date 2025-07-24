"use client";

import NextTopLoader from "nextjs-toploader";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Footer,
  LeftSidebar,
  LeftTwoColumnSidebar,
  LoadingUI,
  Navbar,
  RightSidebar,
} from "..";

import {
  layout,
  loader,
  position,
  sidebarMainSize,
  sidebarSize,
  sidebarView,
  sidebarVisibility,
  toggleStatus,
  widthType,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import {
  changeLeftSideBarSizeType,
  changeLeftSidebarVisibilityType,
  changeToggleButtonStatus,
} from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const AuthProtectedLayoutProvider = ({
  children,
  userDetails,
  permissionsList,
}) => {
  const {
    layoutType,
    layoutWidthType,
    leftSidebarSizeType,
    leftSidebarSizeMain,
    preloader,
    toggleButtonStatus,
    toggleSmallButtonStatus,
    layoutPositionType,
    topbarColorType,
    layoutThemePrimaryColorType,
    leftSidebarVisibilityType,
    leftSidebarViewType,
  } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();
  const [bodyLeftMargin, setBodyLeftMargin] = useState("");
  const [leftSidebarWidth, setLeftSidebarWidth] = useState("");
  const [horizontalNavHeight, setHorizontalNavHeight] = useState("");
  const [isScrollTop, setIsScrollTop] = useState(false);
  const handleScrolled = useRef(false);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;

    if (width < 768) {
      // Small Screen
      if (layoutType === layout.HORIZONTAL) {
        setHorizontalNavHeight(toggleButtonStatus ? "max-h-[355px]" : "h-0");
      } else {
        setLeftSidebarWidth(
          toggleSmallButtonStatus ? "w-[250px] fixed" : "hidden"
        );
        setBodyLeftMargin(toggleSmallButtonStatus ? "" : "ml-0");
        dispatch(
          toggleSmallButtonStatus
            ? changeLeftSideBarSizeType(sidebarSize.DEFAULT)
            : changeLeftSidebarVisibilityType(sidebarVisibility.SHOW)
        );
      }
    } else if (width < 1025) {
      // Medium Screen
      if (layoutType === layout.HORIZONTAL) {
        setHorizontalNavHeight(toggleButtonStatus ? "max-h-[355px]" : "h-0");
      } else if (layoutType === layout.TWO_COLUMN) {
        setBodyLeftMargin(
          toggleButtonStatus
            ? "ltr:ml-[290px] rtl:mr-[290px]"
            : "ltr:ml-[70px] rtl:mr-[70px]"
        );
        setLeftSidebarWidth(toggleButtonStatus ? "w-[290px]" : "w-[70px]");
      } else {
        setBodyLeftMargin(
          toggleButtonStatus
            ? "ltr:ml-[250px] rtl:mr-[250px]"
            : "ltr:ml-0 rtl:mr-0"
        );
        setLeftSidebarWidth(toggleButtonStatus ? "w-[250px]" : "w-[65px]");
        dispatch(
          toggleButtonStatus
            ? changeLeftSideBarSizeType(sidebarSize.DEFAULT)
            : changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW)
        );
      }
    } else {
      // Large Screen
      if (layoutType === layout.HORIZONTAL) {
        setHorizontalNavHeight("h-[48px]");
        dispatch(changeToggleButtonStatus(false));
      } else if (layoutType === layout.TWO_COLUMN) {
        setBodyLeftMargin(
          toggleButtonStatus
            ? "ltr:ml-[70px] rtl:mr-[70px]"
            : "ltr:ml-[290px] rtl:mr-[290px]"
        );
        setLeftSidebarWidth(toggleButtonStatus ? "w-[70px]" : "w-[290px]");
      } else {
        if (leftSidebarSizeMain === sidebarMainSize.LG) {
          setBodyLeftMargin(
            toggleButtonStatus
              ? "ltr:ml-0 rtl:mr-0"
              : "ltr:ml-[250px] rtl:mr-[250px]"
          );
          setLeftSidebarWidth(toggleButtonStatus ? "w-[65px]" : "w-[250px]");
          dispatch(
            toggleButtonStatus
              ? changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW)
              : changeLeftSideBarSizeType(sidebarSize.DEFAULT)
          );
        } else if (leftSidebarSizeMain === sidebarMainSize.MD) {
          setBodyLeftMargin(
            toggleButtonStatus
              ? "ltr:ml-0 rtl:mr-0"
              : "ltr:ml-[180px] rtl:mr-[180px]"
          );
          setLeftSidebarWidth(toggleButtonStatus ? "w-[65px]" : "w-[180px]");
          dispatch(
            toggleButtonStatus
              ? changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW)
              : changeLeftSideBarSizeType(sidebarSize.COMPACT)
          );
        } else if (leftSidebarSizeMain === sidebarMainSize.SM) {
          setBodyLeftMargin(
            toggleButtonStatus
              ? "ltr:ml-[250px] rtl:mr-[250px]"
              : "ltr:ml-0 rtl:mr-0"
          );
          setLeftSidebarWidth(toggleButtonStatus ? "w-[250px]" : "w-[65px]");
          dispatch(
            toggleButtonStatus
              ? changeLeftSideBarSizeType(sidebarSize.DEFAULT)
              : changeLeftSideBarSizeType(sidebarSize.SMALL_ICON_VIEW)
          );
        } else if (leftSidebarSizeMain === sidebarMainSize.SM_HOVER) {
          setBodyLeftMargin(
            toggleButtonStatus
              ? "ltr:ml-[250px] rtl:mr-[250px]"
              : "ltr:ml-[65px] rtl:mr-[65px]"
          );
          setLeftSidebarWidth(toggleButtonStatus ? "w-[250px]" : "w-[65px]");
          dispatch(changeToggleButtonStatus(toggleStatus.CLOSE));
          dispatch(
            toggleButtonStatus
              ? changeLeftSideBarSizeType(sidebarSize.DEFAULT)
              : changeLeftSideBarSizeType(sidebarSize.SMALL_HOVER_VIEW)
          );
        }
      }
    }
  }, [
    toggleButtonStatus,
    toggleSmallButtonStatus,
    leftSidebarSizeMain,
    dispatch,
    layoutType,
  ]);

  // NOTE For Resize
  useEffect(() => {
    handleResize(); // Run on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // NOTE For Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !handleScrolled.current) {
        setIsScrollTop(true);
        handleScrolled.current = true;
      } else if (window.scrollY <= 200 && handleScrolled.current) {
        setIsScrollTop(false);
        handleScrolled.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <LoadingUI />
      {preloader === loader.TOP_LOADER && (
        <NextTopLoader showSpinner={false} color="#e61247" />
      )}
      <div
        className={`min-h-full ${layoutType === layout.HORIZONTAL ? "flex-col" : "flex"} ${
          layoutType === layout.SEMI_BOX
            ? "2xl:py-5 2xl:pl-5"
            : layoutType === layout.VERTICAL &&
                leftSidebarViewType === sidebarView.DETACHED
              ? layoutPositionType === position.SCROLLABLE
                ? "overflow-hidden lg:mx-10"
                : leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW
                  ? "overflow-hidden lg:mx-10"
                  : "lg:mx-10"
              : ""
        } ${
          layoutWidthType === widthType.BOXED && layoutType === layout.VERTICAL
            ? "w-full max-w-[1300px]"
            : "w-full"
        }`}
      >
        {layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? (
          <LeftSidebar
            width={leftSidebarWidth}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : layoutType === layout.TWO_COLUMN ? (
          <LeftTwoColumnSidebar
            width={leftSidebarWidth}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : null}

        <section
          id="pages-main-container"
          className={`flex min-h-screen flex-1 flex-col ${layoutType === layout.SEMI_BOX ? "2xl:px-36" : ""} ${leftSidebarSizeType !== sidebarSize.SMALL_ICON_VIEW ? "transition-300" : "transition-none"}
            ${
              leftSidebarVisibilityType === sidebarVisibility.SHOW &&
              layoutPositionType !== position.SCROLLABLE &&
              layoutType !== layout.HORIZONTAL
                ? bodyLeftMargin
                : layoutType !== layout.HORIZONTAL &&
                    layoutType !== layout.SEMI_BOX &&
                    layoutPositionType !== position.SCROLLABLE
                  ? bodyLeftMargin
                  : ""
            }`}
        >
          <Navbar
            layoutType={layoutType}
            layoutPositionType={layoutPositionType}
            topbarColorType={topbarColorType}
            layoutWidthType={layoutWidthType}
            leftSidebarVisibilityType={leftSidebarVisibilityType}
            leftSidebarViewType={leftSidebarViewType}
            userDetails={userDetails}
          />
          {/* DEBUG */}
          {/* {layoutType === layout.HORIZONTAL && (
            <HorizontalSidebar
              resizeHeight={horizontalNavHeight}
              userDetails={userDetails}
              permissionsList={permissionsList}
            />
          )} */}
          <main
            className={`relative min-h-screen p-5 ${
              layoutType === layout.VERTICAL &&
              leftSidebarViewType === sidebarView.DETACHED
                ? "lg:mt-[70px]"
                : layoutWidthType === widthType.BOXED &&
                    layoutType === layout.HORIZONTAL
                  ? "mx-auto w-full max-w-[1300px]"
                  : layoutType === layout.HORIZONTAL
                    ? "md:px-10 lg:px-[50px]"
                    : ""
            }`}
            dir="ltr"
          >
            {children}
          </main>
          <Footer />
        </section>
      </div>
      <aside aria-label="Right Sidebar">
        <RightSidebar isScrollTop={isScrollTop} />
      </aside>
    </>
  );
};

export default AuthProtectedLayoutProvider;
