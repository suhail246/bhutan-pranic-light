import Image from "next/image";
import Link from "next/link";

const CallToActionButton = ({
  text,
  targetLink = "#",
  extraClasses = "",
  iconContainerClass = "size-[24px]",
}) => {
  return (
    <Link
      href={targetLink}
      className={`w-fit text-[16px] font-candara-rg text-black-500 ${extraClasses}`}
    >
      <span>{text}</span>
      <div className={`${iconContainerClass} relative`}>
        <Image
          src="/bin-yaber-assets/icons/arrows-right/arrow-right.png"
          alt="arrow right"
          fill
          sizes="(max-width: 768px) 24px, 24px"
        />
      </div>
    </Link>
  );
};

export default CallToActionButton;
