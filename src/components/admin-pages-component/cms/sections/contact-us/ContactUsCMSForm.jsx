import { ContactUsHeroSection } from "@/components";

const ContactUsCMSForm = ({ isFetching, formData, handleTextInputChange }) => {
  return (
    <>
      {selectedTab === "section-1" && (
        <ContactUsHeroSection
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}
    </>
  );
};

export default ContactUsCMSForm;
