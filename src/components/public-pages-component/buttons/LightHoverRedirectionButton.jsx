import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LightHoverRedirectionButton = ({
  redirectionLink = "#",
  btnText = "Read more",
  icon = false,
  extraClasses = "",
  btnClasses = "",
}) => {
  return (
    <Link href={redirectionLink} className={extraClasses}>
      <div className="w-fit hover:bg-black-500 rounded-[14px] transition-all duration-500 ease-in-out group">
        <button
          type="button"
          className={`${btnClasses} rounded-[14px] leading-[150%] tracking-[-2%] py-[12px] px-[16px] flex items-center gap-[8px]
          text-black-500 group-hover:text-white
          group-hover:bg-orange-500 group-hover:translate-x-[5px] group-hover:translate-y-[-5px] transition-all duration-500 ease-in-out z-[99]`}
        >
          <span>{btnText}</span>
          {icon && (
            <ArrowRight className="size-[16px] text-black-300 group-hover:text-white rtl:rotate-[180deg]" />
          )}
        </button>
      </div>
    </Link>
  );
};

export default LightHoverRedirectionButton;
