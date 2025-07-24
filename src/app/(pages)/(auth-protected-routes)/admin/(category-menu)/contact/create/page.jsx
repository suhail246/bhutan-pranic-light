import { createNewContact } from "@/actions/apiClientActions/contacts";
import { fetchAddNewContactPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import {
  Breadcrumb,
  ContactForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

// Handle meta data for all posts page
export const metadata = {
  title: titlesObject.createContact.title,
};

const AddNewContactPage = async ({ searchParams }) => {
  const {
    filesResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchAddNewContactPageData(
    searchParams,
    PERMISSIONS.CONTACTS.ADD_CONTACT
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="New Contact" mainParentTab="Contact Hub" />

      {/* Contact Form */}
      <ContactForm
        userId={userId}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        createFnc={createNewContact}
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default AddNewContactPage;
