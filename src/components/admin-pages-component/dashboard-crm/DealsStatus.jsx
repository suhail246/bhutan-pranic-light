import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

import { dealsStatus } from "@/app/assets/data/pagesData/dashboardData/crm";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DealsStatus = () => {
  return (
    <>
      <div
        className={`${globalStyleObj.flexBetween} border-b p-3 dark:border-b-zinc-700`}
      >
        <h4
          className={`${globalStyleObj.text16Light550Dark550} tracking-normal`}
        >
          Deals Status
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className={`flex items-center gap-1`}>
              <span className="font-poppins-rg text-[13px] text-light-weight-400">
                02 Nov 2021 to 31 Dec 2021
              </span>
              <MdKeyboardArrowDown className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Today", "Last Week", "Last Month", "Current Year"].map(
              (timeZone) => (
                <DropdownMenuItem
                  key={timeZone}
                  className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450`}
                >
                  {timeZone}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <table className="w-full">
        <thead className="border border-dashed border-[#000]/10 bg-[#000]/5 font-poppins-rg text-[11px] text-light-weight-400 dark:border-[#f3f3f3]/5 dark:bg-[#f3f3f3]/5 sm:text-[13px]">
          <tr>
            <th className="py-2 pl-3 text-start">Name</th>
            <th className="py-2 text-start">Last Contacted</th>
            <th className="py-2 text-start">Sales Representative</th>
            <th className="py-2 text-start">Status</th>
            <th className="py-2 pr-3 text-start">Deal Value</th>
          </tr>
        </thead>

        <tbody>
          {(dealsStatus || []).map((item, index) => (
            <tr
              key={index}
              className="font-poppins-rg text-[11px] text-dark-weight-500 dark:text-light-weight-450 sm:text-[13px]"
            >
              <td className="py-3 pl-3">{item.name}</td>
              <td className="py-3">{item.date}</td>
              <td className="flex items-center gap-1 py-3 sm:gap-2">
                <div className="size-[20px] overflow-hidden rounded-full sm:size-[30px]">
                  <Image
                    src={item.img}
                    alt={item.representativeName}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
                <Link
                  href="#"
                  className="font-poppins-md text-dark-weight-500 dark:text-light-weight-550"
                >
                  {item.representativeName}
                </Link>
              </td>
              <td className="py-3 font-poppins-sb text-[10px]">
                <span className={`rounded-[5px] p-1 ${item.badgeClass}`}>
                  {item.status}
                </span>
              </td>
              <td className="py-3">{item.statusValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DealsStatus;
