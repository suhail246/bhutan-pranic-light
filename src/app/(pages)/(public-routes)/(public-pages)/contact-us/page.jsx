import { getPublicPageCMSContent } from "@/actions/frontEndActions/action";
import { fetchPublicContactUsPageData } from "@/actions/frontEndPageDataActions";
import {
  AllContactBranchesSection,
  CommonBannerSection,
  FeaturedContactsAndFormSection,
  FrontEndBreadcrumb,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import {
  useFilterActiveNonFeaturedItems,
  useFilterFeaturedItems,
} from "@/lib/hooks";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async () => {
  const { otherInfoData } = await getPublicPageCMSContent("contact-us");
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

const ContactUsPage = async ({ searchParams }) => {
  const currentLanguage = await getLanguageFromCookie();

  const {
    allContactResponse,
    searchContactResponse,
    contentData,
    otherInfoData,
  } = await fetchPublicContactUsPageData(
    searchParams,
    "contact-us",
    currentLanguage
  );

  // Filter Featured Contacts (Active)
  const featuredContacts = useFilterFeaturedItems(
    allContactResponse?.fetchData || [],
    "isFeatured"
  );

  // Filter Active Contacts (Non Featured)
  const ativeNonFeaturedContacts = useFilterActiveNonFeaturedItems(
    searchContactResponse?.fetchData || [],
    "isActive",
    "isFeatured"
  );

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[{ label: "Home", link: ROUTES.HOME }]}
        currentTabName={otherInfoData?.pageName || "Contact us"}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="contact-us-hero-section"
        title={contentData?.["contact-us-section-1-title"] || ""}
        heading={contentData?.["contact-us-section-1-heading"] || ""}
        subHeading={contentData?.["contact-us-section-1-sub-heading"] || ""}
      />

      {/* Featured Contacts and Contact Form Section */}
      <FeaturedContactsAndFormSection
        featuredContacts={featuredContacts}
        currentLanguage={currentLanguage}
      />

      {/* All Branches Section */}
      <AllContactBranchesSection
        currentLanguage={currentLanguage}
        contacts={ativeNonFeaturedContacts}
      />
    </div>
  );
};

export default ContactUsPage;
