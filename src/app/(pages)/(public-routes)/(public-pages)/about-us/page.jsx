import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicCommonPageData } from "@/actions/frontEndPageDataActions";
import {
  BannerSection,
  ChairmanMessageSection,
  FrontEndBreadcrumb,
  GetInTouchSection,
  OurMissionSection,
  OurVisionSection,
  WhyChooseUsSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("about-us");
  const isPageInfoExist = Object.keys(otherInfoData).length > 0;

  if (
    !isPageInfoExist ||
    !otherInfoData.pageMetaTitle ||
    !otherInfoData.pageMetaDescription
  ) {
    return {
      title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME || "Default Title",
      description:
        process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION ||
        "Default Description",
    };
  }

  return {
    title: otherInfoData.pageMetaTitle,
    description: otherInfoData.pageMetaDescription,
  };
};

const AboutUsPage = async () => {
  const currentLanguage = await getLanguageFromCookie();

  const { filesList, contentData, otherInfoData } =
    await fetchPublicCommonPageData("about-us", currentLanguage);

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Offers"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <BannerSection filesList={filesList} contentData={contentData} />

      <OurMissionSection contentData={contentData} />

      <OurVisionSection filesList={filesList} contentData={contentData} />

      <WhyChooseUsSection filesList={filesList} contentData={contentData} />

      <ChairmanMessageSection filesList={filesList} contentData={contentData} />

      <GetInTouchSection
        filesList={filesList}
        contentData={contentData}
        sectionId="about-us-page-get-in-touch-section"
        imageKey="about-us-section-5-booking-image"
        titleKey="about-us-section-5-booking-title"
        headingKey="about-us-section-5-booking-heading"
        subHeadingKey="about-us-section-5-booking-sub-heading"
        buttonLabelKey="about-us-section-5-booking-button-label"
        buttonLinkKey="about-us-section-5-booking-button-link"
      />
    </div>
  );
};

export default AboutUsPage;
