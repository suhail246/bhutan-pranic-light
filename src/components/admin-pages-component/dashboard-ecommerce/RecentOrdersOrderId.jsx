"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { useMemo } from "react";

const RecentOrdersOrderId = ({ value }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const { textColor } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return <span className={`${textColor}`}>{value}</span>;
};

export default RecentOrdersOrderId;
