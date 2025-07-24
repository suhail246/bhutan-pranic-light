"use client";

import { Checkbox } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { FaRegBell, FaRegClock } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";

import bellSvg from "../../../../app/assets/images/svg/bell.svg";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { notificationsData } from "@/app/assets/data/navData/navData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";

const NavbarNotification = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [selectedNotification, setSelectedNotification] = useState(
    notificationsData[0]
  );

  const commonBtnStyle = `mx-auto ${globalStyleObj.flexStart} gap-2 rounded-[4px] bg-custom-green-50 dark:bg-custom-green-450 p-2 font-poppins-rg tracking-wide text-accent-light-green transition-300 hover:bg-custom-green-500 dark:hover:bg-custom-green-500 hover:text-white text-[13px]`;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild={true}>
        <button
          type="button"
          className={`${globalStyleObj.flexCenter} ${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} relative m-0 size-[30px] rounded-full p-0 sm:size-[40px]`}
        >
          <FaRegBell
            size={20}
            className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
          />
          <span
            className={`${globalStyleObj.flexCenter} absolute left-1/2 top-[-8px] rounded-full bg-[#F06548] px-[5px] font-poppins-md text-[10px] font-semibold text-white sm:top-[-5px]`}
          >
            3
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} mt-2 w-screen rounded-lg border-none p-0 shadow-lg sm:max-w-[350px]`}
      >
        <DropdownMenuLabel className="m-0 bg-[#405189] p-0">
          <div
            className={`${globalStyleObj.flexBetween} w-full gap-2 px-4 pt-4`}
          >
            <span className="font-poppins-light text-[16px] tracking-wider text-white">
              Notifications
            </span>

            <span
              className={`${globalStyleObj.text13Light550Dark550} gap-1 rounded-[4px] bg-light-weight-900 px-[10px] py-[2px] tracking-wider dark:bg-dark-dencity-300`}
            >
              4 New
            </span>
          </div>

          <div className={`${globalStyleObj.flexStart} mt-6 px-2`}>
            {notificationsData.map((item) => {
              const handleNotificationButton = () => {
                const notificationObj = notificationsData.find(
                  (data) => data.id === item.id
                );
                setSelectedNotification(notificationObj);
              };

              return (
                <button
                  type="button"
                  key={item.id}
                  id={item.id}
                  onClick={handleNotificationButton}
                  className={`rounded-t-[5px] px-3 py-2 text-[13px] tracking-wide ${
                    selectedNotification.id === item.id
                      ? `${globalStyleObj.backgroundLight900Dark200} font-poppins-sb text-accent-light-blue-400`
                      : "font-poppins-light text-light-weight-450 hover:text-white"
                  }`}
                >
                  {item.id === "all-notification" && item.content.length > 0
                    ? `${item.label} (${item.content.length})`
                    : item.label}
                </button>
              );
            })}
          </div>
        </DropdownMenuLabel>

        {selectedNotification.content.length > 0 ? (
          <DropdownMenuGroup className="custom-scrollbar max-h-[320px] overflow-y-auto p-2">
            {selectedNotification.content.map((data) => {
              if (data.type === "general") {
                return (
                  <DropdownMenuItem
                    className={`${globalStyleObj.flexBetween} gap-5 py-4`}
                    key={data.id}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        style={{ backgroundColor: `${data.iconBgColor}` }}
                        className={`${globalStyleObj.flexCenter} size-[25px] rounded-full p-1`}
                      >
                        {data.icon}
                      </span>
                      <div
                        className={`${globalStyleObj.text13Light550Dark550} flex flex-col justify-center gap-1 text-left`}
                      >
                        <p>{data.notificationText}</p>
                        <p
                          className={`${globalStyleObj.text11Light400} ${globalStyleObj.flexStart} gap-1`}
                        >
                          <FaRegClock size={11} />
                          {data.time}
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      id={data.id}
                      className="size-[12px] border-light-weight-400"
                    />
                  </DropdownMenuItem>
                );
              } else {
                return (
                  <DropdownMenuItem
                    className={`${globalStyleObj.flexBetween} gap-5 py-4`}
                    key={data.id}
                  >
                    <div className="flex items-start gap-2">
                      <Image
                        src={data.userImage}
                        alt={data.username}
                        width={35}
                        height={30}
                        className="rounded-full"
                      />
                      <div
                        className={`${globalStyleObj.text13Light550Dark550} flex flex-col justify-center gap-1 text-left`}
                      >
                        <h4>{data.username}</h4>
                        <p className="text-light-weight-400">
                          {data.notificationText}
                        </p>
                        <p
                          className={`${globalStyleObj.text11Light400} ${globalStyleObj.flexStart} gap-1`}
                        >
                          <FaRegClock size={11} />
                          {data.time}
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      id={data.id}
                      className="size-[12px] border-light-weight-400"
                    />
                  </DropdownMenuItem>
                );
              }
            })}
            <DropdownMenuItem
              className="rounded-[5px] text-center font-poppins-rg text-[14px]"
              as="div"
            >
              {/* TODO Create redirect to notifications page  */}
              {selectedNotification.label === "All" ? (
                <button type="button" className={commonBtnStyle}>
                  View All Notifications
                  <MdArrowForward />
                </button>
              ) : selectedNotification.label === "Messages" ? (
                <button type="button" className={commonBtnStyle}>
                  View All Messages
                  <MdArrowForward />
                </button>
              ) : (
                <button type="button" className={commonBtnStyle}>
                  View All Alerts
                  <MdArrowForward />
                </button>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuItem
            className={`${globalStyleObj.flexColCenter} min-h-[200px] gap-4 px-4`}
          >
            <Image src={bellSvg} alt="bell" width={70} height={70} />
            <p className="text-center font-poppins-md text-[18px] text-dark-weight-550 dark:text-light-weight-550">
              Hey! You have no any
              <br />
              notifications
            </p>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarNotification;
