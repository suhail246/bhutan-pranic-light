"use client";

import {
  getWebSettingFiledData,
  websiteSettingsUpdate,
} from "@/actions/apiClientActions/website-settings";
import { footer_social_links_icons } from "@/app/assets/data/footerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LabelText,
  NormalSwitchInputField,
  SettingsUpdateButton,
} from "@/components";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { isValidJSONData } from "@/utils/website-settings-helper";
import { useCallback, useEffect, useMemo, useState } from "react";

const SocialLinksWidget = ({ userId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const [formData, setFormData] = useState({
    show_social_links: "0",
    social_whatsapp: "",
    social_snapchat: "",
    social_tiktok: "",
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_youtube: "",
    social_linkedin: "",
    social_github: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch data
  const getAllSocialLinksFieldsData = useCallback(async () => {
    setIsFetching(true);

    try {
      const response = await getWebSettingFiledData(
        userId,
        Object.keys(formData)
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
      console.error("Failed to fetch social links settings data:", error);
      useErrorToast("Failed to fetch social links settings.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitting) {
      getAllSocialLinksFieldsData();
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

  // Handle Switch State
  const onChangeSwtichState = () => {
    setFormData((prev) => ({
      ...prev,
      show_social_links: prev.show_social_links === "0" ? "1" : "0",
    }));
  };

  // Handle OnSubmit Form
  const handleSocialLinksDataSubmit = async (e) => {
    e.preventDefault();

    const formatedFormData = {
      types: Object.keys(formData),
      ...formData,
    };

    setIsSubmitting(true);

    try {
      const response = await websiteSettingsUpdate(userId, formatedFormData);
      if (response.success) {
        useSuccessToast(response?.message || "Settings updated successfully.");
      } else {
        useErrorToast(response?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update social links settings:", error);
      useErrorToast("Failed to update social links settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} w-full max-w-[800px] mx-auto mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      <h1 className="py-3 px-4 md:px-5 text-[16px] font-poppins-md text-dark-weight-550 dark:text-light-weight-550 border-b border-[#000]/20 dark:border-[#fff]/10">
        Social Link Widget
      </h1>

      <form onSubmit={handleSocialLinksDataSubmit} className="py-4 px-5">
        {/* Show Social Links */}
        <NormalSwitchInputField
          isFetching={isFetching}
          labelText="Show Social Links?"
          fieldId="show-social-links"
          fieldName="show_social_links"
          switchStatus={formData?.show_social_links || "0"}
          onChangeSwtichState={onChangeSwtichState}
          extraContainerClasses="mt-5"
          customBodySize="h-5 w-10"
          customThumbSize="h-4 w-5"
        />

        <div className="flex flex-col gap-1 mt-5">
          {isFetching ? (
            <Skeleton className="w-[150px] h-[30px] rounded-md" />
          ) : (
            <LabelText text="Social Links" htmlForId="social-links" />
          )}

          <div className="flex flex-col gap-4">
            {Object.keys(formData).map((key) =>
              key.startsWith("social_") ? (
                isFetching ? (
                  <Skeleton
                    key={key}
                    className={`w-full h-[45px] rounded-md`}
                  />
                ) : (
                  <div
                    key={key}
                    className="w-full h-[45px] border border-[#000]/20 dark:border-[#fff]/10 rounded-sm flex"
                  >
                    <div className="bg-[#000]/10 px-4 py-2 flex justify-center items-center">
                      {footer_social_links_icons[key]}
                    </div>
                    <Input
                      id={key}
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={onChangeTextInputField}
                      placeholder={key.split("_")[1].toUpperCase()}
                      className="w-full h-full border-none outline-none focus:ring-0 focus:outline-none bg-transparent dark:bg-dark-dencity-300 text-[13px] font-poppins-rg text-light-weight-400"
                    />
                  </div>
                )
              ) : null
            )}
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <SettingsUpdateButton
            isFetching={isFetching}
            isSubmitting={isSubmitting}
            colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
            btnText="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default SocialLinksWidget;
