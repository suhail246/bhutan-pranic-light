import { globalStyleObj } from "@/app/assets/styles";
import { ClipLoader } from "react-spinners";

const SubmitButton = ({
  isSubmitting,
  hasChanges,
  isDetailsExist,
  colorGrade = { bgColor: "", hoverBgColor: "", textColor: "", hexCode: "" },
  label,
  icon,
  extraButtonStyle = "sm:max-w-[180px]",
}) => {
  return (
    <button
      type="submit"
      disabled={!isDetailsExist ? isSubmitting : !hasChanges || isSubmitting}
      className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-3 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full dark:text-light-weight-800 ${extraButtonStyle} ${
        (isDetailsExist && !hasChanges) || isSubmitting
          ? "cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      {isSubmitting ? (
        <>
          <ClipLoader color={colorGrade.hexCode} size={13} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon || null}
          {label || (isDetailsExist ? `Update Item` : `Create Item`)}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
