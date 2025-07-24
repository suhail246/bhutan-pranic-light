import Image from "next/image";

const PopularButton = ({
  iconFileName = "fire",
  btnText = "Most Popular",
  extraClasses = "",
}) => {
  return (
    <button
      type="button"
      className={`py-[4px] px-[8px] bg-[#F9EFE4] rounded-[32px] border border-[#F7EADB] text-[12px] lg:text-[14px] text-orange-500 font-pp-neue-montreal-md leading-[21px] flex items-center gap-[4px] ${extraClasses}`}
    >
      <div className="relative size-[12px] lg:size-[14px]">
        <Image
          src={`/bin-yaber-assets/icons/popular/${iconFileName}.png`}
          alt="fire"
          fill
          sizes="(max-width: 768px) 14px, 14px"
        />
      </div>
      <span>{btnText}</span>
    </button>
  );
};

export default PopularButton;
