import Button from "@/components/public-pages-component/common/BhuYellowBtn";
import React from "react";

const HeadingBtn = () => {
  return (
    <div className="absolute top-[200px] left-[20px]">
      <h2 className="primary-font-family text-[#000] text-lg mb-2 leading-[20px] uppercase">
        Lorem ipsum dolor sit amet.
      </h2>
      <h1 className="primary-font-family text-[#000] text-5xl font-bold mb-4 leading-[55px] uppercase">
        Lorem, ipsum.
        <br /> Lorem, ipsum. <br />
        Lorem, ipsum dolor.
      </h1>
      <p className="secondary-font-family text-[#000] mb-6 leading-[26px] uppercase">
        Lorem ipsum dolor sit, perspiciatis
        <br /> distinctio autem eos harum numquam dolore <br />
        placeat illum labore.
      </p>
      <div className="flex items-center gap-5">
        <Button children={"Book Your Seat"} variant={"primary"} />
        <Button variant="secondary">Learn More</Button>
      </div>
    </div>
  );
};

export default HeadingBtn;
