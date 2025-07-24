import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicCoursesPageData } from "@/actions/frontEndPageDataActions";
import {
  CommonBannerSection,
  CoursesListing,
  FrontEndBreadcrumb,
  GetInTouchSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { useFilterActiveItems } from "@/lib/hooks";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("courses");
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

const CoursesListingPage = async () => {
  const currentLanguage = await getLanguageFromCookie();

  const { contentData, otherInfoData, filesList, coursesResponse } =
    await fetchPublicCoursesPageData("courses", currentLanguage);

  // Filter the active courses
  const activeCourses =
    coursesResponse?.fetchData?.length > 0
      ? useFilterActiveItems(coursesResponse.fetchData, "isActive")
      : [];

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Courses"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="courses-banner-section"
        title={contentData?.["courses-section-1-title"] || ""}
        heading={contentData?.["courses-section-1-heading"] || ""}
        subHeading={contentData?.["courses-section-1-sub-heading"] || ""}
      />

      <CoursesListing
        currentLanguage={currentLanguage}
        coursesList={activeCourses}
      />

      <GetInTouchSection
        filesList={filesList}
        contentData={contentData}
        sectionId="courses-page-get-in-touch-section"
        imageKey="courses-section-2-booking-image"
        titleKey="courses-section-2-booking-title"
        headingKey="courses-section-2-booking-heading"
        subHeadingKey="courses-section-2-booking-sub-heading"
        buttonLabelKey="courses-section-2-booking-button-label"
        buttonLinkKey="courses-section-2-booking-button-link"
      />
    </div>
  );
};

export default CoursesListingPage;
