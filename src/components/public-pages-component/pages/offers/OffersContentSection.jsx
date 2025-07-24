import { DarkButton, PageNavigationButton } from "../..";

const OffersContentSection = ({ contentData }) => {
  const title = contentData?.["offers-section-2-title"] || "";
  const heading = contentData?.["offers-section-2-heading"] || "";
  const description = contentData?.["offers-section-2-description"] || "";
  const buttonLabel = contentData?.["offers-section-2-button-label"] || "";
  const buttonLink = contentData?.["offers-section-2-button-link"] || "";

  if (!title && !heading && !description && !buttonLabel && !buttonLink)
    return null;

  return (
    <div className="w-full my-[60px] px-[8px] md:px-[46px] flex flex-col lg:flex-row lg:justify-between gap-5">
      {(title || heading) && (
        <div className="w-full md:max-w-[328px] flex flex-col gap-5">
          {title && (
            <PageNavigationButton btnText={title} extraClasses="w-fit h-fit" />
          )}

          {heading && (
            <h1 className="text-[32px] md:text-[50px] text-black-500 font-candara-rg font-bold leading-[100%]">
              {heading}
            </h1>
          )}
        </div>
      )}

      {(description || (buttonlabel && buttonLink)) && (
        <div className="w-full md:max-w-[847px] flex flex-col gap-[40px]">
          {description && (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="offers-section-2-description"
            />
          )}

          {buttonLabel && buttonLink && (
            <DarkButton
              btnText={buttonLabel}
              targetLink={buttonLink}
              extraClasses="md:max-w-[343px]"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OffersContentSection;
