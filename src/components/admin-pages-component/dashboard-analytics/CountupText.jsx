"use client";

import React from "react";
import CountUp from "react-countup";

const CountupText = ({
  number,
  secondNumber,
  prefix,
  suffix,
  secondPrefix,
  decimals,
}) => {
  if (secondNumber && secondPrefix) {
    return (
      <span className="flex items-center gap-1">
        <span>
          <CountUp start={0} end={number} decimals={decimals} duration={4} />
          {suffix}
        </span>
        <span>
          <CountUp
            start={0}
            end={secondNumber}
            decimals={decimals}
            duration={4}
          />
          {secondPrefix}
        </span>
      </span>
    );
  }
  return (
    <>
      {prefix}
      <CountUp start={0} end={number} decimals={decimals} duration={4} />
      {suffix}
    </>
  );
};

export default CountupText;
