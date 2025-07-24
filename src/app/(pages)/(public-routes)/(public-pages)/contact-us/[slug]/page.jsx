import { getPublicContactDetails } from "@/actions/frontEndActions/action";
import {
  CommonBannerSection,
  ContactBranchDetailsSection,
  FrontEndBreadcrumb,
} from "@/components/public-pages-component";
import ROUTES from "@/constants/routes";
import { getLanguageFromCookie } from "@/utils/lanugage-action-utils";

// Handle dynamic meta data
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  // If slug is not provide, return default metadata
  if (!slug) {
    return {
      title: `Contact Branch Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Contact Branch details not found.",
    };
  }

  // Fetch the contact details
  const { contactDetails } = await getPublicContactDetails(slug);
  const isDataAvailable = Object.keys(contactDetails).length > 0;

  return {
    title: !isDataAvailable
      ? `Contact Branch ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : contactDetails?.metaTitle ||
        `Contact Branch Details ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: !isDataAvailable
      ? "Contact Branch details not found."
      : contactDetails?.metaDescription || "Contact Branch details page.",
  };
};

const ContactBranchDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const currentLanguage = await getLanguageFromCookie();
  const { contactDetails, translationDetails } =
    await getPublicContactDetails(slug);

  return (
    <div className="w-full">
      <FrontEndBreadcrumb
        fields={[
          { label: "Home", link: ROUTES.HOME },
          { label: "Contact us", link: ROUTES.CONTACT_US },
        ]}
        currentTabName={translationDetails?.[currentLanguage]?.branchName}
        isCurrentTabTranslated={true}
        navContainerClass="flex flex-wrap items-center gap-2 mb-[16px]"
      />

      <CommonBannerSection
        sectionId="contact-branch-details-banner-section"
        title="Contact us"
        heading={translationDetails?.[currentLanguage]?.title || ""}
        isTitleTranslated={false}
      />

      <ContactBranchDetailsSection
        currentLanguage={currentLanguage}
        contactDetails={contactDetails}
        translationDetails={translationDetails}
      />
    </div>
  );
};

export default ContactBranchDetailsPage;
