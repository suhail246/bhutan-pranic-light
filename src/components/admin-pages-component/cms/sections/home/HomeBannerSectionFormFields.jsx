"use client";

import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeBannerSectionFormFields = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const isNonTranslatableField = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("home-section-1-banner-image", id);
    } else {
      onChangeImage("home-section-1-banner-image", "");
    }
  };

  return (
    <>
      {/* Banner Image */}
      {isNonTranslatableField && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Banner Image"
          fieldId="home-section-1-banner-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={stateDetails?.["home-section-1-banner-image"] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Recommended size: 1300 x 650px"
          extraContainerClasses="mb-5"
        />
      )}

      {/* Banner Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-1-banner-heading"
        fieldName="home-section-1-banner-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-1-banner-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />
    </>
  );
};

export default HomeBannerSectionFormFields;
