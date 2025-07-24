import { getFileSettingsValue } from "@/utils/website-settings-helper";
import Image from "next/image";

const HeroSection = ({ filesList, contentData }) => {
  const bannerImage = contentData?.["home-section-1-banner-image"] || "";
  const heading = contentData?.["home-section-1-banner-heading"] || "";

  // Required data if any is not provided, return null
  if (!bannerImage && !heading) return null;

  // Extract Image URL from id
  const bannerImageUrl =
    getFileSettingsValue(filesList, bannerImage || "")?.fileUrl || null;

  return (
    <>
      {/* Mobile Hero Section */}
      <section id="mobile-screen-hero-section" className="lg:hidden w-full">
        {heading && (
          <h1 className="text-[34px] font-candara-rg font-bold leading-[41.5px] text-black-500 mt-[84px] mb-[16px]">
            {heading}
          </h1>
        )}

        {bannerImageUrl && (
          <div className="relative w-full aspect-[70/45] rounded-[20px] overflow-hidden">
            <Image
              src="/bin-yaber-assets/hero-section-bg-image.png"
              alt="banner image"
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <div className="absolute inset-0 bg-hero-section-gradient-mobile" />
          </div>
        )}
      </section>

      {/* Hero Section */}
      {(bannerImageUrl || heading) && (
        <section
          id="above-mobile-screen-hero-section"
          className="hidden lg:flex w-full min-h-screen bg-cover bg-center rounded-[24px] relative overflow-hidden"
          style={{
            backgroundImage: `url(${bannerImageUrl})`,
          }}
        >
          {bannerImageUrl && (
            <div className="absolute inset-0 bg-hero-section-gradient" />
          )}

          {heading && (
            <h1 className="relative max-w-[630px] text-[50px] text-[#fff] font-candara-rg font-bold leading-[61.04px] z-[99] mt-auto m-[54px]">
              Bin Yaber Driving Institute – Your Path to Safe Driving
            </h1>
          )}
        </section>
      )}
    </>
  );
};

export default HeroSection;
