const PageNavigationButton = ({ btnText, extraClasses = "" }) => {
  return (
    <button
      className={`border border-black-100 rounded-[12px] flex items-center gap-2 text-[14px] md:text-[20px] font-candara-rg text-black-500 px-[14px] py-[12px] ${extraClasses}`}
    >
      <span className="size-[8px] bg-orange-500 rounded-full"></span>
      <span>{btnText}</span>
    </button>
  );
};

export default PageNavigationButton;
