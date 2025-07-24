import { PageNavigationButton } from "../..";

const OurMissionSection = ({ contentData }) => {
  const tagText = contentData?.["about-us-section-2-title"] || "";
  const heading = contentData?.["about-us-section-2-heading"] || "";
  const description = contentData?.["about-us-section-2-description"] || "";

  // Required data if any is not provided, return null
  if (!tagText && !heading && !description) return null;

  return (
    <div className="w-full px-[8px] py-[48px] md:px-[46px] md:py-[120px] flex flex-col lg:flex-row lg:justify-between gap-5">
      {(tagText || heading) && (
        <div className="min-w-[258px] flex flex-col gap-[14px] md:gap-[28px]">
          {tagText && (
            <PageNavigationButton
              btnText={tagText}
              extraClasses="w-fit h-fit"
            />
          )}

          {heading && (
            <h1 className="text-[40px] md:text-[50px] text-black-500 font-candara-rg font-bold leading-[48.83px] md:leading-[61.04px]">
              {heading}
            </h1>
          )}
        </div>
      )}

      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="about-us-section-2-description w-full md:max-w-[847px]"
        />
      )}
    </div>
  );
};

export default OurMissionSection;
