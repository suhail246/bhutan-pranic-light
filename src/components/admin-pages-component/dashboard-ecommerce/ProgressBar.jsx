"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const ProgressBar = ({ value }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const { active, bgColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <div className={`h-[8px] w-full overflow-hidden rounded-[3px] ${bgColor}`}>
      <div
        style={{
          width: `${value}%`,
        }}
        className={`flex h-full justify-between px-3 ${active}`}
      ></div>
    </div>
  );
};

export default ProgressBar;
