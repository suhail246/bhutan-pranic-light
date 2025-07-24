"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import leftSidebarData from "../../../app/assets/data/leftSidebarData/leftSidebarData";

import {
  position,
  sidebarColor,
  sidebarSize,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";
import ROUTES from "@/constants/routes";

import { useFormattedPathname } from "@/lib/hooks";
import {
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
} from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import {
  childPermissionCheck,
  parentPermissionCheck,
} from "@/utils/permission-helper";

const LeftTwoColumnSidebar = ({ width, userDetails, permissionsList }) => {
  const {
    leftSidebarColorType,
    toggleSmallButtonStatus,
    layoutPositionType,
    layoutThemePrimaryColorType,
    leftSidebarGradientColorType,
    leftSidebarImageType,
    leftSidebarSizeType,
  } = useAppSelector((state) => state.layout);

  const {
    active,
    bgColor,
    lightBgColor,
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

  return (
    <>
      <div
        className={`${window.innerWidth < 768 && toggleSmallButtonStatus ? "fixed left-0 top-0 z-[99] h-screen w-full bg-[#000]/30" : "hidden"}`}
        onClick={() => dispatch(changeToggleSmallButtonStatus(false))}
      ></div>

      <aside
        aria-label="Left Two Column Sidebar"
        className={`transition-300 z-[999] flex overflow-hidden ${width} ${layoutPositionType === position.SCROLLABLE ? (window.innerWidth < 768 ? "fixed h-screen" : "sticky min-h-full") : "fixed h-screen"}`}
      >
        {/* Icon View */}
        <div
          className={`custom-left-sidebar-scrollbar ${globalStyleObj.flexColStart} h-full w-[70px] overflow-y-auto border-r-2 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${active} border-[#000]/5 dark:bg-dark-dencity-200` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${active} border-[#000]/5` : `bg-light-dencity-800`}`}`}
        >
          <div className={`${globalStyleObj.flexCenter} min-h-[70px] w-full`}>
            <TransitionLink href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}>
              <Image
                src="/assets/logo-bhutan.jpg"
                alt="small logo"
                width={22}
                height={22}
              />
            </TransitionLink>
          </div>

          <ul className={`my-[10px] ${globalStyleObj.flexColStart} gap-2`}>
            {leftSidebarData.map((category) =>
              category.tabNameList.map((tab) =>
                tab.tabDropdownList.length > 0 ? (
                  <li
                    key={tab.id}
                    className={`${
                      userDetails.adminAsignedRole?.name !== "Super Admin" &&
                      !parentPermissionCheck(
                        tab?.required_permissions || null,
                        permissionsList
                      ) &&
                      "hidden"
                    } ${globalStyleObj.flexCenter} size-[42px] cursor-pointer rounded-[4px] text-[22px] ${mainPath.includes(tab.id.toLowerCase()) ? `${leftSidebarColorType === sidebarColor.DARK_BG_COLOR || leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "bg-[#f3f3f3]/10 text-light-weight-800" : `${textColor} ${lightBgColor}`}` : "text-light-weight-450"}`}
                    onClick={() => handleParentTabToggle(tab.id)}
                  >
                    <span>{tab.tabIcon}</span>
                  </li>
                ) : (
                  <TransitionLink
                    key={tab.id}
                    href={tab.pathName}
                    onClick={() => {
                      handleParentTabToggle(tab.id);
                      dispatch(changeToggleButtonStatus(true));
                    }}
                  >
                    <li
                      id={tab.id}
                      className={`${
                        userDetails.adminAsignedRole?.name !== "Super Admin" &&
                        !childPermissionCheck(
                          tab?.required_permission || null,
                          permissionsList
                        ) &&
                        "hidden"
                      } ${globalStyleObj.flexCenter} size-[42px] rounded-[4px] text-[22px] ${
                        pathname.includes(tab.id.toLowerCase())
                          ? `${lightBgColor} ${textColor}`
                          : "text-light-weight-450"
                      }`}
                    >
                      <span>{tab.tabIcon}</span>
                    </li>
                  </TransitionLink>
                )
              )
            )}
          </ul>
        </div>

        {/* Tabnames */}
        <div
          className={`relative h-full flex-1 overflow-hidden bg-cover bg-center ${bgImageUrl} ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${active} dark:bg-dark-dencity-300` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900"}`}`}
        >
          <div
            className={`pointer-events-none absolute inset-0 z-[99] ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${active} dark:bg-dark-dencity-300` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900"}`} opacity-90`}
          ></div>

          <div
            className={`${globalStyleObj.flexCenter} relative z-[999] min-h-[70px]`}
          >
            <TransitionLink href={ROUTES.ADMIN_DASHBOARD_ECOMMERCE}>
              <Image
                src={
                  leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                  leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                    ? "/assets/logo-bhutan.jpg"
                    : "/assets/logo-bhutan.jpg"
                }
                alt="logo light"
                width={50}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            </TransitionLink>
          </div>

          <div className="custom-left-sidebar-scrollbar relative z-[999] h-[calc(100vh-70px)] overflow-y-auto p-[10px]">
            {leftSidebarData.map((category) =>
              category.tabNameList.map((parent) =>
                parent.tabDropdownList.length > 0 ? (
                  <ul
                    key={parent.id}
                    className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px]" : "max-h-0"} transition-300 overflow-hidden`}
                  >
                    {parent.tabDropdownList.map((firstChild) =>
                      firstChild.tabDropdownList.length > 0 ? (
                        // First Child
                        <li
                          key={firstChild.id}
                          className={`${
                            userDetails.adminAsignedRole?.name !==
                              "Super Admin" &&
                            !parentPermissionCheck(
                              firstChild?.required_permissions || null,
                              permissionsList
                            ) &&
                            "hidden"
                          }`}
                        >
                          <div
                            className={`${
                              mainPath.includes(firstChild.id.toLowerCase())
                                ? `${
                                    leftSidebarColorType ===
                                      sidebarColor.DARK_BG_COLOR ||
                                    leftSidebarColorType ===
                                      sidebarColor.GRADIENT_BG_COLOR
                                      ? "text-light-weight-800"
                                      : textColor
                                  }`
                                : "text-light-weight-450"
                            }
                              ${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "hover:text-light-weight-800"
                                  : hoverTextColor
                              }
                                ${
                                  leftSidebarSizeType === sidebarSize.COMPACT
                                    ? `${globalStyleObj.flexCenter}`
                                    : `${globalStyleObj.flexStart} gap-2 pl-2`
                                } cursor-pointer pt-4 font-poppins-rg text-[14px]`}
                            onClick={() =>
                              handleFirstChildTabToggle(firstChild.id)
                            }
                          >
                            <BsDash
                              className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "inline"}`}
                            />
                            {firstChild.tabName === "Level 1.2"
                              ? t(`Level 1.2`)
                              : t(firstChild.tabName)}
                            <IoIosArrowForward
                              size={15}
                              className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "" : "ml-auto"} ${mainPath.includes(firstChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                            />
                          </div>

                          <ul
                            className={`${tabDetails.firstChild.id === firstChild.id && tabDetails.firstChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
                          >
                            {firstChild.tabDropdownList.map((secondChild) =>
                              secondChild.tabDropdownList.length > 0 ? (
                                // Second Child
                                <li key={secondChild.id}>
                                  <div
                                    className={`${
                                      userDetails.adminAsignedRole?.name !==
                                        "Super Admin" &&
                                      !parentPermissionCheck(
                                        secondChild?.required_permissions ||
                                          null,
                                        permissionsList
                                      ) &&
                                      "hidden"
                                    } group cursor-pointer pt-4 font-poppins-rg text-[13px] ${
                                      leftSidebarSizeType ===
                                      sidebarSize.COMPACT
                                        ? `${globalStyleObj.flexCenter}`
                                        : `${globalStyleObj.flexStart} gap-3 pl-7`
                                    }
                                      ${
                                        mainPath.includes(secondChild.id)
                                          ? `${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "text-light-weight-800"
                                                : textColor
                                            }`
                                          : "text-light-weight-450"
                                      }
                                        ${
                                          leftSidebarColorType ===
                                            sidebarColor.DARK_BG_COLOR ||
                                          leftSidebarColorType ===
                                            sidebarColor.GRADIENT_BG_COLOR
                                            ? "hover:text-light-weight-800"
                                            : hoverTextColor
                                        }`}
                                    onClick={() =>
                                      handleSecondChildTabToggle(secondChild.id)
                                    }
                                  >
                                    <span
                                      className={`${
                                        leftSidebarSizeType ===
                                        sidebarSize.COMPACT
                                          ? "hidden"
                                          : "inline"
                                      }
                                        ${
                                          mainPath.includes(
                                            secondChild.id.toLowerCase()
                                          )
                                            ? `${
                                                leftSidebarColorType ===
                                                  sidebarColor.DARK_BG_COLOR ||
                                                leftSidebarColorType ===
                                                  sidebarColor.GRADIENT_BG_COLOR
                                                  ? "border border-white"
                                                  : borderColor
                                              }`
                                            : "border border-light-weight-450"
                                        }
                                          ${
                                            leftSidebarColorType ===
                                              sidebarColor.DARK_BG_COLOR ||
                                            leftSidebarColorType ===
                                              sidebarColor.GRADIENT_BG_COLOR
                                              ? "group-hover:bg-white"
                                              : groupHoverBgColor
                                          } size-[5px] rounded-full border`}
                                    ></span>
                                    {secondChild.tabName === "Level 2.2"
                                      ? t(`Level 2.2`)
                                      : t(secondChild.tabName)}
                                    <IoIosArrowForward
                                      size={15}
                                      className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "" : "ml-auto"} ${mainPath.includes(secondChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                                    />
                                  </div>

                                  <ul
                                    className={`${tabDetails.secondChild.id === secondChild.id && tabDetails.secondChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
                                  >
                                    {secondChild.tabDropdownList.map(
                                      (thirdChild) =>
                                        thirdChild.tabDropdownList.length >
                                        0 ? null : (
                                          // Third Child
                                          <TransitionLink
                                            key={thirdChild.id}
                                            href={thirdChild.pathName}
                                          >
                                            <li
                                              id={thirdChild.id}
                                              parenttabid={
                                                thirdChild.parentTabId
                                              }
                                              firstchildid={
                                                thirdChild.firstChildId
                                              }
                                              secondchildid={
                                                thirdChild.secondChildId
                                              }
                                              className={`${
                                                userDetails.adminAsignedRole
                                                  ?.name !== "Super Admin" &&
                                                !childPermissionCheck(
                                                  thirdChild?.required_permission ||
                                                    null,
                                                  permissionsList
                                                ) &&
                                                "hidden"
                                              } ${
                                                mainPath === thirdChild.id
                                                  ? `${
                                                      leftSidebarColorType ===
                                                        sidebarColor.DARK_BG_COLOR ||
                                                      leftSidebarColorType ===
                                                        sidebarColor.GRADIENT_BG_COLOR
                                                        ? "text-light-weight-800"
                                                        : textColor
                                                    }`
                                                  : "text-light-weight-450"
                                              }
                                                ${
                                                  leftSidebarColorType ===
                                                    sidebarColor.DARK_BG_COLOR ||
                                                  leftSidebarColorType ===
                                                    sidebarColor.GRADIENT_BG_COLOR
                                                    ? "hover:text-light-weight-800"
                                                    : hoverTextColor
                                                }
                                                  ${
                                                    leftSidebarSizeType ===
                                                    sidebarSize.COMPACT
                                                      ? `${globalStyleObj.flexCenter}`
                                                      : `${globalStyleObj.flexStart} gap-3 pl-10`
                                                  } group pt-4 font-poppins-rg text-[13px]`}
                                            >
                                              <span
                                                className={`${
                                                  leftSidebarSizeType ===
                                                  sidebarSize.COMPACT
                                                    ? "hidden"
                                                    : "inline"
                                                }
                                                  ${
                                                    mainPath === thirdChild.id
                                                      ? `${
                                                          leftSidebarColorType ===
                                                            sidebarColor.DARK_BG_COLOR ||
                                                          leftSidebarColorType ===
                                                            sidebarColor.GRADIENT_BG_COLOR
                                                            ? "border border-white"
                                                            : borderColor
                                                        }`
                                                      : "border border-light-weight-450"
                                                  }
                                                    ${
                                                      leftSidebarColorType ===
                                                        sidebarColor.DARK_BG_COLOR ||
                                                      leftSidebarColorType ===
                                                        sidebarColor.GRADIENT_BG_COLOR
                                                        ? "group-hover:bg-white"
                                                        : groupHoverBgColor
                                                    } size-[5px] rounded-full`}
                                              ></span>
                                              {thirdChild.tabName ===
                                              "Level 3.1"
                                                ? t("Level 3.1")
                                                : thirdChild.tabName ===
                                                    "Level 3.2"
                                                  ? t("Level 3.2")
                                                  : t(thirdChild.tabName)}
                                            </li>
                                          </TransitionLink>
                                        )
                                    )}
                                  </ul>
                                </li>
                              ) : (
                                // Second Child
                                <TransitionLink
                                  key={secondChild.id}
                                  href={secondChild.pathName}
                                >
                                  <li
                                    id={secondChild.id}
                                    parenttabid={secondChild.parentTabId}
                                    firstchildid={secondChild.firstChildId}
                                    className={`${
                                      userDetails.adminAsignedRole?.name !==
                                        "Super Admin" &&
                                      !childPermissionCheck(
                                        secondChild?.required_permission ||
                                          null,
                                        permissionsList
                                      ) &&
                                      "hidden"
                                    } ${
                                      mainPath === secondChild.id
                                        ? `${
                                            leftSidebarColorType ===
                                              sidebarColor.DARK_BG_COLOR ||
                                            leftSidebarColorType ===
                                              sidebarColor.GRADIENT_BG_COLOR
                                              ? "text-light-weight-800"
                                              : textColor
                                          }`
                                        : "text-light-weight-450"
                                    }
                                      ${
                                        leftSidebarColorType ===
                                          sidebarColor.DARK_BG_COLOR ||
                                        leftSidebarColorType ===
                                          sidebarColor.GRADIENT_BG_COLOR
                                          ? "hover:text-light-weight-800"
                                          : hoverTextColor
                                      }
                                        ${
                                          leftSidebarSizeType ===
                                          sidebarSize.COMPACT
                                            ? `${globalStyleObj.flexCenter}`
                                            : `${globalStyleObj.flexStart} gap-3 pl-7`
                                        } group pt-4 font-poppins-rg text-[13px]`}
                                  >
                                    <span
                                      className={`${
                                        leftSidebarSizeType ===
                                        sidebarSize.COMPACT
                                          ? "hidden"
                                          : "inline"
                                      }
                                        ${
                                          mainPath === secondChild.id
                                            ? `${
                                                leftSidebarColorType ===
                                                  sidebarColor.DARK_BG_COLOR ||
                                                leftSidebarColorType ===
                                                  sidebarColor.GRADIENT_BG_COLOR
                                                  ? "border border-white"
                                                  : borderColor
                                              }`
                                            : "border border-light-weight-450"
                                        }
                                          ${
                                            leftSidebarColorType ===
                                              sidebarColor.DARK_BG_COLOR ||
                                            leftSidebarColorType ===
                                              sidebarColor.GRADIENT_BG_COLOR
                                              ? "group-hover:bg-white"
                                              : groupHoverBgColor
                                          } size-[5px] rounded-full`}
                                    ></span>
                                    {secondChild.tabName === "Level 2.1"
                                      ? t(`Level 2.1`)
                                      : t(secondChild.tabName)}
                                  </li>
                                </TransitionLink>
                              )
                            )}
                          </ul>
                        </li>
                      ) : (
                        // First Child
                        <TransitionLink
                          key={firstChild.id}
                          href={firstChild.pathName}
                        >
                          <li
                            id={firstChild.id}
                            parenttabid={firstChild.parentTabId}
                            className={`${
                              userDetails.adminAsignedRole?.name !==
                                "Super Admin" &&
                              !childPermissionCheck(
                                firstChild?.required_permission || null,
                                permissionsList
                              ) &&
                              "hidden"
                            } ${
                              mainPath === firstChild.id
                                ? `${
                                    leftSidebarColorType ===
                                      sidebarColor.DARK_BG_COLOR ||
                                    leftSidebarColorType ===
                                      sidebarColor.GRADIENT_BG_COLOR
                                      ? "text-light-weight-800"
                                      : textColor
                                  }`
                                : "text-light-weight-450"
                            }
                              ${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "hover:text-light-weight-800"
                                  : hoverTextColor
                              }
                                ${
                                  leftSidebarSizeType === sidebarSize.COMPACT
                                    ? "text-center"
                                    : `${globalStyleObj.flexStart} gap-2 pl-2`
                                } pt-4 font-poppins-rg text-[14px]`}
                          >
                            <BsDash
                              className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "inline"}`}
                            />
                            {firstChild.tabName === "Level 1.1"
                              ? t(`Level 1.1`)
                              : t(firstChild.tabName)}
                          </li>
                        </TransitionLink>
                      )
                    )}
                  </ul>
                ) : null
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default LeftTwoColumnSidebar;
