import Link from "next/link";

const DrawOutlineLinkButton = ({
  children,
  redirectionLink = "#",
  extraClasses = "",
  btnClasses = "px-4 py-2",
}) => {
  return (
    <Link href={redirectionLink} className={extraClasses}>
      <button href={redirectionLink} className={`group relative ${btnClasses}`}>
        {children}

        {/* TOP */}
        <span className="absolute left-0 top-0 h-[2px] w-0 bg-orange-500 transition-all duration-100 group-hover:w-full" />

        {/* RIGHT */}
        <span className="absolute right-0 top-0 h-0 w-[2px] bg-orange-500 transition-all delay-100 duration-100 group-hover:h-full" />

        {/* BOTTOM */}
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-orange-500 transition-all delay-200 duration-100 group-hover:w-full" />

        {/* LEFT */}
        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-orange-500 transition-all delay-300 duration-100 group-hover:h-full" />
      </button>
    </Link>
  );
};

export default DrawOutlineLinkButton;
