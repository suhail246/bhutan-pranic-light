"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import leftSidebarData from "../../../app/assets/data/leftSidebarData/leftSidebarData";

import {
  layout,
  position,
  sidebarColor,
  sidebarMainSize,
  sidebarSize,
  sidebarView,
  sidebarVisibility,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LeftSidebarSmallIconView,
  TransitionLink,
  VerticalDefaultLeftSidebarView,
} from "@/components";
import ROUTES from "@/constants/routes";

import { useFormattedPathname } from "@/lib/hooks";
import { changeToggleSmallButtonStatus } from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { parentPermissionCheck } from "@/utils/permission-helper";

const LeftSidebar = ({ width, userDetails, permissionsList }) => {
  const {
    leftSidebarSizeType,
    leftSidebarSizeMain,
    leftSidebarColorType,
    leftSidebarGradientColorType,
    toggleSmallButtonStatus,
    layoutPositionType,
    layoutThemePrimaryColorType,
    leftSidebarImageType,
    layoutType,
    leftSidebarVisibilityType,
    leftSidebarViewType,
  } = useAppSelector((state) => state.layout);

  const {
    active,
    bgColor,
    bgImageUrl,
    gradientBgColor,
    textColor,
    hoverTextColor,
    groupHoverBgColor,
    borderColor,
  } = useMemo(
    () =>
      getCustomTheme({
        layoutThemePrimaryColorType,
        leftSidebarImageType,
        leftSidebarGradientColorType,
      }),
    [
      layoutThemePrimaryColorType,
      leftSidebarImageType,
      leftSidebarGradientColorType,
    ]
  );

  const pathname = usePathname();
  const mainPath = useFormattedPathname(pathname);

  const dispatch = useAppDispatch();
  const t = useTranslations();

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

  const [isContainerHover, setIsContainerHover] = useState(false);
  const [isFixedBtnCliked, setIsFixedBtnClicked] = useState(false);

  useEffect(() => {
    const elem = document.getElementById(mainPath);
    if (elem) {
      const newTabDetails = {
        parent: { id: "", isOpen: false },
        firstChild: { id: "", isOpen: false },
        secondChild: { id: "", isOpen: false },
        thirdChild: { id: "", isOpen: false },
      };

      if (elem.attributes.parenttabid) {
        newTabDetails.parent = {
          id: elem.attributes.parenttabid.value,
          isOpen: true,
        };
      }

      if (elem.attributes.firstchildid) {
        newTabDetails.firstChild = {
          id: elem.attributes.firstchildid.value,
          isOpen: true,
        };
      }

      if (elem.attributes.secondchildid) {
        newTabDetails.secondChild = {
          id: elem.attributes.secondchildid.value,
          isOpen: true,
        };
      }

      setTabDetails(newTabDetails);
    }
  }, [mainPath]);

  // Small Hover View
  useEffect(() => {
    const pageContainerElem = document.getElementById("pages-main-container");
    const elem = document.getElementById("left-sidebar-container");

    if (layoutPositionType !== position.SCROLLABLE) {
      if (
        isFixedBtnCliked &&
        leftSidebarSizeMain === sidebarMainSize.SM_HOVER
      ) {
        pageContainerElem.classList.remove("ml-[65px]");
        pageContainerElem.classList.add("ml-[250px]");
      } else {
        setIsFixedBtnClicked(false);
        setIsContainerHover(false);
        if (leftSidebarSizeMain === sidebarMainSize.SM_HOVER) {
          pageContainerElem.classList.remove("ml-[250px]");
          pageContainerElem.classList.add("ml-[65px]");
        } else if (leftSidebarSizeMain !== sidebarMainSize.LG) {
          pageContainerElem.classList.remove("ml-[250px]");
        }
      }
    } else {
      if (
        isFixedBtnCliked &&
        leftSidebarSizeMain === sidebarMainSize.SM_HOVER
      ) {
        elem.classList.add("w-[250px]");
      } else {
        setIsFixedBtnClicked(false);
        setIsContainerHover(false);
        if (leftSidebarSizeMain === sidebarMainSize.MD) {
          elem.classList.add("w-[180px]");
        } else if (leftSidebarSizeMain === sidebarMainSize.SM) {
          elem.classList.add("w-[65px]");
        }
      }
    }
  }, [layoutPositionType, isFixedBtnCliked, leftSidebarSizeMain]);

  // Handle Toggle Tabs Functionality
  const handleParentTabToggle = useCallback(
    (parentId) => {
      setTabDetails((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          id: parentId,
          isOpen: prev.parent.id === parentId ? !prev.parent.isOpen : true,
        },
      }));
    },
    [setTabDetails]
  );

  const handleFirstChildTabToggle = useCallback(
    (firstChildId) => {
      setTabDetails((prev) => ({
        ...prev,
        firstChild: {
          ...prev.firstChild,
          id: firstChildId,
          isOpen:
            prev.firstChild.id === firstChildId
              ? !prev.firstChild.isOpen
              : true,
        },
      }));
    },
    [setTabDetails]
  );

  const handleSecondChildTabToggle = useCallback(
    (secondChildId) => {
      setTabDetails((prev) => ({
        ...prev,
        secondChild: {
          ...prev.secondChild,
          id: secondChildId,
          isOpen:
            prev.secondChild.id === secondChildId
              ? !prev.secondChild.isOpen
              : true,
        },
      }));
    },
    [setTabDetails]
  );

  // Default AND Compact Sidebar Size
  const verticalDefaultLeftSidebarView = useCallback(() => {
    return (
      <VerticalDefaultLeftSidebarView
        leftSidebarData={leftSidebarData}
        userDetails={userDetails}
        permissionsList={permissionsList}
        tabDetails={tabDetails}
        mainPath={mainPath}
        leftSidebarSizeType={leftSidebarSizeType}
        leftSidebarColorType={leftSidebarColorType}
        layoutPositionType={layoutPositionType}
        layoutType={layoutType}
        leftSidebarViewType={leftSidebarViewType}
        handleParentTabToggle={handleParentTabToggle}
        handleFirstChildTabToggle={handleFirstChildTabToggle}
        handleSecondChildTabToggle={handleSecondChildTabToggle}
        t={t}
        textColor={textColor}
        hoverTextColor={hoverTextColor}
        borderColor={borderColor}
        groupHoverBgColor={groupHoverBgColor}
      />
    );
  }, [
    leftSidebarData,
    userDetails,
    permissionsList,
    tabDetails,
    mainPath,
    leftSidebarSizeType,
    leftSidebarColorType,
    layoutPositionType,
    layoutType,
    leftSidebarViewType,
    handleParentTabToggle,
    handleFirstChildTabToggle,
    handleSecondChildTabToggle,
    t,
    textColor,
    hoverTextColor,
    borderColor,
    groupHoverBgColor,
  ]);

  // Small Icon Hover View
  const verticalSmallIconHoverView = useCallback(() => {
    return (
      <>
        {isContainerHover ? (
          verticalDefaultLeftSidebarView()
        ) : (
          <ul
            className={`relative z-[999] py-2 ${layoutPositionType === position.SCROLLABLE ? "min-h-full" : "min-h-screen"}`}
          >
            {leftSidebarData.map((category) =>
              category.tabNameList.map((parent) => (
                // Tab Icon Main Container
                <li
                  key={parent.id}
                  className={`${
                    userDetails.adminAsignedRole?.name !== "Super Admin" &&
                    !parentPermissionCheck(
                      parent?.required_permissions || null,
                      permissionsList
                    ) &&
                    "hidden"
                  } ${globalStyleObj.flexCenter} py-[13px] hover:cursor-pointer`}
                >
                  {/* NOTE Parent Icon */}
                  <span
                    className={`text-[22px] ${
                      pathname.includes(parent.id.toLowerCase())
                        ? `${leftSidebarColorType === sidebarColor.DARK_BG_COLOR || leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "text-light-weight-800" : textColor}`
                        : "text-light-weight-450"
                    }`}
                  >
                    {parent.tabIcon}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </>
    );
  }, [
    leftSidebarData,
    userDetails,
    permissionsList,
    mainPath,
    leftSidebarColorType,
    textColor,
    pathname,
    isContainerHover,
  ]);

  return (
    <>
      <div
        className={`${window.innerWidth < 768 && toggleSmallButtonStatus ? "fixed left-0 top-0 z-[99] h-screen w-full bg-[#000]/30" : "hidden"}`}
        onClick={() => dispatch(changeToggleSmallButtonStatus(false))}
      ></div>

      <aside
        aria-label="Left Sidebar"
        id="left-sidebar-container"
        className={`z-[99] bg-cover bg-center ${bgImageUrl}
        ${
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ||
          layoutPositionType === position.SCROLLABLE
            ? `transition-300 fixed h-screen md:relative md:min-h-full ${
                layoutType === layout.SEMI_BOX &&
                leftSidebarVisibilityType === sidebarVisibility.HIDDEN
                  ? "hidden"
                  : layoutType === layout.VERTICAL &&
                      leftSidebarViewType === sidebarView.DETACHED
                    ? `${isContainerHover ? "w-[250px]" : width} lg:mt-[90px]`
                    : `${isContainerHover ? "w-[250px]" : width}`
              }`
            : `transition-300 fixed overflow-hidden ${
                layoutType === layout.SEMI_BOX &&
                leftSidebarVisibilityType === sidebarVisibility.SHOW
                  ? `h-screen 2xl:h-[calc(100vh-40px)] 2xl:rounded-sm ${isContainerHover ? "w-[250px]" : width}`
                  : layoutType === layout.SEMI_BOX &&
                      leftSidebarVisibilityType === sidebarVisibility.HIDDEN
                    ? "hidden"
                    : layoutType === layout.VERTICAL &&
                        leftSidebarViewType === sidebarView.DETACHED
                      ? `lg:mt-[90px] lg:h-[calc(100vh-110px)] lg:rounded-sm ${isContainerHover ? "w-[250px]" : width}`
                      : `h-screen ${isContainerHover ? "w-[250px]" : width}`
              }`
        }

        ${
          leftSidebarColorType === sidebarColor.DARK_BG_COLOR
            ? `${active} dark:bg-dark-dencity-300`
            : `${
                leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                  ? `${gradientBgColor}`
                  : "bg-light-dencity-900"
              }`
        }
          `}
        onMouseEnter={() =>
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
          !isFixedBtnCliked
            ? setIsContainerHover(true)
            : null
        }
        onMouseLeave={() =>
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
          !isFixedBtnCliked
            ? setIsContainerHover(false)
            : null
        }
      >
        {/* Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-[99] ${
            leftSidebarColorType === sidebarColor.DARK_BG_COLOR
              ? `${active} dark:bg-dark-dencity-300`
              : leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                ? `${gradientBgColor}`
                : "bg-light-dencity-900"
          } opacity-90`}
        ></div>

        {/* Sidebar Top Logo Section */}
        <div
          className={`${
            layoutType === layout.VERTICAL &&
            leftSidebarViewType === sidebarView.DETACHED
              ? "transition-300 z-[9999] h-[70px] w-full px-[20px] lg:hidden"
              : "transition-300 z-[9999] h-[70px] w-full px-[20px]"
          }
            ${
              leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW &&
              layoutPositionType === position.FIXED
                ? leftSidebarColorType === sidebarColor.DARK_BG_COLOR
                  ? `${active} dark:bg-dark-dencity-300`
                  : leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                    ? `${gradientBgColor}`
                    : "bg-light-dencity-900"
                : "bg-transparent"
            }
                ${
                  layoutPositionType === position.SCROLLABLE
                    ? "relative"
                    : "sticky left-0 top-0"
                }`}
        >
          <TransitionLink
            href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}
            className={`${leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? "hidden" : `${globalStyleObj.flexCenter}`} size-full`}
          >
            {leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
              <Image
                src="/assets/logo-bhutan.jpg"
                alt="logo small"
                width={25}
                height={25}
                style={{ width: "auto", height: "auto" }}
              />
            ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
              leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? (
              <Image
                src="/assets/logo-bhutan.jpg"
                alt="logo light"
                width={50}
                height={22}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            ) : (
              <Image
                src="/assets/logo-bhutan.jpg"
                alt="logo light"
                width={50}
                height={22}
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            )}
          </TransitionLink>

          <div
            className={`${leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? `${globalStyleObj.flexBetween} transition-300` : "hidden"} h-full`}
          >
            <TransitionLink
              href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}
              className={`${globalStyleObj.flexStart} transition-300 h-full w-fit`}
            >
              {leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
              !isContainerHover ? (
                <Image
                  src="/assets/logo-bhutan.jpg"
                  alt="logo small"
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? (
                <Image
                  src="/assets/logo-bhutan.jpg"
                  alt="logo light"
                  width={50}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src="/assets/logo-bhutan.jpg"
                  alt="logo light"
                  width={50}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              )}
            </TransitionLink>

            <button
              type="button"
              className={`${isContainerHover ? "visible" : "hidden"}`}
              onClick={() => setIsFixedBtnClicked(!isFixedBtnCliked)}
            >
              <span
                className={`${globalStyleObj.flexCenter} size-[16px] rounded-full ${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "border-2 border-gray-200" : "border-2 border-light-weight-400 dark:border-light-weight-450"}`}
              >
                <span
                  className={`${isFixedBtnCliked ? "opacity-100" : "opacity-0"} ${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "bg-gray-200" : "bg-light-weight-400 dark:bg-light-weight-450"} size-[8px] rounded-full`}
                ></span>
              </span>
            </button>
          </div>
        </div>

        {/* NOTE Left Sidebar Changes According Sizes */}
        {leftSidebarSizeMain === sidebarMainSize.LG &&
        leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.LG &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={mainPath}
            bgColor={active}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={mainPath}
            bgColor={active}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.COMPACT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={mainPath}
            bgColor={active}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.SM &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={mainPath}
            bgColor={active}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
            userDetails={userDetails}
            permissionsList={permissionsList}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? (
          verticalSmallIconHoverView()
        ) : null}
      </aside>
    </>
  );
};

export default LeftSidebar;
