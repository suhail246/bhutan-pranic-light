import { useTranslations } from "next-intl";
import { ContactBranchesListing, DataNotFound, SearchContentBox } from "../..";

const AllContactBranchesSection = ({ currentLanguage, contacts }) => {
  const translate = useTranslations();

  const sortedContacts = contacts.sort((a, b) => {
    return Number(b.orderNumber || 1) - Number(a.orderNumber || 1);
  });
  const isActiveNonFeaturedContactsExists = sortedContacts.length > 0;

  return (
    <section
      id="all-contact-branches-section"
      className="w-full lg:px-[100px] xl:px-[141px] mb-[80px]"
    >
      <h2 className="text-[40px] text-black-500 font-candara-rg font-bold mb-5">
        {translate("Branches")}
      </h2>

      <SearchContentBox />

      {isActiveNonFeaturedContactsExists ? (
        <ContactBranchesListing
          contacts={sortedContacts}
          currentLanguage={currentLanguage}
        />
      ) : (
        <DataNotFound notFoundText={translate("No Branches Found")} />
      )}
    </section>
  );
};

export default AllContactBranchesSection;
