import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const WhyChooseUsSection = ({ filesList, contentData }) => {
  const image =
    getFileSettingsValue(
      filesList,
      contentData?.["about-us-section-3-image"] || ""
    )?.fileUrl || null;
  const heading = contentData?.["about-us-section-3-heading"] || "";
  const description = contentData?.["about-us-section-3-description"] || "";

  // Required data if any is not provided, return null
  if (!image && !heading && !description) return null;

  return (
    <div className="w-full pb-[100px] md:pb-[130px] px-[8px] md:px-[48px] flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[24px] md:gap-[53px]">
      {image && (
        <div className="w-full h-[352px] lg:max-w-[617px] lg:h-[633px] rounded-[20px] lg:rounded-[24px] relative overflow-hidden group">
          <Image
            src={image}
            alt="Why Choose Us"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover bg-center group-hover:scale-[1.1] transition-300"
          />
        </div>
      )}

      {(heading || description) && (
        <div className="w-full lg:max-w-[650px] flex flex-col gap-[12px] lg:gap-[40px]">
          {heading && (
            <h1 className="text-[28px] md:text-[50px] text-black-500 font-candara-rg font-bold">
              {heading}
            </h1>
          )}

          {description && (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="about-us-section-3-description"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WhyChooseUsSection;
