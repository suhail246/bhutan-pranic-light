"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { ClipLoader } from "react-spinners";
import { Skeleton } from "../ui/skeleton";

const SettingsUpdateButton = ({
  isFetching = false,
  isSubmitting = false,
  colorGrade = {
    bgColor: "",
    hoverBgColor: "",
    textColor: "",
    hexCode: "",
  },
  extraClasses = "",
  btnText = "Update",
}) => {
  return (
    <>
      {isFetching ? (
        <Skeleton className="w-[180px] h-[40px] rounded-md" />
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full sm:max-w-[180px] dark:text-light-weight-800 ${extraClasses} ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSubmitting ? (
            <>
              <ClipLoader color={colorGrade.hexCode} size={13} />
              <span>Processing...</span>
            </>
          ) : (
            <span>{btnText}</span>
          )}
        </button>
      )}
    </>
  );
};

export default SettingsUpdateButton;
