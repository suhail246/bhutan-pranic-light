"use client";

import {
  createNewLanguage,
  updatePerticularLanguage,
} from "@/actions/apiClientActions/languages";
import { globalStyleObj } from "@/app/assets/styles";
import { LanguageFormFields, PageRefresh } from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { AllLanguagesSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

const LanguageForm = ({ userId, languageDetails = {} }) => {
  const { isPending, pageRefresh } = usePageRefresh();
  // Custom Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const isLanguageDetailsExist = Object.keys(languageDetails).length > 0;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(AllLanguagesSchema),
    defaultValues: {
      name: languageDetails?.name || "",
      code: languageDetails?.code || "",
      app_lang_code: languageDetails?.app_lang_code || "",
    },
  });

  const relevantFields = {
    name: languageDetails?.name || "",
    code: languageDetails?.code || "",
    app_lang_code: languageDetails?.app_lang_code || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Validation Errors
  const handleValidationErrors = useCallback(
    (errors) => {
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: errors[field].message,
        });
      });
    },
    [setError]
  );

  // Handle Form Submission
  const onSubmit = async (data) => {
    // For Create New Language
    if (!isLanguageDetailsExist) {
      const response = await createNewLanguage(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Language created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Language
    else {
      const updateLangResponse = await updatePerticularLanguage(
        userId,
        languageDetails._id,
        data
      );

      if (updateLangResponse.success) {
        useSuccessToast(
          updateLangResponse?.message || "Language updated successfully."
        );
        pageRefresh();
      } else {
        if (updateLangResponse.errors) {
          handleValidationErrors(updateLangResponse.errors);
        } else {
          useErrorToast(updateLangResponse?.message || "Something went wrong.");
        }
      }
    }
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light`}
    >
      <LanguageFormFields
        submitFunction={handleSubmit(onSubmit)}
        isLanguageDetailsExist={isLanguageDetailsExist}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        hasChanges={hasChanges}
      />
    </div>
  );
};

export default LanguageForm;
