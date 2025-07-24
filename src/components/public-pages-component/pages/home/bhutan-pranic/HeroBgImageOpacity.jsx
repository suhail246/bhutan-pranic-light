import React from "react";

const ShineOverlay = ({
  hoverContainerSize = "group-hover:w-[100%] group-hover:h-[100%]",
}) => {
  return (
    <div className="absolute inset-0 z-[9] pointer-events-none">
      <div
        className={`w-0 h-[200%] ${hoverContainerSize} opacity-0 group-hover:animate-[opacityPulse_1s_ease-in-out] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-[#ffffff70] transition-all duration-1000 ease-in-out`}
      />
    </div>
  );
};

export default ShineOverlay;
