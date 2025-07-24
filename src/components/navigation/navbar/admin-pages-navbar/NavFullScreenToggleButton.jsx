"use client";

import { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";

const NavFullScreenToggleButton = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // NOTE: Handle fullscreen
  const handleFullScreen = () => {
    // Extract that elem which want to convert in fullscreen
    const fullScreenContainerElem = document.getElementById(
      "full-screen-toggle-container"
    );
    // Store the done fullscreen elem
    const fullScreenStatus = document.fullscreenElement;

    if (fullScreenStatus) {
      document.exitFullscreen(); // Exit fullscreen
    } else {
      fullScreenContainerElem.requestFullscreen(); // Convert fullscreen
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <button
      type="button"
      onClick={handleFullScreen}
      className={`${globalStyleObj.flexCenter} ${globalStyleObj.flexCenter} ${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px]`}
    >
      <span>
        {isFullScreen ? (
          <MdFullscreenExit
            size={22}
            className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
          />
        ) : (
          <MdFullscreen
            size={22}
            className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
          />
        )}
      </span>
    </button>
  );
};

export default NavFullScreenToggleButton;
