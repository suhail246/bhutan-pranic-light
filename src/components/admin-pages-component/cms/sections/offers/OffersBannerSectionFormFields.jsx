"use client";

import { NormalBrowseFileInputFiled } from "@/components";

const OffersBannerSectionFormFields = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const onChangeOfferBanner1Image = (id) => {
    if (id) {
      onChangeImage("offers-section-1-banner-image-1", id);
    } else {
      onChangeImage("offers-section-1-banner-image-1", "");
    }
  };

  const onChangeOfferBanner2Image = (id) => {
    if (id) {
      onChangeImage("offers-section-1-banner-image-2", id);
    } else {
      onChangeImage("offers-section-1-banner-image-2", "");
    }
  };

  if (activeLang === "en") {
    return (
      <>
        {/* Banner Image 1 */}
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image 1"
          fieldId="offers-section-1-banner-image-1"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeOfferBanner1Image}
          selectedFileId={
            stateDetails?.["offers-section-1-banner-image-1"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
        />

        {/* Banner Image 2 */}
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image 2"
          fieldId="offers-section-1-banner-image-2"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeOfferBanner2Image}
          selectedFileId={
            stateDetails?.["offers-section-1-banner-image-2"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      </>
    );
  }

  return null;
};

export default OffersBannerSectionFormFields;
