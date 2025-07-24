"use client";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";

const NavbarThemeSwitcher = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className={`${globalStyleObj.flexCenter} ${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} hidden rounded-full p-[5px] sm:flex sm:items-center sm:justify-center sm:p-[10px]`}
    >
      {theme === "light" ? (
        <IoMoonOutline
          size={20}
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
        />
      ) : (
        <IoSunnyOutline
          size={20}
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
        />
      )}
    </button>
  );
};

export default NavbarThemeSwitcher;
