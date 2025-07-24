import { NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomePricingSectionFormField = ({
  activeLang,
  isFetching,
  stateDetails,
  handleTextInputChange,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  return (
    <>
      {/* Tag Title */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Title"
        fieldId="home-section-5-pricing-title"
        fieldName="home-section-5-pricing-title"
        placeholderText="Tag Name"
        inputValue={stateDetails?.["home-section-5-pricing-title"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading 1"
        fieldId="home-section-5-pricing-heading"
        fieldName="home-section-5-pricing-heading"
        placeholderText="Heading 1"
        inputValue={stateDetails?.["home-section-5-pricing-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Second Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading 2"
        fieldId="home-section-5-pricing-sm-screen-heading"
        fieldName="home-section-5-pricing-sm-screen-heading"
        placeholderText="Heading 2"
        inputValue={
          stateDetails?.["home-section-5-pricing-sm-screen-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraFiledInfo="Heading for small screen devices"
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-5-pricing-description"
        fieldName="home-section-5-pricing-description"
        placeholderText="Description"
        inputValue={stateDetails?.["home-section-5-pricing-description"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Currency */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Currency"
          fieldId="home-section-5-pricing-currency"
          fieldName="home-section-5-pricing-currency"
          placeholderText="Currency Code"
          inputValue={stateDetails?.["home-section-5-pricing-currency"] || ""}
          onChangeTextInputField={handleTextInputChange}
          extraFiledInfo="Currency Code must be separated by a comma (,). Ex: AED,USD,..."
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default HomePricingSectionFormField;
