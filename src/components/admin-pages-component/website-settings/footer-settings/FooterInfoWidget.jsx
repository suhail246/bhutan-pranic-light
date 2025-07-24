"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  NormalTextInputField,
  SettingsUpdateButton,
  TranslationNormalForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const FooterInfoWidget = ({ userId, languagesResponse }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    contact_address: "",
    contact_number: "",
    whatsapp_number: "",
    contact_email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState("en");

  const activeLanguages = useMemo(
    () => languagesResponse?.fetchData?.filter((lang) => lang.status) || [],
    [languagesResponse]
  );

  // Fetch data
  const getAllFooterInfoFieldsData = useCallback(async () => {
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
      console.error("Failed to fetch footer info widget settings data:", error);
      useErrorToast("Failed to fetch footer info widget settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllFooterInfoFieldsData();
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

  // Handle OnSubmit Form
  const handleFooterInfoDataSubmit = async (e) => {
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
      console.error("Failed to update footer info widget settings:", error);
      useErrorToast("Failed to update footer info widget settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Info Widget
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
        <form onSubmit={handleFooterInfoDataSubmit} className="py-4 px-5">
          {/* Contact Address */}
          <NormalTextInputField
            isFetching={isFetching}
            isTextArea={true}
            labelText="Contact Address"
            fieldId="contact-address"
            fieldName="contact_address"
            placeholderText="Contact Address"
            inputValue={formData?.contact_address || ""}
            onChangeTextInputField={onChangeTextInputField}
            translateField={true}
          />

          {/* Contact Number */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Contact Number"
            fieldId="contact-number"
            fieldName="contact_number"
            placeholderText="Contact Number"
            inputValue={formData?.contact_number || ""}
            onChangeTextInputField={onChangeTextInputField}
            extraContainerClasses="mt-5"
          />

          {/* Whatsapp Number */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Whatsapp Number"
            fieldId="whatsapp-number"
            fieldName="whatsapp_number"
            placeholderText="Whatsapp Number"
            inputValue={formData?.whatsapp_number || ""}
            onChangeTextInputField={onChangeTextInputField}
            extraContainerClasses="mt-5"
          />

          {/* Contact Email */}
          <NormalTextInputField
            isFetching={isFetching}
            labelText="Contact Email"
            fieldId="contact-email"
            fieldName="contact_email"
            placeholderText="Contact Email"
            inputValue={formData?.contact_email || ""}
            onChangeTextInputField={onChangeTextInputField}
            extraContainerClasses="mt-5"
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
              labelText: "Contact Address",
              fieldId: `contact-address-lang-${activeTab}`,
              fieldName: "contact_address",
              placeholderText: "Contact Address",
              inputValue: "",
              isTextEditorType: false,
              isTextArea: true,
              translateField: true,
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

export default FooterInfoWidget;
