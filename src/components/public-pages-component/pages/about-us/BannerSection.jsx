import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const BannerSection = ({ filesList, contentData }) => {
  const aboutPageBannerImage =
    getFileSettingsValue(
      filesList,
      contentData?.["about-us-section-1-banner-image"] || ""
    )?.fileUrl || null;

  if (aboutPageBannerImage) {
    return (
      <>
        <div className="w-full h-[378px] md:h-[608px] rounded-[20px] md:rounded-[24px] relative overflow-hidden">
          <Image
            src={aboutPageBannerImage}
            alt="Bin Yaber About Us Banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
          />
        </div>
      </>
    );
  }

  return null;
};

export default BannerSection;
