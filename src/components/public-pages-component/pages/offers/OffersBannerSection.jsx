import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const OffersBannerSection = ({ filesList, contentData }) => {
  const offerBanner1URL =
    getFileSettingsValue(
      filesList,
      contentData?.["offers-section-1-banner-image-1"] || ""
    )?.fileUrl || null;

  const offerBanner2URL =
    getFileSettingsValue(
      filesList,
      contentData?.["offers-section-1-banner-image-2"] || ""
    )?.fileUrl || null;

  if (!offerBanner1URL && !offerBanner2URL) return null;

  return (
    <div className="w-full px-[8px] md:px-[46px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      {/* Banner 1 */}
      {offerBanner1URL && (
        <div className="w-full">
          <Image
            src={offerBanner1URL}
            alt=" Offers Banner 1"
            quality={100}
            width={650}
            height={672}
            priority
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      )}
      {/* Banner 2 */}
      {offerBanner2URL && (
        <div className="w-full">
          <Image
            src={offerBanner2URL}
            alt=" Offers Banner 2"
            quality={100}
            width={650}
            height={672}
            priority
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default OffersBannerSection;
