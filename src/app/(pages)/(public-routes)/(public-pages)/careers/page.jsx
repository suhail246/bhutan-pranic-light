import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicCareersPageData } from "@/actions/frontEndPageDataActions";
import {
  CareerListingSection,
  CommonBannerSection,
  FrontEndBreadcrumb,
  GetInTouchSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { useFilterActiveItems } from "@/lib/hooks";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("careers");
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

const CareersPage = async () => {
  const currentLanguage = await getLanguageFromCookie();

  // Fetch required data
  const { fetchData, contentData, otherInfoData, filesList } =
    await fetchPublicCareersPageData("careers", currentLanguage);

  // Filter active careers items
  const activeCareers = useFilterActiveItems(
    fetchData?.length > 0 ? fetchData : [],
    "isActive"
  ).sort((a, b) => Number(b.orderNumber || 1) - Number(a.orderNumber || 1));

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Careers"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="careers-hero-section"
        title={contentData?.["careers-section-1-title"] || ""}
        heading={contentData?.["careers-section-1-heading"] || ""}
        subHeading={contentData?.["careers-section-1-sub-heading"] || ""}
      />

      <CareerListingSection
        currentLanguage={currentLanguage}
        careers={activeCareers}
      />

      <GetInTouchSection
        filesList={filesList}
        contentData={contentData}
        sectionId="careers-page-get-in-touch-section"
        imageKey="careers-section-2-booking-image"
        titleKey="careers-section-2-booking-title"
        headingKey="careers-section-2-booking-heading"
        subHeadingKey="careers-section-2-booking-sub-heading"
        buttonLabelKey="careers-section-2-booking-button-label"
        buttonLinkKey="careers-section-2-booking-button-link"
      />
    </div>
  );
};

export default CareersPage;
