import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";
import { DarkButton, PageNavigationButton } from "../..";

const GetInTouchSection = ({
  filesList,
  contentData,
  sectionId = "",
  imageKey = "",
  titleKey = "",
  headingKey = "",
  subHeadingKey = "",
  buttonLabelKey = "",
  buttonLinkKey = "",
}) => {
  const image = contentData?.[imageKey] || "";
  const title = contentData?.[titleKey] || "";
  const heading = contentData?.[headingKey] || "";
  const subHeading = contentData?.[subHeadingKey] || "";
  const buttonLabel = contentData?.[buttonLabelKey] || "";
  const buttonLink = contentData?.[buttonLinkKey] || "";

  // Required data if any is not provided, return null
  if (
    !image &&
    !title &&
    !heading &&
    !subHeading &&
    !buttonLabel &&
    !buttonLink
  )
    return null;

  const imageUrl =
    getFileSettingsValue(filesList, image || "")?.fileUrl || null;

  return (
    <>
      <section id={sectionId} className="w-full py-[80px]">
        <div className="w-full rounded-[20px] md:rounded-[26px] bg-white p-[16px] md:px-[20px] md:py-[50px] flex flex-col md:flex-row md:items-center md:justify-between gap-[40px]">
          {(title || heading || subHeading || (buttonLabel && buttonLink)) && (
            <div className="w-full max-w-[580px] flex flex-col gap-[14px] md:gap-[16px]">
              {title && (
                <PageNavigationButton
                  btnText={title}
                  extraClasses="md:hidden mx-auto w-fit"
                />
              )}

              {heading && (
                <h1 className="text-[28px] md:text-[50px] font-candara-rg font-bold text-black-500 leading-[34.18px] md:leading-[61.04px]">
                  {heading}
                </h1>
              )}

              {subHeading && (
                <p className="text-[14px] md:text-[18px] text-black-500 font-candara-rg leading-[17.09px] md:leading-[21.97px]">
                  {subHeading}
                </p>
              )}

              {buttonLabel && buttonLink && (
                <DarkButton
                  btnText={buttonLabel}
                  targetLink={buttonLink}
                  containerClasses="mt-[10px] md:mt-[12px]"
                  extraClasses="md:max-w-[225px]"
                />
              )}
            </div>
          )}

          {imageUrl && (
            <div className="w-full max-w-[693px] h-[255px] md:h-[623px] rounded-[20px] md:rounded-[26px] overflow-hidden relative group">
              <Image
                src={imageUrl}
                alt="Get in touch"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover group-hover:scale-[1.1] transition-300"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GetInTouchSection;
