"use client";

import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiBarChart2Fill } from "react-icons/ri";

import { topSellers } from "@/app/assets/data/pagesData/dashboardData/ecommerce";
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

const TopSellers = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

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
          Top Sellers
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className={`flex items-center gap-1`}>
              <span className="font-poppins-rg text-[13px] text-light-weight-400">
                Report
              </span>
              <MdKeyboardArrowDown className="text-light-weight-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-[150px] bg-light-dencity-900 p-0 py-2 dark:bg-dark-dencity-200`}
          >
            {["Download Report", "Export", "Import"].map((item) => (
              <DropdownMenuItem
                key={item}
                value={item}
                className={`font-poppins-rg text-[13px] tracking-wide text-dark-weight-550 dark:text-light-weight-450`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <table className="w-full">
        <tbody>
          {(topSellers || []).map((company) => (
            <tr
              key={`company-${company.id}`}
              className="border-b hover:bg-[#f3f3f3] dark:border-[#fff]/10 dark:hover:bg-[#fff]/10"
            >
              <td className="py-4 pl-2 sm:pl-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <div className="size-[25px] sm:size-[35px]">
                    <Image
                      src={company.img}
                      alt={`${company.label}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                    <h4 className="font-poppins-md text-dark-weight-550 dark:text-light-weight-550">
                      {company.label}
                    </h4>
                    <span>{company.name}</span>
                  </div>
                </div>
              </td>

              <td className="py-4 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  {company.product}
                </h4>
              </td>

              <td className="py-4 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  {company.stock}
                </h4>
                <span className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  Stock
                </span>
              </td>

              <td className="py-4 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  ${company.amount}
                </h4>
              </td>

              <td className="py-4 pr-2 sm:pr-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                  <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                    {company.percentage}%
                  </h4>
                  <RiBarChart2Fill
                    color="#0AB39C"
                    className="text-[11px] sm:text-[13px]"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-5 flex flex-col items-center gap-3 px-3 sm:flex-row sm:justify-between">
        <p className="font-poppins-rg text-[13px] text-light-weight-400">
          Showing <strong>5</strong> of <strong>25</strong> Results
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

export default TopSellers;
