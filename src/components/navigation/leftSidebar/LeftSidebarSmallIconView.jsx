"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { sidebarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import leftSidebarData from "@/app/assets/data/leftSidebarData/leftSidebarData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";
import {
  childPermissionCheck,
  parentPermissionCheck,
} from "@/utils/permission-helper";

const LeftSidebarSmallIconView = ({
  tabDetails,
  leftSidebarColorType,
  pathname,
  bgColor,
  textColor,
  hoverTextColor,
  gradientBgColor,
  userDetails,
  permissionsList,
}) => {
  const t = useTranslations();

  const [hoverState, setHoverState] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
  });

  // NOTE Handle Hover State Functionality
  const handleParentHoverState = (parentId) => {
    setHoverState((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        id: parentId,
        isOpen: prev.parent.id === parentId ? !prev.parent.isOpen : true,
      },
    }));
  };

  const handleFirstChildHoverState = (firstChildId) => {
    setHoverState((prev) => ({
      ...prev,
      firstChild: {
        ...prev.firstChild,
        id: firstChildId,
        isOpen:
          prev.firstChild.id === firstChildId ? !prev.firstChild.isOpen : true,
      },
    }));
  };

  const handleSecondChildHoverState = (secondChildId) => {
    setHoverState((prev) => ({
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
  };

  return (
    <ul className={`relative z-[999] min-h-fit py-2`}>
      {leftSidebarData.map((category) =>
        category.tabNameList.map((parent) =>
          parent.tabDropdownList.length > 0 ? (
            // Tab Icon Main Container
            <li
              key={parent.id}
              className={`relative hover:cursor-pointer ${
                userDetails.adminAsignedRole?.name !== "Super Admin" &&
                !parentPermissionCheck(
                  parent?.required_permissions || null,
                  permissionsList
                ) &&
                "hidden"
              }`}
              onMouseEnter={() => handleParentHoverState(parent.id)}
              onMouseLeave={() => handleParentHoverState(parent.id)}
            >
              {/* NOTE Parent Icon */}
              <div
                className={`py-[13px] text-[22px]
                  ${globalStyleObj.flexCenter}
                  ${
                    pathname.includes(parent.id.toLowerCase())
                      ? `${
                          leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                          leftSidebarColorType ===
                            sidebarColor.GRADIENT_BG_COLOR
                            ? "text-light-weight-800"
                            : textColor
                        }`
                      : "text-light-weight-450"
                  }
                    ${
                      leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                      leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                        ? "hover:text-light-weight-800"
                        : hoverTextColor
                    }`}
              >
                {parent.tabIcon}
              </div>

              {/* NOTE Parent Dropdown Box */}
              <ul
                className={`absolute left-full rtl:right-full top-0 z-[9999] w-[200px] rounded-[5px] py-3 font-poppins-rg ${
                  leftSidebarColorType === sidebarColor.DARK_BG_COLOR
                    ? `${bgColor} dark:bg-dark-dencity-300`
                    : `${
                        leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                          ? `${gradientBgColor}`
                          : "bg-light-dencity-900"
                      }`
                }
                  ${
                    hoverState.parent.isOpen &&
                    hoverState.parent.id === parent.id
                      ? "visible opacity-100"
                      : "hidden opacity-0"
                  }`}
              >
                {/* Parent Tab Name  */}
                <div
                  className={`${globalStyleObj.flexBetween} mb-3 w-full px-2 text-[14px] ${
                    pathname.includes(parent.id.toLowerCase())
                      ? `${
                          leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                          leftSidebarColorType ===
                            sidebarColor.GRADIENT_BG_COLOR
                            ? "text-light-weight-800"
                            : textColor
                        }`
                      : "text-light-weight-450"
                  }
                    ${
                      leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                      leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                        ? "hover:text-light-weight-800"
                        : hoverTextColor
                    }`}
                >
                  <span>{t(parent.tabName)}</span>
                  {parent.tabDropdownList.length > 0 && (
                    <IoIosArrowForward className="rotate-90" />
                  )}
                </div>

                {/* First Childrens */}
                {parent.tabDropdownList.length > 0 &&
                  parent.tabDropdownList.map((firstChild) => {
                    return (
                      <li
                        key={firstChild.id}
                        className={`cursor-pointer font-poppins-rg ${
                          userDetails.adminAsignedRole?.name !==
                            "Super Admin" &&
                          !parentPermissionCheck(
                            firstChild?.required_permissions || null,
                            permissionsList
                          ) &&
                          "hidden"
                        }`}
                      >
                        {firstChild.tabDropdownList.length > 0 ? (
                          // FirstChild Tab having dropdown
                          <ul
                            className={`relative ${globalStyleObj.flexStart} gap-2 text-[13px]`}
                            onMouseEnter={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                            onMouseLeave={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                          >
                            <div
                              className={`w-full px-4 py-2 text-[13px] ${globalStyleObj.flexBetween} ${
                                pathname.includes(firstChild.id.toLowerCase())
                                  ? `${
                                      leftSidebarColorType ===
                                        sidebarColor.DARK_BG_COLOR ||
                                      leftSidebarColorType ===
                                        sidebarColor.GRADIENT_BG_COLOR
                                        ? "text-light-weight-800"
                                        : textColor
                                    }`
                                  : "text-light-weight-450"
                              } ${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "hover:text-light-weight-800"
                                  : hoverTextColor
                              }`}
                            >
                              <span>
                                {firstChild.tabName === "Level 1.2"
                                  ? t(`Level 1.2`)
                                  : t(firstChild.tabName)}
                              </span>
                              <IoIosArrowForward />
                            </div>

                            {/* Second Children */}
                            <li
                              className={`absolute left-full rtl:right-full top-0 z-[9999] w-[200px] rounded-[5px] py-2 font-poppins-rg ${
                                leftSidebarColorType ===
                                sidebarColor.DARK_BG_COLOR
                                  ? `${bgColor} dark:bg-dark-dencity-300`
                                  : `${
                                      leftSidebarColorType ===
                                      sidebarColor.GRADIENT_BG_COLOR
                                        ? `${gradientBgColor}`
                                        : "bg-light-dencity-900"
                                    }`
                              }
                                ${
                                  hoverState.firstChild.isOpen &&
                                  hoverState.firstChild.id === firstChild.id
                                    ? "visible opacity-100"
                                    : "hidden opacity-0"
                                }`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                // Second Child Having Dropdown
                                secondChild.tabDropdownList.length > 0 ? (
                                  <ul
                                    key={secondChild.id}
                                    className={`relative ${globalStyleObj.flexStart} gap-2 text-[13px] ${
                                      userDetails.adminAsignedRole?.name !==
                                        "Super Admin" &&
                                      !parentPermissionCheck(
                                        secondChild?.required_permissions ||
                                          null,
                                        permissionsList
                                      ) &&
                                      "hidden"
                                    }`}
                                    onMouseEnter={() =>
                                      handleSecondChildHoverState(
                                        secondChild.id
                                      )
                                    }
                                    onMouseLeave={() =>
                                      handleSecondChildHoverState(
                                        secondChild.id
                                      )
                                    }
                                  >
                                    <div
                                      className={`${globalStyleObj.flexBetween} w-full px-4 py-2 text-[13px] ${
                                        tabDetails.secondChild.id ===
                                        secondChild.id
                                          ? `${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "text-light-weight-800"
                                                : textColor
                                            }`
                                          : "text-light-weight-450"
                                      } ${
                                        leftSidebarColorType ===
                                          sidebarColor.DARK_BG_COLOR ||
                                        leftSidebarColorType ===
                                          sidebarColor.GRADIENT_BG_COLOR
                                          ? "hover:text-light-weight-800"
                                          : hoverTextColor
                                      }`}
                                    >
                                      <span>
                                        {secondChild.tabName === "Level 2.2"
                                          ? t(`Level 2.2`)
                                          : t(secondChild.tabName)}
                                      </span>
                                      <IoIosArrowForward />
                                    </div>

                                    {/* Third Child */}
                                    <li
                                      className={`absolute left-full rtl:right-full top-0 z-[9999] w-[200px] rounded-[5px] py-2 font-poppins-rg ${
                                        leftSidebarColorType ===
                                        sidebarColor.DARK_BG_COLOR
                                          ? `${bgColor} dark:bg-dark-dencity-300`
                                          : `${
                                              leftSidebarColorType ===
                                              sidebarColor.GRADIENT_BG_COLOR
                                                ? `${gradientBgColor}`
                                                : "bg-light-dencity-900"
                                            }`
                                      }
                                        ${
                                          hoverState.secondChild.isOpen &&
                                          hoverState.secondChild.id ===
                                            secondChild.id
                                            ? "visible opacity-100"
                                            : "hidden opacity-0"
                                        }`}
                                    >
                                      {secondChild.tabDropdownList.map(
                                        (thirdChild) =>
                                          thirdChild.tabDropdownList >
                                          0 ? null : (
                                            <TransitionLink
                                              href={thirdChild.pathName}
                                              key={thirdChild.id}
                                            >
                                              <div
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
                                                } ${globalStyleObj.flexStart} px-4 py-2 text-[13px] ${
                                                  pathname === thirdChild.id
                                                    ? `${
                                                        leftSidebarColorType ===
                                                          sidebarColor.DARK_BG_COLOR ||
                                                        leftSidebarColorType ===
                                                          sidebarColor.GRADIENT_BG_COLOR
                                                          ? "text-light-weight-800"
                                                          : textColor
                                                      }`
                                                    : "text-light-weight-450"
                                                } ${
                                                  leftSidebarColorType ===
                                                    sidebarColor.DARK_BG_COLOR ||
                                                  leftSidebarColorType ===
                                                    sidebarColor.GRADIENT_BG_COLOR
                                                    ? "hover:text-light-weight-800"
                                                    : hoverTextColor
                                                }`}
                                              >
                                                {thirdChild.tabName ===
                                                "Level 3.1"
                                                  ? t("Level 3.1")
                                                  : thirdChild.tabName ===
                                                      "Level 3.2"
                                                    ? t("Level 3.2")
                                                    : t(thirdChild.tabName)}
                                              </div>
                                            </TransitionLink>
                                          )
                                      )}
                                    </li>
                                  </ul>
                                ) : (
                                  // Second Child Having No Dropdown
                                  <TransitionLink
                                    href={secondChild.pathName}
                                    key={secondChild.id}
                                  >
                                    <div
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
                                      } ${globalStyleObj.flexStart} gap-2 px-4 py-2 text-[13px] ${
                                        pathname === secondChild.id
                                          ? `${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "text-light-weight-800"
                                                : textColor
                                            }`
                                          : "text-light-weight-450"
                                      } ${
                                        leftSidebarColorType ===
                                          sidebarColor.DARK_BG_COLOR ||
                                        leftSidebarColorType ===
                                          sidebarColor.GRADIENT_BG_COLOR
                                          ? "hover:text-light-weight-800"
                                          : hoverTextColor
                                      }`}
                                    >
                                      {secondChild.tabName === "Level 2.1"
                                        ? t(`Level 2.1`)
                                        : t(secondChild.tabName)}
                                    </div>
                                  </TransitionLink>
                                )
                              )}
                            </li>
                          </ul>
                        ) : (
                          // FirstChild Tab having no dropdown
                          <TransitionLink
                            href={firstChild.pathName}
                            key={firstChild.id}
                          >
                            <div
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
                              } ${globalStyleObj.flexStart} gap-2 px-4 py-2 text-[13px] ${
                                pathname === firstChild.id
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
                            >
                              {firstChild.tabName === "Level 1.1"
                                ? t(`Level 1.1`)
                                : t(firstChild.tabName)}
                            </div>
                          </TransitionLink>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </li>
          ) : (
            <TransitionLink href={parent.pathName} key={parent.id}>
              <li
                id={parent.id}
                className={`relative ${
                  userDetails.adminAsignedRole?.name !== "Super Admin" &&
                  !childPermissionCheck(
                    parent?.required_permission || null,
                    permissionsList
                  ) &&
                  "hidden"
                } ${globalStyleObj.flexCenter} ${
                  pathname.includes(parent.id.toLowerCase())
                    ? `${
                        leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                        leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                          ? "text-light-weight-800"
                          : textColor
                      }`
                    : "text-light-weight-450"
                } py-[13px] hover:cursor-pointer`}
                onMouseEnter={() => handleParentHoverState(parent.id)}
                onMouseLeave={() => handleParentHoverState(parent.id)}
              >
                <span
                  className={`text-[22px] ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR || leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "hover:text-light-weight-800" : hoverTextColor}`}
                >
                  {parent.tabIcon}
                </span>
                <div
                  className={`absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] px-2 py-3 font-poppins-rg text-[14px] ${
                    leftSidebarColorType === sidebarColor.DARK_BG_COLOR
                      ? `${bgColor} hover:text-light-weight-800 dark:bg-dark-dencity-300`
                      : `${
                          leftSidebarColorType ===
                          sidebarColor.GRADIENT_BG_COLOR
                            ? `${gradientBgColor} hover:text-light-weight-800 dark:bg-dark-dencity-300`
                            : `bg-light-dencity-900 ${hoverTextColor}`
                        }`
                  }
                    ${
                      hoverState.parent.isOpen &&
                      hoverState.parent.id === parent.id
                        ? "visible opacity-100"
                        : "hidden opacity-0"
                    }`}
                >
                  {t(parent.tabName)}
                </div>
              </li>
            </TransitionLink>
          )
        )
      )}
    </ul>
  );
};

export default LeftSidebarSmallIconView;
