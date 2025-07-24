import { useTranslations } from "next-intl";
import { CommonContactDetailsData, ContactQueryForm } from "../..";

const FeaturedContactsAndFormSection = ({
  featuredContacts,
  currentLanguage,
}) => {
  const translate = useTranslations();
  const isFeaturedContactsExist = featuredContacts.length > 0;

  const sortedFeaturedContacts = featuredContacts.sort((a, b) => {
    return Number(b.orderNumber || 1) - Number(a.orderNumber || 1);
  });

  return (
    <section
      id="featured-contacts-and-form-section"
      className={`relative w-full mt-[16px] md:mt-[54px] mb-[100px] lg:px-[100px] xl:px-[141px] grid ${isFeaturedContactsExist ? "grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[32px]" : "grid-cols-1"}`}
    >
      {/* Featured Contact Lists */}
      {isFeaturedContactsExist && (
        <ul className="w-full flex flex-col gap-[40px] xl:gap-[80px] order-2 md:order-1">
          {sortedFeaturedContacts.map((contact) => (
            <li key={contact._id} className="flex flex-col gap-[22px]">
              <CommonContactDetailsData
                contactDetails={contact}
                branchName={contact?.branchName?.[currentLanguage] || ""}
                branchAddress={contact?.branchAddress?.[currentLanguage] || ""}
                openingHoursLabels={
                  contact?.openingHours?.labels?.[currentLanguage] || []
                }
                redirectionStatus={true}
                emailVisibility={false}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Contact Form */}
      <div
        className={`w-full h-fit md:max-w-[600px] order-1 md:order-2 md:sticky top-0`}
      >
        <ContactQueryForm currentLanguage={currentLanguage} />
      </div>
    </section>
  );
};

export default FeaturedContactsAndFormSection;
