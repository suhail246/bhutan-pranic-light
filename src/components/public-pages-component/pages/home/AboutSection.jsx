import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DrawOutlineLinkButton, PageNavigationButton } from "../..";

const AboutSection = ({ filesList, contentData }) => {
  const imageOne = contentData?.["home-section-3-about-us-image-1"] || "";
  const imageTwo = contentData?.["home-section-3-about-us-image-2"] || "";
  const imageThree = contentData?.["home-section-3-about-us-image-3"] || "";
  const title = contentData?.["home-section-3-about-us-title"] || "";
  const description =
    contentData?.["home-section-3-about-us-description"] || "";
  const buttonLabel =
    contentData?.["home-section-3-about-us-button-label"] || "";
  const buttonLink = contentData?.["home-section-3-about-us-button-link"] || "";

  // Required data if any is not provided, return null
  if (
    !imageOne &&
    !imageTwo &&
    !imageThree &&
    !title &&
    !description &&
    !buttonLabel &&
    !buttonLink
  )
    return null;

  const imageOneURL =
    getFileSettingsValue(filesList, imageOne || "")?.fileUrl || null;

  const imageTwoURL =
    getFileSettingsValue(filesList, imageTwo || "")?.fileUrl || null;

  const imageThreeURL =
    getFileSettingsValue(filesList, imageThree || "")?.fileUrl || null;

  return (
    <>
      <section
        id="home-page-about-section"
        className="w-full pt-[48px] md:px-[60px] md:pt-[80px]"
      >
        <div className="flex flex-col xl:flex-row xl:justify-between gap-4 xl:gap-5">
          {title && (
            <PageNavigationButton btnText={title} extraClasses="w-fit h-fit" />
          )}

          <div className="w-full max-w-[841px]">
            {description && (
              <p className="text-[18px] md:text-[32px] leading-[21.97px] md:leading-[39.06px] text-black-500 font-candara-rg">
                {description}
              </p>
            )}

            {(buttonLabel || buttonLink) && (
              <DrawOutlineLinkButton
                redirectionLink={buttonLink || "#"}
                extraClasses="hidden md:flex"
                btnClasses="p-[12px]"
              >
                <span className="text-[16px] md:text-[20px] text-black-500 font-candara-rg flex items-center gap-2">
                  <span>{buttonLabel}</span>
                  <ArrowRight className="size-[20px] md:size-[24px] text-black-300 rtl:rotate-[180deg]" />
                </span>
              </DrawOutlineLinkButton>
            )}
          </div>
        </div>

        {/* Desktop Image Layout (Stacked) */}
        {(imageOneURL || imageTwoURL || imageThreeURL) && (
          <div className="w-full h-[300px] hidden md:flex justify-center gap-5 mt-[48px] md:mt-[50px]">
            {[imageOneURL, imageTwoURL, imageThreeURL].map(
              (eachImage, index) =>
                eachImage && (
                  <div
                    key={`image-${index + 1}`}
                    className="relative rounded-[12px] md:rounded-[17px] overflow-hidden w-full max-w-[322px] h-full group"
                  >
                    <Image
                      src={eachImage}
                      alt={`Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 100vw"
                      className="object-cover group-hover:scale-[1.2] transition-300"
                    />
                  </div>
                )
            )}
          </div>
        )}

        {/* Mobile Image Layout (Stacked) */}
        {(imageOneURL || imageTwoURL || imageThreeURL) && (
          <div className="flex md:hidden w-full h-[242px] gap-2 mt-[48px]">
            {imageTwoURL && (
              <div className="w-full h-full relative rounded-[12px] overflow-hidden">
                <Image
                  src={imageTwoURL} // Middle image as main
                  alt="Image 2"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {(imageOneURL || imageThreeURL) && (
              <div className="flex flex-col w-full h-full gap-2">
                {imageOneURL && (
                  <div className="w-full h-[117px] relative rounded-[12px] overflow-hidden">
                    <Image
                      src={imageOneURL} // Left image
                      alt="Image 1"
                      fill
                      sizes="(max-width: 768px) 100vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {imageThreeURL && (
                  <div className="w-full h-[117px] relative rounded-[12px] overflow-hidden">
                    <Image
                      src={imageThreeURL} // Right image
                      alt="Image 3"
                      fill
                      sizes="(max-width: 768px) 100vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default AboutSection;
