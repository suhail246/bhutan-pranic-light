import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicNewsListingPageData } from "@/actions/frontEndPageDataActions";
import {
  CommonBannerSection,
  FrontEndBreadcrumb,
  GetInTouchSection,
  NewsListingSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("news-blogs");
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

const NewsPage = async ({ searchParams }) => {
  const currentLanguage = await getLanguageFromCookie();
  const {
    newsArticleResponse,
    newsCategoriesResponse,
    contentData,
    otherInfoData,
    filesList,
    search,
    category,
    page,
  } = await fetchPublicNewsListingPageData(
    searchParams,
    "news-blogs",
    currentLanguage
  );

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "News & Blogs"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="news-blogs-hero-section"
        title={contentData?.["news-and-blogs-section-1-title"] || ""}
        heading={contentData?.["news-and-blogs-section-1-heading"] || ""}
        subHeading={contentData?.["news-and-blogs-section-1-sub-heading"] || ""}
      />

      <NewsListingSection
        currentLanguage={currentLanguage}
        newsArticleResponse={newsArticleResponse}
        newsCategoriesResponse={newsCategoriesResponse}
        search={search}
        selectedCategoryId={category}
        selectedPage={page}
        contentData={contentData}
      />

      <GetInTouchSection
        filesList={filesList}
        contentData={contentData}
        sectionId="news-blogs-page-get-in-touch-section"
        imageKey="news-blogs-section-3-booking-image"
        titleKey="news-blogs-section-3-booking-title"
        headingKey="news-blogs-section-3-booking-heading"
        subHeadingKey="news-blogs-section-3-booking-sub-heading"
        buttonLabelKey="news-blogs-section-3-booking-button-label"
        buttonLinkKey="news-blogs-section-3-booking-button-link"
      />
    </div>
  );
};

export default NewsPage;
