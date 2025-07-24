"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { upcomingActivities } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";

const UpcomingActivites = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [selectedAvatarObj, setSelectedAvatarObj] = useState({
    activityId: "",
    avatarSrc: "",
  });

  const { active } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Upcoming Activities
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button">
              <BsThreeDotsVertical className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Edit", "Remove"].map((type) => (
              <DropdownMenuItem
                key={type}
                className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450`}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="flex flex-col px-3">
        {(upcomingActivities || []).map((activity, index) => (
          <li
            key={`activity${activity.id}`}
            className={`flex flex-col gap-5 py-3 sm:flex-row sm:items-center sm:justify-between ${index === upcomingActivities.length - 1 ? "" : "border-b border-dashed dark:border-[#fff]/10"}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center justify-center rounded-[5px] bg-[#f3f3f3] px-2 py-[5px] font-poppins-md text-[13px] text-light-weight-400 dark:bg-[#fff]/5">
                <h4 className="text-[16px] text-dark-weight-550 dark:text-light-weight-550">
                  {activity.date}
                </h4>
                <p>{activity.weekDay}</p>
              </div>

              <div className="font-poppins-md text-[13px] text-light-weight-400">
                <h4>{activity.time}</h4>
                <Link
                  href="#"
                  className="text-dark-weight-550 dark:text-light-weight-550"
                >
                  {activity.caption}
                </Link>
              </div>
            </div>

            <div className="flex">
              {(activity.subItem || []).map((item, index) => (
                <Link
                  href="#"
                  className={`size-[30px] overflow-hidden rounded-full border-2 border-white dark:border-dark-weight-400 ${selectedAvatarObj.activityId === activity.id && selectedAvatarObj.avatarSrc === item.img ? "transition-300 relative z-[9] translate-y-[-2px]" : "transition-300"}`}
                  style={{
                    marginLeft: index === 0 ? `0px` : `-10px`,
                  }}
                  key={`avatar${item.id}`}
                  onMouseEnter={() =>
                    setSelectedAvatarObj({
                      activityId: activity.id,
                      avatarSrc: item.img,
                    })
                  }
                  onMouseLeave={() =>
                    setSelectedAvatarObj({
                      activityId: "",
                      avatarSrc: "",
                    })
                  }
                >
                  <Image
                    src={item.img}
                    alt={`avatar${index + 1}`}
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              ))}
              <Link
                href="#"
                className={`flex size-[30px] items-center justify-center rounded-full border-2 border-white font-poppins-rg text-[13px] text-white dark:border-dark-weight-400 ${activity.bgcolor ? activity.bgcolor : `${active}`}`}
                style={{
                  marginLeft: `-10px`,
                }}
              >
                {activity.imgNumber}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="my-5 flex flex-col items-center gap-3 px-3 sm:flex-row sm:justify-between">
        <p className="font-poppins-rg text-[13px] text-light-weight-400">
          Showing <strong>4</strong> of <strong>125</strong> Results
        </p>

        <ul className="flex items-center gap-1">
          {["←", "1", "2", "3", "→"].map((btn, index) => (
            <li
              key={`btn${index + 1}`}
              className={`rounded-[4px] border py-[3px] text-center font-poppins-rg text-[13px] dark:border-[#fff]/10 ${btn === "←" || btn === "→" ? "px-[5px]" : "w-[28px]"} ${index === 2 ? `${active} text-white` : "text-light-weight-400 dark:border-[#fff]/10"}`}
            >
              <Link href="#">{btn}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UpcomingActivites;
