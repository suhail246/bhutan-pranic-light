import {
  deleteContact,
  toggleContactActiveFormStatus,
  toggleContactActiveStatus,
  toggleContactFeaturedStatus,
} from "@/actions/apiClientActions/contacts";
import { fetchAllContactsPageData } from "@/actions/pageDataActions";
import { contactsTableColumns } from "@/app/assets/data/tableData";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllContactList,
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  PostFilterDropdown,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.allContacts.title,
};

const ViewAllContactsPage = async ({ searchParams }) => {
  const {
    allContactsResponse,
    userId,
    search,
    adminRole,
    permissionsList,
    error,
  } = await fetchAllContactsPageData(
    searchParams,
    PERMISSIONS.CONTACTS.VIEW_ALL_CONTACTS
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when posts retrieval fails
  if (!allContactsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Contact Lists" mainParentTab="Contact Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={allContactsResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Contact Lists" mainParentTab="Contact Hub" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex gap-2">
            {/* Search Input Field */}
            <SearchInputField />

            {/* Post Filter Dropdown */}
            <PostFilterDropdown />
          </div>

          {/* Create New Button */}
          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.CONTACTS.ADD_CONTACT
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_CONTACT}
              text="Add Contact"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        {(allContactsResponse?.fetchData || []).length > 0 ? (
          <>
            {/* All Contacts List */}
            <AllContactList
              userId={userId}
              data={allContactsResponse?.fetchData || []}
              paginationDetails={allContactsResponse?.paginationData || {}}
              tableColumns={contactsTableColumns}
              permissionItems={{
                editItem: PERMISSIONS.CONTACTS.EDIT_CONTACT,
                deleteItem: PERMISSIONS.CONTACTS.DELETE_CONTACT,
                toggleActiveItem: PERMISSIONS.CONTACTS.TOGGLE_ACTIVE_CONTACT,
                toggleActiveContactForm:
                  PERMISSIONS.CONTACTS.TOGGLE_ACTIVE_CONTACT_FORM,
                toggleFeaturedItem:
                  PERMISSIONS.CONTACTS.TOGGLE_FEATURED_CONTACT,
              }}
              editRoute="/admin/contact/update"
              targetType="contact"
              actionFunctions={{
                deleteItemFnc: deleteContact,
                toggleActiveItemFnc: toggleContactActiveStatus,
                toggleActiveContactFormFnc: toggleContactActiveFormStatus,
                toggleFeaturedItemFnc: toggleContactFeaturedStatus,
              }}
              search={search}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          </>
        ) : (
          <>
            {/* No Posts Message */}
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Contact"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first contact to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Contact
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

export default ViewAllContactsPage;
