import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { globalStyleObj } from "@/app/assets/styles";
import { CountupText } from "@/components";

const Widget = ({
  title,
  number,
  status,
  percentage,
  icon,
  prefix,
  suffix,
  decimals,
  secondNumber,
  secondPrefix,
}) => {
  return (
    <>
      <div className={`${globalStyleObj.text13Light400}`}>
        <p>{title}</p>
        <h1 className="mb-2 mt-5 font-poppins-sb text-[26px] text-dark-weight-550 dark:text-light-weight-550">
          <CountupText
            number={number}
            secondNumber={secondNumber}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            secondPrefix={secondPrefix}
          />
        </h1>
        <p className="flex items-center gap-1">
          <span
            className={`flex items-center gap-1 rounded-sm bg-[#F3F6F9] p-px px-[4px] font-poppins-md text-[11px] dark:bg-[#fff]/5 ${status === "up" ? "text-[#0AB39C]" : "text-[#F06548]"}`}
          >
            {status === "up" ? <FaArrowUp /> : <FaArrowDown />}
            {percentage}%
          </span>{" "}
          vs. previous month
        </p>
      </div>
      <div className="flex size-[50px] items-center justify-center rounded-full bg-[#DFF0FA] dark:bg-[#223644]">
        {icon}
      </div>
    </>
  );
};

export default Widget;
