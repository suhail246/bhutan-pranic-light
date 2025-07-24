import {
  getAllPublicFiles,
  getPublicNewsArticleDetails,
  getPublicPageCMSContent,
} from "@/actions/frontEndActions/action";
import {
  FrontEndBreadcrumb,
  GetInTouchSection,
  NewsDetailsSection,
} from "@/components/public-pages-component";

import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  // If slug is not provide, return default metadata
  if (!slug) {
    return {
      title: `News Article Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "News Article details not found.",
    };
  }

  // Fetch the post details
  const { newsArticleData } = await getPublicNewsArticleDetails(slug);
  const isDataAvailable = Object.keys(newsArticleData).length > 0;

  return {
    title: !isDataAvailable
      ? `News Article ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : newsArticleData?.metaTitle ||
        `New Article Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: !isDataAvailable
      ? "New Article details not found."
      : newsArticleData?.metaDescription || "News Article details page.",
  };
};

const NewsArticleDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const currentLanguage = await getLanguageFromCookie();
  const [newsArticleDetailsResponse, contentResponse, filesResponse] =
    await Promise.all([
      getPublicNewsArticleDetails(slug),
      getPublicPageCMSContent("news-blogs", currentLanguage),
      getAllPublicFiles(),
    ]);

  return (
    <>
      <div className="w-full px-[8px] lg:px-[60px]">
        <FrontEndBreadcrumb
          fields={[
            { label: "Home", link: ROUTES.HOME },
            { label: "News & Blogs", link: ROUTES.NEWS },
          ]}
          currentTabName={
            newsArticleDetailsResponse?.translationDetails?.[currentLanguage]
              ?.title
          }
          isCurrentTabTranslated={true}
          navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
        />

        <NewsDetailsSection
          currentLanguage={currentLanguage}
          newsArticleDetailsResponse={newsArticleDetailsResponse}
        />
      </div>

      <GetInTouchSection
        filesList={filesResponse?.filesList || []}
        contentData={contentResponse?.contentDetails || {}}
        sectionId={`${
          newsArticleDetailsResponse?.translationDetails?.[
            currentLanguage
          ]?.title?.toLowerCase() || "none"
        }-news-blog-details-page-get-in-touch-section`}
        imageKey="news-blogs-section-3-booking-image"
        titleKey="news-blogs-section-3-booking-title"
        headingKey="news-blogs-section-3-booking-heading"
        subHeadingKey="news-blogs-section-3-booking-sub-heading"
        buttonLabelKey="news-blogs-section-3-booking-button-label"
        buttonLinkKey="news-blogs-section-3-booking-button-link"
      />
    </>
  );
};

export default NewsArticleDetailsPage;
