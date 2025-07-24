"use client";

import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { topPages } from "@/app/assets/data/pagesData/dashboardData/analytics";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopPages = () => {
  const [timeLine, setTimeLine] = useState("Today");

  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Top Pages
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
            {["Today", "LastWeek", "LastMonth", "CurrentYear"].map((item) => (
              <DropdownMenuItem
                key={item}
                value={item}
                onSelect={() => setTimeLine(item)}
                className={`${
                  timeLine === item
                    ? "bg-[#f3f3f3]/90 dark:bg-[#f3f3f3]/10"
                    : ""
                }`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[380px]">
        <table className="size-full">
          <thead className="border border-dashed border-[#000]/10 bg-[#000]/5 font-poppins-rg text-[13px] text-dark-weight-300 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5">
            <tr>
              <th className="p-3 text-start">Active Page</th>
              <th className="p-3 text-start">Active</th>
              <th className="p-3 text-start">Users</th>
            </tr>
          </thead>
          <tbody>
            {(topPages || []).map((item, index) => (
              <tr
                key={index}
                className="font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-450"
              >
                <td className="px-3 text-blue-900 dark:text-light-weight-550">
                  <Link href="#">{item.page}</Link>
                </td>
                <td className="px-3">{item.active}</td>
                <td className="px-3">{item.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TopPages;
