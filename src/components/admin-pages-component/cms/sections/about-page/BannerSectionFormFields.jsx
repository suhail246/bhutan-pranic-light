"use client";

import { NormalBrowseFileInputFiled } from "@/components";

const BannerSectionFormFields = ({
  activeLang,
  isFetching,
  labelText,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("about-us-section-1-banner-image", id);
    } else {
      onChangeImage("about-us-section-1-banner-image", "");
    }
  };

  if (activeLang === "en") {
    return (
      <NormalBrowseFileInputFiled
        isFetching={isFetching}
        labelText="Banner Image"
        fieldId="about-us-section-1-banner-image"
        allFilesResponse={allFilesResponse}
        searchValue={searchValue}
        selectedFileType={selectedFileType}
        onChangeImageFunction={getSelectedBannerImageId}
        selectedFileId={stateDetails?.["about-us-section-1-banner-image"] || ""}
        adminRole={adminRole}
        permissionsList={permissionsList}
        infoText="Recommended size: 1300 x 650px"
      />
    );
  }

  return null;
};

export default BannerSectionFormFields;
