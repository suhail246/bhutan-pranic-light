"use client";

import {
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const MessageSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  onChangeImage,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage("about-us-section-4-image", id);
    } else {
      onChangeImage("about-us-section-4-image", "");
    }
  };

  return (
    <>
      {/* Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId={`about-us-section-4-image`}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={stateDetails?.[`about-us-section-4-image`] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mb-5"
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="about-us-section-4-heading"
        fieldName="about-us-section-4-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["about-us-section-4-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mb-5"
        translateField={true}
      />

      {/* Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Description"
        fieldId="about-us-section-4-description"
        fieldName="about-us-section-4-description"
        placeholderText="Description"
        inputValue={stateDetails?.["about-us-section-4-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        translateField={true}
      />
    </>
  );
};

export default MessageSectionFormFields;
