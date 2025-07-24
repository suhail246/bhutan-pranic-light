import {
  NewsArticleListingSection,
  NewsCategoryListingSection,
  PaginationSection,
} from "../..";

const NewsListingSection = ({
  currentLanguage,
  newsArticleResponse,
  newsCategoriesResponse,
  search,
  selectedCategoryId,
  selectedPage,
  contentData,
}) => {
  const totalItemsCount =
    newsArticleResponse?.paginationData?.totalItemsCount || 0;
  const currentLimit = newsArticleResponse?.currentLimit || 0;
  const categoryTitle =
    contentData?.["news-and-blogs-section-2-category-title"] || "";
  const newsTitle =
    contentData?.["news-and-blogs-section-2-news-blogs-title"] || "";

  return (
    <div className="w-full pt-[24px] md:pt-[80px] px-[8px] md:px-[106px]">
      <div className="flex justify-between xl:gap-[80px]">
        <NewsCategoryListingSection
          currentLanguage={currentLanguage}
          newsCategoriesResponse={newsCategoriesResponse}
          selectedCategoryId={selectedCategoryId}
          categoryTitle={categoryTitle}
        />

        <NewsArticleListingSection
          currentLanguage={currentLanguage}
          newsArticleResponse={newsArticleResponse}
          search={search}
          newsTitle={newsTitle}
        />
      </div>

      {totalItemsCount > currentLimit && (
        <div className="w-full flex justify-center items-center gap-[12px] mt-[52px]">
          <PaginationSection
            paginationDetails={newsArticleResponse.paginationData}
            selectedPage={selectedPage}
          />
        </div>
      )}
    </div>
  );
};

export default NewsListingSection;
