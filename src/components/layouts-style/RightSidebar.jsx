"use client";

import { motion, useTime, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaCog } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RiArrowUpLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

import {
  layout,
  layoutThemePrimaryColor,
  sidebarMainSize,
  sidebarSize,
  sidebarVisibility,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import {
  rightSidbarLayoutPositionData,
  rightSidbarLayoutWidthData,
  rightSidbarTopbarColorData,
  rightSidebarImagesData,
  rightSidebarPrimaryColorData,
  rightSidebarThemeData,
} from "@/app/assets/data/rightSidebarData/rightSidebarData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  changeLayoutPositionType,
  changeLayoutThemePrimaryColorType,
  changeLayoutThemeType,
  changeLayoutType,
  changeLayoutWidthType,
  changeLeftSideBarSizeType,
  changeLeftSidebarColorType,
  changeLeftSidebarGradientColorType,
  changeLeftSidebarImageType,
  changeLeftSidebarSizeMain,
  changeLeftSidebarViewType,
  changeLeftSidebarVisibilityType,
  changePreloader,
  changeSidebarUserProfileAvtarType,
  changeToggleButtonStatus,
  changeTopbarColorType,
} from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const RightSidebar = ({ isScrollTop }) => {
  const {
    layoutType,
    sidebarUserProfileAvtarType,
    layoutThemeType,
    layoutWidthType,
    layoutPositionType,
    topbarColorType,
    leftSidebarSizeMain,
    leftSidebarVisibilityType,
    leftSidebarViewType,
    leftSidebarColorType,
    leftSidebarGradientColorType,
    leftSidebarImageType,
    layoutThemePrimaryColorType,
    preloader,
  } = useAppSelector((state) => state.layout);

  const [rightSideBarIsOpen, setRightSidebarIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const time = useTime();
  const rightContainerRef = useRef(null);

  const rotate = useTransform(time, [0, 2000], [0, 360], {
    clamp: rightSideBarIsOpen,
  });

  let borderColor;
  let colorHex;
  let bgColor;
  let bgGradientColor;
  let bgGradientFourthChildColor;

  switch (layoutThemePrimaryColorType) {
    case layoutThemePrimaryColor.DEFAULT:
      borderColor = "border border-[#405189]";
      colorHex = "#405189";
      bgColor = rightSidebarPrimaryColorData[0].bgColor;
      bgGradientColor = "bg-gradient-to-r from-[#405189] to-[#10a99a]";
      bgGradientFourthChildColor =
        "bg-gradient-to-r from-[#1d2129] to-[#405189]";
      break;
    case layoutThemePrimaryColor.TEAL_GREEN:
      borderColor = "border border-[#066b5e]";
      colorHex = "#066b5e";
      bgColor = rightSidebarPrimaryColorData[1].bgColor;
      bgGradientColor = "bg-gradient-to-r from-[#066b5e] to-[#10a99a]";
      bgGradientFourthChildColor =
        "bg-gradient-to-r from-[#1d2129] to-[#066b5e]";
      break;
    case layoutThemePrimaryColor.ROYAL_PURPLE:
      borderColor = "border border-[#5147A3]";
      colorHex = "#5147A3";
      bgColor = rightSidebarPrimaryColorData[2].bgColor;
      bgGradientColor = "bg-gradient-to-r from-[#5147A3] to-[#10a99a]";
      bgGradientFourthChildColor =
        "bg-gradient-to-r from-[#1d2129] to-[#5147A3]";
      break;
    case layoutThemePrimaryColor.COBALT_BLUE:
      borderColor = "border border-[#2a5fc1]";
      colorHex = "#2a5fc1";
      bgColor = rightSidebarPrimaryColorData[3].bgColor;
      bgGradientColor = "bg-gradient-to-r from-[#2a5fc1] to-[#10a99a]";
      bgGradientFourthChildColor =
        "bg-gradient-to-r from-[#1d2129] to-[#2a5fc1]";
      break;
  }

  // NOTE Sidebar Color data
  const rightSidbarColorData = [
    {
      id: "light-bg-color",
      label: "Light",
      leftColor: "bg-[#fff]",
      leftInnerColor: "bg-gray-500/20",
    },
    {
      id: "dark-bg-color",
      label: "Dark",
      leftColor: bgColor,
      leftInnerColor: "bg-[#fff]/20",
    },
    {
      id: "gradient-bg-color",
      label: "Gradient",
      leftColor: bgGradientColor,
      leftInnerColor: "bg-[#fff]/20",
      childrenElem: [
        {
          id: "child-1",
          label: "gradient-bg-color",
          leftColor: bgGradientColor,
        },
        {
          id: "child-2",
          label: "sec-child-gradient-bg-color",
          leftColor: "bg-gradient-to-r from-[#2a99dd] to-[#347cef]",
        },
        {
          id: "child-3",
          label: "third-child-gradient-bg-color",
          leftColor: "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]",
        },
        {
          id: "child-4",
          label: "fourth-child-gradient-bg-color",
          leftColor: bgGradientFourthChildColor,
        },
      ],
    },
  ];

  // NOTE Handle Layout Width
  const handleLayoutWidth = (id) => {
    if (id === "fluid") {
      dispatch(changeLayoutWidthType(id));
      dispatch(changeLeftSideBarSizeType(sidebarSize.DEFAULT));
      dispatch(changeLeftSidebarSizeMain(sidebarMainSize.LG));
    } else if (id === "boxed") {
      dispatch(changeLayoutWidthType(id));
      dispatch(changeLeftSideBarSizeType(sidebarSize.SMALL_HOVER_VIEW));
      dispatch(changeLeftSidebarSizeMain(sidebarMainSize.SM_HOVER));
    }
  };

  // NOTE Avatar Toggle Btn Functionality
  const toggleAvatarSwitch = () => {
    if (sidebarUserProfileAvtarType === "show") {
      dispatch(changeSidebarUserProfileAvtarType("hide"));
    } else if (sidebarUserProfileAvtarType === "hide") {
      dispatch(changeSidebarUserProfileAvtarType("show"));
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (rightContainerRef.current && rightSideBarIsOpen) {
      rightContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [rightSideBarIsOpen]);

  const commonRightSidebarLayout = (extraClass) => {
    return (
      <>
        <div
          className={`flex h-full w-[25px] flex-col p-[4px] ${globalStyleObj.layoutBoxBackgroundLightDark}`}
        >
          <span
            className={`h-[8px] w-full rounded-lg`}
            style={{ backgroundColor: `${colorHex}40` }}
          ></span>
          <div className="flex h-full flex-col justify-center gap-1">
            {["box-1", "box-2", "box-3"].map((box) => (
              <span
                key={box}
                className={`h-[4px] w-full`}
                style={{ backgroundColor: `${colorHex}40` }}
              ></span>
            ))}
          </div>
        </div>

        <div className="flex size-full flex-col justify-between">
          <span
            className={`h-[8px] w-full ${extraClass || `${globalStyleObj.layoutBoxBackgroundLightDark}`}`}
          ></span>
          <span
            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
          ></span>
        </div>
      </>
    );
  };

  return (
    <>
      {/* NOTE Settings Button */}
      <div
        className={`fixed ltr:left-full rtl:right-full flex ltr:translate-x-[-100%] rtl:translate-x-[100%] flex-col items-center justify-center gap-2 px-5 ${isScrollTop ? "top-[calc(100vh-138px)]" : "top-[calc(100vh-90px)]"}`}
      >
        <motion.button
          initial={{ y: 0, opacity: 1 }}
          whileHover={{
            y: [0, "-15px", 0],
            opacity: [1, 0, 1],
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          type="button"
          onClick={handleScrollToTop}
          className={`${isScrollTop ? `size-[40px] rounded-sm bg-[#F06548] ${globalStyleObj.flexCenter}` : "hidden"}`}
        >
          <RiArrowUpLine size={15} color="#fff" />
        </motion.button>

        <motion.button
          style={{ rotate }}
          onClick={() => setRightSidebarIsOpen(true)}
          className={`${globalStyleObj.flexCenter} size-0 rounded-full bg-[#299CDB] md:size-[50px]`}
        >
          <FaCog size={22} color="white" />
        </motion.button>
      </div>

      {/* NOTE Main Right Sidebar */}
      <>
        {/* Overlay */}
        <div
          className={`${rightSideBarIsOpen ? "fixed left-0 top-0 z-[9999] h-screen w-full bg-[#000]/30" : "hidden"}`}
          onClick={() => setRightSidebarIsOpen(false)}
        ></div>

        <motion.div
          initial={{ x: "100%" }}
          animate={rightSideBarIsOpen ? { x: 0 } : { x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed right-0 top-0 z-[9999] h-screen w-[380px] bg-white`}
        >
          {/* NOTE Header */}
          <div
            className={`${globalStyleObj.flexBetween} ${bgColor} h-[60px] w-full px-[16px]`}
          >
            <h1 className="font-poppins-md text-[16px] text-white">
              Theme Customizer
            </h1>
            <button
              type="button"
              onClick={() => setRightSidebarIsOpen(false)}
              className="transition-style hover:scale-[1.3]"
            >
              <MdClose size={22} color="#9da6c2" />
            </button>
          </div>

          {/* Inner */}
          <div
            ref={rightContainerRef}
            className={`custom-left-sidebar-scrollbar ${globalStyleObj.backgroundLight900Dark200} h-[calc(100vh-60px)] overflow-y-auto p-[25px] shadow-light`}
          >
            {/* Layouts */}
            <div>
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Layout
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose your layout
              </p>
              <div
                className={`mt-5 ${globalStyleObj.flexStart} flex-wrap gap-3`}
              >
                {/* Vertical Layout */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutType("vertical"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      layoutType === "vertical"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      {commonRightSidebarLayout()}
                    </div>
                    {layoutType === "vertical" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Vertical
                  </h4>
                </button>

                {/* DEBUG Horizontal Layout */}
                {/* <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutType("horizontal"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      layoutType === "horizontal"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full flex-col justify-between gap-2">
                      <div className="flex w-full flex-col">
                        <div
                          className={`flex h-[17px] w-full items-center justify-between ${globalStyleObj.layoutBoxBackgroundLightDark} px-[5px]`}
                        >
                          <span
                            className={`size-[8px] rounded-full`}
                            style={{ backgroundColor: `${colorHex}40` }}
                          ></span>

                          <div className="flex items-center gap-2">
                            {["box-1", "box-2"].map((box) => (
                              <span
                                key={box}
                                className={`h-[4px] w-[16px]`}
                                style={{ backgroundColor: `${colorHex}40` }}
                              ></span>
                            ))}
                          </div>
                        </div>

                        <div
                          className={`mt-[4px] h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                        ></div>
                      </div>

                      <div
                        className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      ></div>
                    </div>

                    {layoutType === "horizontal" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Horizontal
                  </h4>
                </button> */}

                {/* Two Column Layout */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutType("two-column"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      layoutType === "two-column"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-1">
                      <div
                        className={`flex h-full w-[10px] flex-col ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      >
                        <span
                          className={`h-[8px] w-full`}
                          style={{ backgroundColor: `${colorHex}40` }}
                        ></span>
                        <div className="flex h-full flex-col justify-center gap-1">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full`}
                              style={{ backgroundColor: `${colorHex}40` }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`flex h-full w-[25px] flex-col gap-1 ${globalStyleObj.layoutBoxBackgroundLightDark} p-[4px]`}
                      >
                        {["box-1", "box-2", "box-3", "box-4"].map((box) => (
                          <span
                            key={box}
                            className={`h-[4px] w-full`}
                            style={{ backgroundColor: `${colorHex}40` }}
                          ></span>
                        ))}
                      </div>

                      <div className="flex size-full flex-col justify-between">
                        {["box-1", "box-2"].map((box) => (
                          <div
                            key={box}
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {layoutType === "two-column" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <span
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Two Column
                  </span>
                </button>

                {/* Semi Box Layout */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutType("semi-box"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      layoutType === "semi-box"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2 p-1">
                      {commonRightSidebarLayout()}
                    </div>

                    {layoutType === "semi-box" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <span
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Semi Box
                  </span>
                </button>
              </div>
            </div>

            {/* NOTE User Profile Avatar Button [Vertical & Semibox] */}
            <div
              className={`${layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? "mt-5 flex items-center gap-2" : "hidden"}`}
            >
              <button
                type="button"
                className={`flex w-[40px] cursor-pointer overflow-hidden rounded-full px-[3px] py-[2px] dark:border-dark-weight-550 ${
                  sidebarUserProfileAvtarType === "hide"
                    ? `justify-end border border-[#4f5e92] ${bgColor}`
                    : `justify-start border border-[#bdbfc7] bg-transparent`
                }`}
                onClick={toggleAvatarSwitch}
              >
                <motion.span
                  className={`size-[14px] rounded-full ${
                    sidebarUserProfileAvtarType === "hide"
                      ? "bg-white"
                      : "bg-[#bdbfc7] dark:bg-[#494b52]"
                  }`}
                  layout
                  transition={{ type: "spring", stiffness: 800, damping: 30 }}
                />
              </button>

              <span className={`${globalStyleObj.text13Light600Dark450}`}>
                Sidebar User Profile Avatar
              </span>
            </div>

            {/* NOTE Theme */}
            <div className="mt-5">
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Theme
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose your suitable Theme.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {rightSidebarThemeData.map((theme) => (
                  <button
                    type="button"
                    key={theme.id}
                    className="group flex cursor-pointer flex-col items-center gap-1"
                    onClick={() => dispatch(changeLayoutThemeType("default"))}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[5px] group-hover:shadow-light ${
                        layoutThemeType === "default"
                          ? `${borderColor}`
                          : "border dark:border-dark-weight-550"
                      }`}
                    >
                      <Image
                        src={theme.themeImage}
                        alt={theme.label}
                        width={145}
                        height={125}
                      />
                      {layoutThemeType === "default" && (
                        <FaCheckCircle
                          color={colorHex}
                          size={13}
                          className="absolute right-[7px] top-[7px]"
                        />
                      )}
                    </div>
                    <span
                      className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                    >
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* NOTE Color Schema */}
            <div className="mt-5">
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Color Schema
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Light or Dark Schema.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => setTheme("light")}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      theme === "light"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      {commonRightSidebarLayout()}
                    </div>
                    {theme === "light" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Light
                  </h4>
                </button>

                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => setTheme("dark")}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      theme === "dark"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2 bg-dark-dencity-200 dark:bg-[#313437]">
                      <div
                        className={`flex h-full w-[25px] flex-col bg-[#46494B] p-[4px]`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg bg-[#595C5D]`}
                        ></span>
                        <div className="flex h-full flex-col justify-center gap-1">
                          <span
                            className={`h-[4px] w-full bg-[#595C5D]`}
                          ></span>
                          <span
                            className={`h-[4px] w-full bg-[#595C5D]`}
                          ></span>
                          <span
                            className={`h-[4px] w-full bg-[#595C5D]`}
                          ></span>
                        </div>
                      </div>

                      <div className="flex size-full flex-col justify-between">
                        <div className={`h-[8px] w-full bg-[#46494B]`}></div>
                        <div className={`h-[8px] w-full bg-[#46494B]`}></div>
                      </div>
                    </div>
                    {theme === "dark" && (
                      <FaCheckCircle
                        color="#fff"
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Dark
                  </h4>
                </button>
              </div>
            </div>

            {/* NOTE Layout Width */}
            <div
              className={`${layoutType === layout.TWO_COLUMN || layoutType === layout.SEMI_BOX ? "hidden" : "mt-5"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Layout Width
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Fluid or Boxed layout.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {rightSidbarLayoutWidthData.map((width) => (
                  <button
                    type="button"
                    key={width.id}
                    className="group flex cursor-pointer flex-col items-center gap-1"
                    onClick={() => handleLayoutWidth(width.id)}
                  >
                    <div
                      className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                        layoutWidthType === width.id
                          ? `${borderColor}`
                          : "border dark:border-dark-weight-550"
                      } ${width.id === "boxed" ? "px-2" : "px-0"}`}
                    >
                      <div
                        className={`flex size-full gap-2 ${
                          width.id === "boxed"
                            ? "border-x dark:border-dark-weight-550"
                            : ""
                        }`}
                      >
                        {commonRightSidebarLayout()}
                      </div>
                      {layoutWidthType === width.id && (
                        <FaCheckCircle
                          color={colorHex}
                          size={13}
                          className="absolute right-[7px] top-[7px]"
                        />
                      )}
                    </div>
                    <h4
                      className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                    >
                      {width.label}
                    </h4>
                  </button>
                ))}
              </div>
            </div>

            {/* NOTE Sidebar Visibility */}
            <div
              className={`${layoutType === layout.SEMI_BOX ? "mt-5" : "hidden"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Sidebar Visibility
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose show or Hidden sidebar.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() =>
                    dispatch(
                      changeLeftSidebarVisibilityType(sidebarVisibility.SHOW)
                    )
                  }
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      leftSidebarVisibilityType === sidebarVisibility.SHOW
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2 p-1">
                      {commonRightSidebarLayout()}
                    </div>
                    {leftSidebarVisibilityType === sidebarVisibility.SHOW && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Show
                  </h4>
                </button>

                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() =>
                    dispatch(
                      changeLeftSidebarVisibilityType(sidebarVisibility.HIDDEN)
                    )
                  }
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      leftSidebarVisibilityType === sidebarVisibility.HIDDEN
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div
                      className={`flex size-full flex-col justify-between px-[10px] py-1`}
                    >
                      <div
                        className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      ></div>
                      <div
                        className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      ></div>
                    </div>

                    {leftSidebarVisibilityType === sidebarVisibility.HIDDEN && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Hidden
                  </h4>
                </button>
              </div>
            </div>

            {/* NOTE Layout Position */}
            <div
              className={`${layoutType === layout.TWO_COLUMN ? "hidden" : "mt-5"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Layout Position
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Fixed or Scrollable Layout Position.
              </p>

              <div className="mt-5 overflow-hidden rounded-[4px]">
                {rightSidbarLayoutPositionData.map((position) => (
                  <button
                    key={position.id}
                    className={`w-[95px] cursor-pointer py-[6px] font-poppins-md text-[13px] ${
                      layoutPositionType === position.id
                        ? "transition-300 bg-[#d4ebf8] text-[#279CDB] dark:bg-[#223D4D]"
                        : `${globalStyleObj.layoutBoxBackgroundLightDark} ${globalStyleObj.text13Light600Dark400} transition-300`
                    }`}
                    onClick={() =>
                      dispatch(changeLayoutPositionType(position.id))
                    }
                  >
                    {position.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NOTE Topbar Color */}
            <div className="mt-5">
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Topbar Color
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Light or Dark Topbar Color.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {rightSidbarTopbarColorData.map((topbarColor) => (
                  <button
                    type="button"
                    key={topbarColor.id}
                    className="group flex cursor-pointer flex-col items-center gap-1"
                    onClick={() =>
                      dispatch(changeTopbarColorType(topbarColor.id))
                    }
                  >
                    <div
                      className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                        topbarColorType === topbarColor.id
                          ? `${borderColor}`
                          : "border dark:border-dark-weight-550"
                      }`}
                    >
                      <div className={`flex size-full gap-2`}>
                        {topbarColor.id === "dark-color"
                          ? commonRightSidebarLayout(bgColor)
                          : commonRightSidebarLayout()}
                      </div>
                      {topbarColorType === topbarColor.id && (
                        <FaCheckCircle
                          color={colorHex}
                          size={13}
                          className="absolute right-[7px] top-[7px]"
                        />
                      )}
                    </div>
                    <h4
                      className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                    >
                      {topbarColor.label}
                    </h4>
                  </button>
                ))}
              </div>
            </div>

            {/* NOTE Sidebar Size */}
            <div
              className={`${layoutType === layout.VERTICAL || layoutType === layout.SEMI_BOX ? "mt-5" : "hidden"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Sidebar Size
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose a size of Sidebar.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {/* Default Size */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => {
                    dispatch(changeLeftSidebarSizeMain(sidebarMainSize.LG));
                    dispatch(changeToggleButtonStatus(false));
                  }}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      leftSidebarSizeMain === "lg"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      {commonRightSidebarLayout()}
                    </div>
                    {leftSidebarSizeMain === "lg" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Default
                  </h4>
                </button>

                {/* Compact Size */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => {
                    dispatch(changeLeftSidebarSizeMain(sidebarMainSize.MD));
                    dispatch(changeToggleButtonStatus(false));
                  }}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarSizeMain === "md"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      <div
                        className={`flex h-full w-[17px] flex-col ${globalStyleObj.layoutBoxBackgroundLightDark} p-[4px]`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-full`}
                          style={{ backgroundColor: `${colorHex}40` }}
                        ></span>
                        <div className="flex h-full flex-col justify-center gap-1">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full ${globalStyleObj.layoutInnerBoxBackgroundLightDark}`}
                              style={{ backgroundColor: `${colorHex}40` }}
                            ></span>
                          ))}
                        </div>
                      </div>
                      <div className="flex size-full flex-col justify-between">
                        {["box-1", "box-2"].map((box) => (
                          <div
                            key={box}
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {leftSidebarSizeMain === "md" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Compact
                  </h4>
                </button>

                {/* Small (Icon View) Size */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => {
                    dispatch(changeLeftSidebarSizeMain(sidebarMainSize.SM));
                    dispatch(changeToggleButtonStatus(false));
                  }}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarSizeMain === "sm"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-1">
                      <div
                        className={`flex h-full w-[10px] flex-col ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      >
                        <span
                          className={`h-[8px] w-full`}
                          style={{ backgroundColor: `${colorHex}40` }}
                        ></span>
                        <div className="flex h-full flex-col justify-center gap-1">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full`}
                              style={{ backgroundColor: `${colorHex}40` }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div className="flex size-full flex-col justify-between">
                        {["box-1", "box-2"].map((box) => (
                          <div
                            key={box}
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {leftSidebarSizeMain === "sm" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Small Icon
                  </h4>
                </button>

                {/* Small Hover View Size */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => {
                    dispatch(
                      changeLeftSidebarSizeMain(sidebarMainSize.SM_HOVER)
                    );
                    dispatch(changeToggleButtonStatus(false));
                  }}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarSizeMain === "sm-hover"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-1">
                      <div
                        className={`flex h-full w-[10px] flex-col ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      >
                        <span
                          className={`h-[8px] w-full`}
                          style={{ backgroundColor: `${colorHex}40` }}
                        ></span>
                        <div className="flex h-full flex-col justify-center gap-1">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full`}
                              style={{ backgroundColor: `${colorHex}40` }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div className="flex size-full flex-col justify-between">
                        {["box-1", "box-2"].map((box) => (
                          <div
                            key={box}
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {leftSidebarSizeMain === "sm-hover" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Small Hover
                  </h4>
                </button>
              </div>
            </div>

            {/* NOTE Sidebar View */}
            <div
              className={`${layoutType === layout.VERTICAL ? "mt-5" : "hidden"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Sidebar View
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Default or Detached Sidebar view.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {/* Default View */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLeftSidebarViewType("default"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarViewType === "default"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      {commonRightSidebarLayout()}
                    </div>
                    {leftSidebarViewType === "default" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Default
                  </h4>
                </button>

                {/* Detached View */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() =>
                    dispatch(changeLeftSidebarViewType("detached"))
                  }
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarViewType === "detached"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full flex-col justify-between gap-1">
                      <div
                        className={`flex min-h-[15px] w-full items-center justify-between ${globalStyleObj.layoutBoxBackgroundLightDark} px-[5px]`}
                      >
                        <span
                          className={`size-[8px] rounded-full`}
                          style={{ backgroundColor: `${colorHex}40` }}
                        ></span>
                        <div className="flex items-center gap-2">
                          {["box-1", "box-2"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-[16px]`}
                              style={{ backgroundColor: `${colorHex}40` }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`ml-[8px] flex h-full w-[24px] flex-col items-center gap-1 rounded-[3px] ${globalStyleObj.layoutBoxBackgroundLightDark} p-1`}
                      >
                        {["box-1", "box-2", "box-3"].map((box) => (
                          <span
                            key={box}
                            className={`h-[4px] w-full`}
                            style={{ backgroundColor: `${colorHex}40` }}
                          ></span>
                        ))}
                      </div>

                      <div
                        className={`min-h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                      ></div>
                    </div>

                    {leftSidebarViewType === "detached" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4
                    className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                  >
                    Detached
                  </h4>
                </button>
              </div>
            </div>

            {/* NOTE Sidebar Color */}
            <div
              className={`${layoutType === layout.HORIZONTAL ? "hidden" : "mt-5"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Sidebar Color
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose Light or Dark Sidebar Color.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {rightSidbarColorData.map((eachColor, index) => (
                  <button
                    type="button"
                    key={eachColor.id}
                    className="group flex cursor-pointer flex-col items-center gap-1"
                    onClick={() =>
                      dispatch(changeLeftSidebarColorType(eachColor.id))
                    }
                  >
                    <div
                      className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                        leftSidebarColorType === eachColor.id
                          ? `${borderColor}`
                          : "border dark:border-dark-weight-550"
                      }`}
                    >
                      <div className="flex size-full gap-2">
                        <div
                          className={`flex h-full w-[25px] flex-col p-[4px] ${
                            eachColor.leftColor
                          } ${index === 0 ? "border-r dark:border-none" : ""}`}
                        >
                          <span
                            className={`h-[8px] w-full rounded-lg ${eachColor.leftInnerColor}`}
                          ></span>
                          <div className="flex h-full flex-col justify-center gap-1">
                            <span
                              className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                            ></span>
                            <span
                              className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                            ></span>
                            <span
                              className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                            ></span>
                          </div>
                        </div>
                        <div className="flex size-full flex-col justify-between">
                          <div
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                          <div
                            className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
                          ></div>
                        </div>
                      </div>
                      {leftSidebarColorType === eachColor.id && (
                        <FaCheckCircle
                          color={colorHex}
                          size={13}
                          className="absolute right-[7px] top-[7px]"
                        />
                      )}
                    </div>
                    <h4
                      className={`mx-auto tracking-wide ${globalStyleObj.text13Light550Dark550Md}`}
                    >
                      {eachColor.label}
                    </h4>
                  </button>
                ))}
              </div>

              {leftSidebarColorType === "gradient-bg-color" && (
                <div
                  className={`mt-4 flex flex-wrap items-center gap-2 rounded-[4px] ${globalStyleObj.layoutBoxBackgroundLightDark} px-[16px] py-[8px]`}
                >
                  {rightSidbarColorData[2].childrenElem.map((eachChild) => (
                    <button
                      key={eachChild.id}
                      type="button"
                      className={`flex size-[30px] items-center justify-center rounded-full ${eachChild.leftColor}`}
                      onClick={() =>
                        dispatch(
                          changeLeftSidebarGradientColorType(eachChild.label)
                        )
                      }
                    >
                      {leftSidebarGradientColorType === eachChild.label && (
                        <FaCheckCircle size={16} color="#fff" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* NOTE Sidebar Images */}
            <div
              className={`${layoutType === layout.HORIZONTAL ? "hidden" : "mt-5"}`}
            >
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Sidebar Images
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose a image of Sidebar.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {rightSidebarImagesData.map((imgBtn, index) => (
                  <button
                    type="button"
                    key={imgBtn.id}
                    className={`transition-style relative flex h-[72px] w-[45px] items-center justify-center overflow-hidden rounded-[4px] bg-cover bg-center ${
                      index === 0 ? `${imgBtn.bgColor}` : `${imgBtn.bgImage}`
                    } ${
                      leftSidebarImageType === imgBtn.id
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                    onClick={() =>
                      dispatch(changeLeftSidebarImageType(imgBtn.id))
                    }
                  >
                    {leftSidebarImageType === imgBtn.id ? (
                      <>
                        <FaCheckCircle
                          size={16}
                          color="#fff"
                          className="z-[99] rounded-full border border-[#405189]"
                        />
                        <div
                          className="absolute inset-0 size-full"
                          style={{ backgroundColor: `${colorHex}80` }}
                        ></div>
                      </>
                    ) : index === 0 ? (
                      <MdClose size={16} />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* NOTE Sidebar Primary Color */}
            <div className="mt-5">
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Primary Color
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose a color of Primary.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {rightSidebarPrimaryColorData.map((pColor) => (
                  <button
                    key={pColor.id}
                    type="button"
                    className={`transition-style size-[30px] rounded-[4px] ${
                      pColor.bgColor
                    } ${
                      layoutThemePrimaryColorType === pColor.id
                        ? "scale-110"
                        : "scale-100"
                    }`}
                    onClick={() =>
                      dispatch(changeLayoutThemePrimaryColorType(pColor.id))
                    }
                  ></button>
                ))}
              </div>
            </div>

            {/* Preloader */}
            <div className="mt-5">
              <h3
                className={`${globalStyleObj.text13Light550Dark550Sb} uppercase`}
              >
                Preloader
              </h3>
              <p className={`${globalStyleObj.text13Light400}`}>
                Choose a preloader.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {/* Top Loader */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changePreloader("top-loader"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      preloader === "top-loader"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="relative flex size-full gap-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: [0, "100%"] }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className={`absolute left-0 top-0 h-[3px] bg-[#e61247]`}
                      ></motion.div>

                      {commonRightSidebarLayout()}
                    </div>
                    {preloader === "top-loader" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4 className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    Top Loader
                  </h4>
                </button>

                {/* Spinner */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changePreloader("spinner"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      preloader === "spinner"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="relative flex size-full gap-2">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <ClipLoader
                          size={25}
                          color={colorHex}
                          speedMultiplier={0.8}
                          cssOverride={{ borderWidth: "3px" }}
                        />
                      </span>

                      {commonRightSidebarLayout()}
                    </div>
                    {preloader === "spinner" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4 className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    Spinner
                  </h4>
                </button>

                {/* Disable */}
                <button
                  type="button"
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changePreloader("disable"))}
                >
                  <div
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      preloader === "disable"
                        ? `${borderColor}`
                        : "border dark:border-dark-weight-550"
                    }`}
                  >
                    <div className="flex size-full gap-2">
                      {commonRightSidebarLayout()}
                    </div>
                    {preloader === "disable" && (
                      <FaCheckCircle
                        color={colorHex}
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </div>
                  <h4 className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    Disable
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </>
  );
};

export default RightSidebar;
