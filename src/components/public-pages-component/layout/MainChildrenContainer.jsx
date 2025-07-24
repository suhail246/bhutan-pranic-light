"use client";

import { getFESettingsFieldValues } from "@/utils/website-settings-helper";
import { usePathname } from "next/navigation";

const MainChildrenContainer = ({ settingsData, children }) => {
  const pathname = usePathname();

  const { enable_sticky_header } = getFESettingsFieldValues(settingsData, [
    "enable_sticky_header",
  ]);

  return (
    <div
      className={`${
        pathname === "/"
          ? enable_sticky_header === 1
            ? "mt-[16px]"
            : "mt-[84px] lg:mt-0"
          : enable_sticky_header === 1
            ? "mt-[16px]"
            : "mt-[84px] lg:mt-[94px]"
      }`}
    >
      {children}
    </div>
  );
};

export default MainChildrenContainer;
