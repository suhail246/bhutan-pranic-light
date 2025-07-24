"use client";

import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

import { bestSellingProducts } from "@/app/assets/data/pagesData/dashboardData/ecommerce";
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

const BestSellingProducts = () => {
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
          Best Selling Products
        </h4>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button type="button" className={`flex items-center gap-1`}>
              <span className="font-poppins-rg text-[13px] text-light-weight-400">
                <strong className="text-dark-weight-500 dark:text-light-weight-550">
                  SORT BY:{" "}
                </strong>{" "}
                Today
              </span>
              <MdKeyboardArrowDown className="text-light-weight-400" />
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
          {(bestSellingProducts || []).map((product) => (
            <tr
              key={`selling-product-${product.id}`}
              className="border-b hover:bg-[#f3f3f3] dark:border-[#fff]/10 dark:hover:bg-[#fff]/10"
            >
              <td className="py-3 pl-2 sm:pl-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <div className="size-[35px] rounded-sm bg-[#f3f3f3] p-1 dark:bg-[#fff]/10 sm:size-[50px]">
                    <Image
                      src={product.img}
                      alt={`product-${product.id}`}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                    <h4 className="font-poppins-md text-dark-weight-550 dark:text-light-weight-550">
                      {product.label}
                    </h4>
                    <span>{product.date}</span>
                  </div>
                </div>
              </td>

              <td className="py-3 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  ${product.price.toFixed(2)}
                </h4>
                <span className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  Price
                </span>
              </td>

              <td className="py-3 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  {product.orders}
                </h4>
                <span className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  Orders
                </span>
              </td>

              <td className="py-3 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  {product.stock ? (
                    product.stock
                  ) : (
                    <span className="rounded-[4px] bg-[#F06548]/20 px-1 font-poppins-md text-[10px] tracking-tighter text-[#F06548] sm:text-[11px]">
                      Out of stock
                    </span>
                  )}
                </h4>
                <span className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  Stock
                </span>
              </td>

              <td className="py-3 pr-2 sm:pr-3">
                <h4 className="font-poppins-rg text-[11px] text-dark-weight-550 dark:text-light-weight-550 sm:text-[13px]">
                  ${product.amount}
                </h4>
                <span className="font-poppins-rg text-[11px] text-light-weight-400 sm:text-[13px]">
                  Amount
                </span>
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

export default BestSellingProducts;
