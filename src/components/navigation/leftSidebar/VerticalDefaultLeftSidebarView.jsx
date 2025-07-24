"use client";

import {
  layout,
  position,
  sidebarColor,
  sidebarSize,
  sidebarView,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";
import {
  childPermissionCheck,
  parentPermissionCheck,
} from "@/utils/permission-helper";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

const VerticalDefaultLeftSidebarView = ({
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
}) => {
  return (
    <ul
      className={`custom-left-sidebar-scrollbar relative z-[999] overflow-y-auto ${
        leftSidebarSizeType === sidebarSize.COMPACT ? "px-0" : "px-4"
      } ${
        layoutPositionType === position.SCROLLABLE
          ? "h-[calc(100vh-70px)] md:min-h-full"
          : layoutType === layout.SEMI_BOX
            ? "h-[calc(100vh-70px)] 2xl:h-[calc(100vh-110px)]"
            : layoutType === layout.VERTICAL &&
                leftSidebarViewType === sidebarView.DETACHED
              ? "h-[calc(100vh-70px)] lg:h-[calc(100vh-110px)]"
              : "h-[calc(100vh-70px)]"
      }`}
    >
      {leftSidebarData.map((category) => (
        // Main Category Container
        <li
          key={category.tabCategory}
          className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "py-0" : "py-[10px]"} ${leftSidebarSizeType === sidebarSize.COMPACT ? `${globalStyleObj.flexColCenter}` : ""}`}
        >
          <span
            className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "hidden" : "inline"} ${globalStyleObj.text11Light400Semibold} ${leftSidebarSizeType === sidebarSize.COMPACT ? "underline" : ""} uppercase tracking-widest`}
          >
            {t(category.tabCategory)}
          </span>

          <ul className="w-full">
            {category.tabNameList.map((parent) =>
              parent.tabDropdownList.length > 0 ? (
                <li
                  key={parent.id}
                  className={`${
                    userDetails.adminAsignedRole?.name !== "Super Admin" &&
                    !parentPermissionCheck(
                      parent?.required_permissions || null,
                      permissionsList
                    ) &&
                    "hidden"
                  } ${leftSidebarSizeType === sidebarSize.COMPACT ? "pl-0" : "pl-1"} pt-5`}
                >
                  {/* Parent Tab */}
                  <div
                    className={`cursor-pointer ${
                      leftSidebarSizeType === sidebarSize.COMPACT
                        ? `${globalStyleObj.flexColCenter} gap-1`
                        : `${globalStyleObj.flexStart} gap-2`
                    }
                      ${
                        mainPath.includes(parent.id.toLowerCase())
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
                        leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                        leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                          ? "hover:text-light-weight-800"
                          : hoverTextColor
                      }`}
                    onClick={() => handleParentTabToggle(parent.id)}
                  >
                    <span className="text-[16px]">{parent.tabIcon}</span>
                    <span className="font-poppins-rg text-[14px]">
                      {t(parent.tabName)}
                    </span>
                    <IoIosArrowForward
                      className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "ml-auto"} ${mainPath.includes(parent.id.toLowerCase()) ? "rotate-90" : ""}`}
                    />
                  </div>

                  <ul
                    className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
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
                            } cursor-pointer pt-4 font-poppins-rg text-[13px]`}
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
                                <li
                                  key={secondChild.id}
                                  className={`${
                                    userDetails.adminAsignedRole?.name !==
                                      "Super Admin" &&
                                    !parentPermissionCheck(
                                      secondChild?.required_permissions || null,
                                      permissionsList
                                    ) &&
                                    "hidden"
                                  }`}
                                >
                                  <div
                                    className={`group cursor-pointer pt-4 font-poppins-rg text-[13px]
                                      ${
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
                                } pt-4 font-poppins-rg text-[13px]`}
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
                </li>
              ) : (
                // Parent Tab
                <TransitionLink key={parent.id} href={parent.pathName}>
                  <li
                    id={parent.id}
                    className={`${
                      userDetails.adminAsignedRole?.name !== "Super Admin" &&
                      !childPermissionCheck(
                        parent?.required_permission || null,
                        permissionsList
                      ) &&
                      "hidden"
                    } pt-5 ${
                      leftSidebarSizeType === sidebarSize.COMPACT
                        ? "pl-0"
                        : "pl-1"
                    }
                      ${
                        mainPath === parent.id.toLowerCase()
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
                          leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                          leftSidebarColorType ===
                            sidebarColor.GRADIENT_BG_COLOR
                            ? "hover:text-light-weight-800"
                            : hoverTextColor
                        }`}
                  >
                    <div
                      className={`${leftSidebarSizeType === sidebarSize.COMPACT ? `${globalStyleObj.flexColCenter} gap-1` : `${globalStyleObj.flexStart} gap-2`} cursor-pointer`}
                    >
                      <span className="text-[16px]">{parent.tabIcon}</span>
                      <span className="font-poppins-rg text-[14px]">
                        {t(parent.tabName)}
                      </span>
                    </div>
                  </li>
                </TransitionLink>
              )
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default VerticalDefaultLeftSidebarView;
