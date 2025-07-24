import Image from "next/image";

const DataNotFound = ({
  notFoundText,
  extraClasses = "",
  extraTextStyle = "text-[16px] md:text-[24px]",
}) => {
  return (
    <div className={`w-full flex flex-col gap-5 ${extraClasses}`}>
      <div className="w-full h-[300px]">
        <Image
          src="/bin-yaber-assets/no-data-found-bg-remove.png"
          alt=" Offers Banner 1"
          quality={100}
          width={500}
          height={300}
          priority
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>

      <p
        className={`${extraTextStyle} text-black-300 font-candara-rg font-bold tracking-[-2%] text-center`}
      >
        {notFoundText}
      </p>
    </div>
  );
};

export default DataNotFound;
