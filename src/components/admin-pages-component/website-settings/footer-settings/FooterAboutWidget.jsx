"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
  SettingsUpdateButton,
  TranslationNormalForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const FooterAboutWidget = ({
  userId,
  allFilesResponse,
  languagesResponse,
  adminRole,
  permissionsList,
  searchValue,
  selectedFileType,
}) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    footer_logo: "",
    footer_title: "",
    footer_description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getAllFooterAboutFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData),
        activeTab
      );

      if (response.targetFieldsData) {
        Object.entries(response.targetFieldsData).forEach(([key, value]) => {
          setFormData((prev) => ({
            ...prev,
            [key]: isValidJSONData(value) ? JSON.parse(value) : value,
          }));
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch footer about widget settings data:",
        error
      );
      useErrorToast("Failed to fetch footer about widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllFooterAboutFieldsData();
    }
  }, [isSubmitting]);

  // Handle Text Input Field State
  const onChangeTextInputField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Text Editor Field
  const onChangeTextEditorFiled = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Footer Logo Image State
  const onChangeFooterLogoImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      footer_logo: id,
    }));
  };

  // Handle OnSubmit Form
  const handleFooterAboutDataSubmit = async (e) => {
    e.preventDefault();

    const formatedFormData = {
      types: Object.keys(formData),
      ...formData,
    };

    setIsSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(
        userId,
        formatedFormData,
        activeTab
      );
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update footer about widget settings:", error);
      useErrorToast("Failed to update footer about widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        About Widget
      </h1>

      {activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <form onSubmit={handleFooterAboutDataSubmit} className="py-4 px-5">
          {/* Footer Logo */}
          <NormalBrowseFileInputFiled
            userId={userId}
            isFetching={isFetching}
            labelText="Footer Logo"
            fieldId="footer_logo"
            allFilesResponse={allFilesResponse}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeImageFunction={onChangeFooterLogoImage}
            selectedFileId={formData?.footer_logo || ""}
            adminRole={adminRole}
            permissionsList={permissionsList}
            infoText="Minimum dimensions required: 275px width X 44px height."
          />

          {/* Footer Title */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Footer Title"
            fieldId="footer-title"
            fieldName="footer_title"
            placeholderText="Footer Title"
            inputValue={formData?.footer_title || ""}
            onChangeTextInputField={onChangeTextInputField}
            extraContainerClasses="mt-5"
            translateField={true}
          />

          {/* Footer Description */}
          <NormalTextEditorInputFiled
            isFetching={isFetching}
            labelText="Footer Description"
            fieldId="footer-description"
            fieldName="footer_description"
            placeholderText="Footer Description"
            inputValue={formData?.footer_description || ""}
            onChangeTextEditorFiled={onChangeTextEditorFiled}
            extraContainerClasses="mt-5"
            translateField={true}
          />

          <div className="flex justify-end mt-5">
            <SettingsUpdateButton
              isFetching={isFetching}
              isSubmitting={isSubmitting}
              colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
              btnText="Update"
            />
          </div>
        </form>
      ) : (
        <TranslationNormalForm
          fields={[
            {
              labelText: "Footer Title",
              fieldId: `footer-title-lang-${activeTab}`,
              fieldName: "footer_title",
              placeholderText: "Footer Title",
              inputValue: "",
              isTextEditorType: false,
              translateField: true,
            },
            {
              labelText: "Footer Description",
              fieldId: `footer-description-lang-${activeTab}`,
              fieldName: "footer_description",
              placeholderText: "Footer Description",
              inputValue: "",
              isTextEditorType: true,
              translateField: true,
              extraContainerClasses: "mt-5",
            },
          ]}
          userId={userId}
          activeTab={activeTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}
    </div>
  );
};

export default FooterAboutWidget;
