import Image from "next/image";
import React from "react";
import { LightButton, PopularButton } from "..";

const PriceCard = ({ priceDetails }) => {
  return (
    <li
      key={priceDetails._id}
      className={`w-full p-[32px] md:p-[22px] lg:p-[32px] rounded-[24px] flex flex-col gap-[24px] ${priceDetails.isPopular ? "bg-black-500" : "bg-[#fff] border border-black-100"}`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex items-center justify-between gap-5">
          <h6
            className={`text-[16px] font-candara-rg font-bold leading-[19.53px] ${priceDetails.isPopular ? "text-white" : "text-black-500"}`}
          >
            {priceDetails.title}
          </h6>
          {priceDetails.isPopular && (
            <PopularButton iconFileName="fire" btnText="Most Popular" />
          )}
        </div>

        <h5
          className={`text-[20px] font-candara-rg font-bold leading-[24.41px] ${priceDetails.isPopular ? "text-white" : "text-black-500"}`}
        >
          {priceDetails.price.currency}{" "}
          <span className="text-[40px] leading-[48.83px]">
            {priceDetails.price.amount}
          </span>
        </h5>

        <p
          className={`text-[14px] font-candara-rg leading-[17.09px] ${priceDetails.isPopular ? "text-white" : "text-black-300"}`}
        >
          {priceDetails.description.split("\n").map((eachLine, index) => (
            <React.Fragment key={index}>
              {eachLine}
              <br />
            </React.Fragment>
          ))}
        </p>

        <LightButton
          btnText="Choose plan"
          bgColor={priceDetails.isPopular ? "#FE7437" : "#fff"}
          popular={priceDetails.isPopular}
          extraClasses="mt-[8px]"
        />
      </div>

      <hr
        className={`border border-dashed ${priceDetails.isPopular ? "border-[#424242]" : "border-black-100"}`}
      />

      <ul className="flex flex-col gap-[12px]">
        <h5
          className={`text-[20px] font-candara-rg leading-[24.41px] ${priceDetails.isPopular ? "text-white" : "text-black-500"}`}
        >
          Features
        </h5>

        {priceDetails.features.length > 0 &&
          priceDetails.features.map((feature) => (
            <li key={feature} className="flex items-center gap-[12px]">
              <div
                className={`size-[20px] rounded-[5px] p-[2px] ${priceDetails.isPopular ? "bg-[#2F2F2F]" : "bg-[#FFF1EC]"}`}
              >
                <Image
                  src="/bin-yaber-assets/icons/check.png"
                  alt="check"
                  width={16}
                  height={16}
                />
              </div>
              <span
                className={`text-[16px] font-candara-rg font-bold leading-[19.53px] ${priceDetails.isPopular ? "text-white" : "text-black-500"}`}
              >
                {feature}
              </span>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default PriceCard;
