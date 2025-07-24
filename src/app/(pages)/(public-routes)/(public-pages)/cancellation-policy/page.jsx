import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import {
  CommonBannerSection,
  FrontEndBreadcrumb,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent(
    "cancellation-policy"
  );
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

const CancellationPolicyPage = async () => {
  const currentLanguage = await getLanguageFromCookie();
  const { otherInfoData } = await getPublicPageCMSContent(
    "cancellation-policy",
    currentLanguage
  );

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Privacy policy"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="cancellation-policy-hero-section"
        heading={otherInfoData?.pageName || ""}
        updatedAt={otherInfoData?.pageLastUpdatedAt || ""}
      />

      {otherInfoData?.pageDescription && (
        <section
          id="cancellation-policy-description"
          className="w-full px-8 pt-[20px] md:pt-[40px] pb-[80px]"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: otherInfoData.pageDescription,
            }}
            className="privacy-policy-description w-full md:max-w-[797px] font-candara-rg mx-auto"
          />
        </section>
      )}
    </div>
  );
};

export default CancellationPolicyPage;
