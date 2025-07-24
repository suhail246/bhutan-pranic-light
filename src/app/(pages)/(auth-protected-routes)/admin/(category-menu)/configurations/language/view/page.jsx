import { fetchAllLanguagessPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  RenderAllLanguages,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all categories page
export const metadata = {
  title: titlesObject.allLanguages.title,
};

const ViewLanguagesPage = async () => {
  // Fetch necessary data for all blog posts
  const {
    success,
    fetchData,
    message,
    userId,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllLanguagessPageData(PERMISSIONS.LANGUAGE.VIEW_ALL_LANGUAGES);

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when languages retrieval fails
  if (!success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="All Languages"
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
        currentTab="All Languages"
        mainParentTab="Setup & Configurations"
        firstChildTab="Lanugages"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm p-3 shadow-light sm:pb-5`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-[16px] font-poppins-md text-dark-weight-400 dark:text-light-weight-800">
            Languages
          </h1>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.LANGUAGE.ADD_LANGUAGE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_LANGUAGE}
              text="Add Language"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {fetchData.length > 0 ? (
          <RenderAllLanguages
            userId={userId}
            languagesList={fetchData || []}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Language"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first language to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Language
                </span>{" "}
                button.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewLanguagesPage;
