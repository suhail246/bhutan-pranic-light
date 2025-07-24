import { CommonContactDetailsData, RenderGoogleMap } from "../..";

const ContactBranchDetailsSection = ({
  currentLanguage,
  contactDetails,
  translationDetails,
}) => {
  const isContactDetailsExist = Object.keys(contactDetails).length > 0;
  const isTranslationDetailsExist = Object.keys(translationDetails).length > 0;

  return (
    <section
      id="contact-branch-details-section"
      className={`w-full px-[8px] lg:px-[100px] xl:px-[141px] mt-[40px] mb-[80px] md:my-[100px] grid ${
        isContactDetailsExist && isTranslationDetailsExist
          ? "grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-5"
          : "grid-cols-1"
      }`}
    >
      {isContactDetailsExist && isTranslationDetailsExist && (
        <div className="flex flex-col gap-[22px]">
          <CommonContactDetailsData
            contactDetails={contactDetails}
            branchName={translationDetails?.[currentLanguage]?.branchName || ""}
            branchAddress={
              translationDetails?.[currentLanguage]?.branchAddress || ""
            }
            openingHoursLabels={
              translationDetails?.[currentLanguage]?.openingHours?.labels || []
            }
            emailVisibility={true}
          />
        </div>
      )}

      <RenderGoogleMap
        lat={contactDetails?.latitude || ""}
        lng={contactDetails?.longitude || ""}
      />
    </section>
  );
};

export default ContactBranchDetailsSection;
