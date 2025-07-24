import Button from "@/components/public-pages-component/common/BhuYellowBtn";
import React from "react";

const HeadingBtn = () => {
  return (
    <div className="absolute top-[200px] left-[20px]">
      <h2 className="primary-font-family text-[#000] text-lg mb-2 leading-[20px] uppercase">
        Bhutan Pranic Healing Centre presents
      </h2>
      <h1 className="primary-font-family text-[#000] text-5xl font-bold mb-4 leading-[55px] uppercase">
        Bhutan Pranic <br /> Healing Centre <br /> presents
      </h1>
      <p className="secondary-font-family text-[#000] mb-6 leading-[26px] uppercase">
        Join us for a life-transforming experience in <br />
        the heart of Bhutan. Learn ancient energy healing <br />
        techniques to balance mind, body, and spirit.
      </p>
      <div className="flex items-center gap-5">
        <Button children={"Book Your Seat"} variant={"primary"} />
        <Button variant="secondary">Learn More</Button>
      </div>
    </div>
  );
};

export default HeadingBtn;
