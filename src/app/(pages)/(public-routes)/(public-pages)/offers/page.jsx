import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicCommonPageData } from "@/actions/frontEndPageDataActions";
import {
  FrontEndBreadcrumb,
  OffersBannerSection,
  OffersContentSection,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("offers");
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

const OffersPage = async () => {
  const currentLanguage = await getLanguageFromCookie();

  const { filesList, contentData, otherInfoData } =
    await fetchPublicCommonPageData("offers", currentLanguage);

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Offers"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <OffersBannerSection filesList={filesList} contentData={contentData} />

      <OffersContentSection contentData={contentData} />
    </div>
  );
};

export default OffersPage;
