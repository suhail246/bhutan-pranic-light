import Link from "next/link";

const LightButton = ({
  btnText,
  bgColor = "#fff",
  extraClasses = "",
  targetLink = "#",
  popular = false,
}) => {
  return (
    <Link href={targetLink}>
      <button
        type="button"
        className={`w-full rounded-[14px] py-[12px] px-[16px] text-center text-[16px] font-candara-rg leading-[24px] ${popular ? "text-[#fff]" : "text-black-500 border border-black-100"} ${extraClasses}`}
        style={{
          backgroundColor: bgColor,
        }}
      >
        {btnText}
      </button>
    </Link>
  );
};

export default LightButton;
