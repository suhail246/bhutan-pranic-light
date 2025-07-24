"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const CustomExportButton = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <button
      type="button"
      className={`${textColor} ${bgColor} ${hoverBgColor} rounded-[3px] px-[8px] py-[5px] font-poppins-rg text-[11px] transition-colors duration-300 hover:text-white`}
    >
      Export Report
    </button>
  );
};

export default CustomExportButton;
