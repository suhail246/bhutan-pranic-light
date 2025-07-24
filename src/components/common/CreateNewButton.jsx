"use client";

import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import Link from "next/link";
import { useMemo } from "react";

const CreateNewButton = ({
  hrefLink = "#",
  text = "Create New",
  extraClass,
}) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const { active } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  return (
    <Link
      href={hrefLink}
      className={`px-6 py-2 font-poppins-md text-[14px] rounded-md ${active} text-white w-fit transition-all shadow-[3px_3px_0px_#b3b1b1] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]`}
    >
      {text}
    </Link>
  );
};

export default CreateNewButton;
