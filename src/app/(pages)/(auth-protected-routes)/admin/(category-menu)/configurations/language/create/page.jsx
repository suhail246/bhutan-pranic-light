import { checkUserPermission } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  Error403,
  HandleSessionEnd,
  LanguageForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data info
export const metadata = {
  title: titlesObject.createLanguage.title,
};

// Component for creating a language
const CreateLanguagePage = async () => {
  const { userId, error } = await checkUserPermission(
    PERMISSIONS.LANGUAGE.ADD_LANGUAGE
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        currentTab="Create Language"
        mainParentTab="Setup & Configurations"
        firstChildTab="Lanugages"
      />

      <LanguageForm userId={userId} />
    </div>
  );
};

export default CreateLanguagePage;
