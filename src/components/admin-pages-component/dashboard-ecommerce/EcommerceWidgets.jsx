import Link from "next/link";
import React from "react";

import { CountupText } from "@/components";

const EcommerceWidgets = ({ widget }) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 font-poppins-md text-[13px] text-light-weight-400">
        <h5 className="uppercase">{widget.label}</h5>
        <div className={`flex items-center gap-1 ${widget.badgeClass}`}>
          {widget.badge}
          {widget.percentage} %
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-2">
        <div>
          <h1 className="mb-5 font-poppins-sb text-[22px] text-dark-weight-550 dark:text-light-weight-550">
            <CountupText
              number={widget.counter}
              decimals={widget.decimals}
              suffix={widget.suffix}
              prefix={widget.prefix}
            />
          </h1>
          <Link
            href="#"
            className="font-poppins-rg text-[13px] text-blue-800 underline dark:text-light-weight-550"
          >
            {widget.link}
          </Link>
        </div>

        <div
          className={`${widget.bgcolor} mt-auto rounded-[5px] p-4 text-[22px]`}
        >
          {widget.icon}
        </div>
      </div>
    </div>
  );
};

export default EcommerceWidgets;
