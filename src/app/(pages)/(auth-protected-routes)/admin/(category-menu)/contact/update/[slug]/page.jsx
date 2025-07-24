import {
  getContactDetails,
  updateContact,
} from "@/actions/apiClientActions/contacts";
import { fetchUpdateContactPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  ContactForm,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useExtractSlugAndTargetId } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data for update page
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { slugData, targetId } = useExtractSlugAndTargetId(slug);

  const { userId } = await verifySession();

  // If user is not authenticated or postId is not valid, return default metadata
  if (
    !userId ||
    !slugData ||
    !targetId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Contact ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Contact details not found.",
    };
  }

  // Fetch the contact details using the targetId and userId
  const { contactDetails, message } = await getContactDetails(
    userId,
    slugData,
    targetId
  );

  return {
    title: message
      ? `Update Contact ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : contactDetails?.metaTitle ||
        `${contactDetails?.banchName?.en || "Contact Details"} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Contact details not found."
      : contactDetails?.metaDescription ||
        `${contactDetails?.banchName?.en || "Contact Details"} form page.`,
  };
};

const UpdateContactPage = async ({ params, searchParams }) => {
  const {
    filesResponse,
    languagesResponse,
    contactResponse,
    userId,
    searchName,
    selectedFileType,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateContactPageData(
    params,
    searchParams,
    PERMISSIONS.CONTACTS.EDIT_CONTACT
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd /> // Handle unauthorized session
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Contact" mainParentTab="Contact Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Contact does not exists."
        />
      </div>
    ) : (
      <Error403 /> // Handle forbidden access
    );
  }

  // Handle case when contact retrieval fails
  if (!contactResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Contact" mainParentTab="Contact Hub" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={contactResponse.message}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Contact" mainParentTab="Contact Hub" />

      {/* Contact Form */}
      <ContactForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        contactDetails={contactResponse?.contactDetails || {}}
        translationDetails={contactResponse?.translationDetails || {}}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        updateFnc={updateContact}
        selectedMetaFileId={
          contactResponse.contactDetails.metaImage !== null
            ? contactResponse.contactDetails?.metaImage?._id
            : ""
        }
        selectedMetaFileName={
          contactResponse.contactDetails.metaImage !== null
            ? contactResponse.contactDetails?.metaImage?.fileName
            : ""
        }
        searchValue={searchName}
        selectedFileType={selectedFileType}
        adminRole={adminRole}
        permissionsList={permissionsList || []}
      />
    </div>
  );
};

export default UpdateContactPage;
