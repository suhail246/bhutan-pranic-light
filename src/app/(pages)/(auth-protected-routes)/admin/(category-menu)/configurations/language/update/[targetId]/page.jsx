import { getPerticularLanguage } from "@/actions/apiClientActions/languages";
import { fetchUpdateLanguagePageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  LanguageForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { targetId } = await params;
  const { userId } = await verifySession();

  // If user is not authenticated or targetId is not valid, return default metadata
  if (
    !userId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Language ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Language details not found.",
    };
  }

  // Fetch the Language details using the targetId and userId
  const { languageData, message } = await getPerticularLanguage(
    userId,
    targetId
  );

  return {
    title: message
      ? `Update Language ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${languageData.name} | ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Language details not found."
      : `${languageData.name} language update form details page.`,
  };
};

const UpdateLanguagePage = async ({ params }) => {
  const { success, languageData, message, userId, error } =
    await fetchUpdateLanguagePageData(
      params,
      PERMISSIONS.LANGUAGE.EDIT_LANGUAGE
    );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Language"
          mainParentTab="Setup & Configurations"
          firstChildTab="Lanugages"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Language does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  // Handle case when language retrieval fails
  if (!success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Language"
          mainParentTab="Setup & Configurations"
          firstChildTab="Lanugages"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Update Language"
        mainParentTab="Setup & Configurations"
        firstChildTab="Lanugages"
      />

      <LanguageForm userId={userId} languageDetails={languageData} />
    </div>
  );
};

export default UpdateLanguagePage;
