import { deleteContactQuery } from "@/actions/apiClientActions/contacts";
import { fetchAllContactQueriesPageData } from "@/actions/pageDataActions";
import { contactQueryTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllContactQueryList,
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allContactQueries.title,
};

const ContactQiueryListing = async ({ searchParams }) => {
  const {
    allContactQueriesResponse,
    userId,
    adminRole,
    permissionsList,
    search,
    error,
  } = await fetchAllContactQueriesPageData(
    searchParams,
    PERMISSIONS.CONTACTS.VIEW_ALL_CONTACT_QUERIES
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when posts retrieval fails
  if (!allContactQueriesResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Queries" mainParentTab="Contact Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={allContactQueriesResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Queries" mainParentTab="Contact Hub" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        {/* Search Input Field */}
        <div className="w-full sm:max-w-[300px] p-3">
          <SearchInputField />
        </div>

        {(allContactQueriesResponse?.fetchData || []).length > 0 ? (
          <AllContactQueryList
            userId={userId}
            data={allContactQueriesResponse?.fetchData || []}
            paginationDetails={allContactQueriesResponse?.paginationData || {}}
            tableColumns={contactQueryTableColumns}
            permissionItems={{
              deleteItem: PERMISSIONS.CONTACTS.DELETE_CONTACT_QUERY,
            }}
            targetType="query"
            actionFunctions={{
              deleteItemFnc: deleteContactQuery,
            }}
            adminRole={adminRole}
            permissionsList={permissionsList}
          />
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Messages"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactQiueryListing;
