"use client";

import { BsPlus } from "react-icons/bs";
import { RiSettings3Line } from "react-icons/ri";

import { myTasks } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const MyTasks = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { checkedColor } = useMemo(
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
          My Tasks
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={`flex items-center gap-1 text-light-weight-400`}
            >
              <RiSettings3Line />
              <span className="font-poppins-rg text-[13px]">Settings</span>
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

      <div className="flex items-center justify-between gap-2 p-3">
        <div className="font-poppins-rg text-[13px] text-light-weight-400">
          <p>
            <strong>4</strong> of <strong>10</strong> remaining
          </p>
        </div>
        <button
          type="button"
          className={`transition-300 flex items-center gap-2 rounded-sm bg-[#0AB39C] px-3 py-2 font-poppins-rg text-[13px] text-light-weight-900 hover:bg-[#0AB39C]/90`}
        >
          <BsPlus />
          Add Task
        </button>
      </div>

      <ul className="scrollbar-custom flex max-h-[220px] flex-col overflow-y-auto p-3">
        {(myTasks || []).map((task, index) => (
          <li
            key={`task${task.id}`}
            className={`flex items-start justify-between gap-2 py-3 font-poppins-rg text-[13px] text-light-weight-400 ${index === myTasks.length - 1 ? "" : "border-b border-dashed dark:border-[#fff]/10"}`}
          >
            <div className="flex items-start">
              <div>
                <input
                  type="checkbox"
                  id={task.forId}
                  className={`mr-2 size-[12px] cursor-pointer rounded-[3px] border bg-transparent focus:ring-0 focus:ring-offset-0 dark:border-[#fff]/10 ${checkedColor}`}
                />
              </div>
              <div>
                <label
                  htmlFor={task.forId}
                  className="font-poppins-md text-dark-weight-550 dark:text-light-weight-550"
                >
                  {task.text}
                </label>
              </div>
            </div>

            <p className="min-w-[30%] text-end">{task.date}</p>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="my-3 ml-3 font-poppins-rg text-[13px] text-light-weight-400 underline"
      >
        Show more...
      </button>
    </>
  );
};

export default MyTasks;
