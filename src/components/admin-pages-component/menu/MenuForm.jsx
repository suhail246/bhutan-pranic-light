"use client";

import {
  createNewMenu,
  updatePerticularMenu,
} from "@/actions/apiClientActions/menu";
import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  MenuFormDetails,
  PageRefresh,
  TranslationForm,
} from "@/components";
import { useErrorToast, useSuccessToast } from "@/lib/hooks";
import { HeaderMenuSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const MenuForm = ({
  userId,
  languages = [],
  menuDetails = {},
  translationDetails = {},
  menuTree,
}) => {
  const [activeTab, setActiveTab] = useState("en");
  const { isPending, pageRefresh } = usePageRefresh();
  // Custom Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );
  const isMenuDetailsExist = Object.keys(menuDetails).length > 0;
  const activeLanguages = languages.filter((lang) => lang.status);

  // React Hook Form Instance
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(HeaderMenuSchema),
    defaultValues: {
      name: getTranslationDetails(translationDetails, "en")?.name || "",
      link: menuDetails?.link || "",
      parentMenu: menuDetails?.parentMenu?._id || "none",
      orderNumber: menuDetails?.orderNumber || "1",
    },
  });

  // Relevant fields for comparison with menuDetails (For Update Menu)
  const relevantFields = {
    name: getTranslationDetails(translationDetails, "en")?.name || "",
    link: menuDetails?.link || "",
    parentMenu: menuDetails?.parentMenu?._id || "none",
    orderNumber: menuDetails?.orderNumber || "1",
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

  // Handle Submit Function
  const onSubmit = async (data) => {
    if (!isMenuDetailsExist) {
      const createMenuResponse = await createNewMenu(data, userId);

      if (createMenuResponse.success) {
        useSuccessToast(createMenuResponse.message);
        reset();
      } else {
        if (createMenuResponse.errors) {
          handleValidationErrors(createMenuResponse.errors);
        } else {
          useErrorToast(createMenuResponse.message);
        }
      }
    } else {
      const updateMenuResponse = await updatePerticularMenu(
        userId,
        menuDetails._id,
        data
      );

      if (updateMenuResponse.success) {
        useSuccessToast(updateMenuResponse.message);
        pageRefresh();
      } else {
        if (updateMenuResponse.errors) {
          handleValidationErrors(updateMenuResponse.errors);
        } else {
          useErrorToast(updateMenuResponse.message);
        }
      }
    }
  };

  // Handle Translation Form Submit
  const handleTranslationSubmit = async (translateData) => {
    const data = {
      ...watch(),
      translateData: { ...translateData, lang: activeTab },
    };

    await onSubmit(data);
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {isMenuDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <MenuFormDetails
          isMenuDetailsExist={isMenuDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          menuTree={menuTree}
          colorGrade={{
            bgColor,
            hoverBgColor,
            textColor,
            hexCode,
          }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "name",
              lableName: "Menu Name",
              value:
                getTranslationDetails(translationDetails, activeTab)?.name ||
                "",
              placeholderText: "Menu Name",
              fieldId: `translate-${activeTab}-update-menu-name`,
            },
          ]}
          isSubmitting={isSubmitting}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
          handleTranslationSubmit={handleTranslationSubmit}
        />
      )}
    </div>
  );
};

export default MenuForm;
