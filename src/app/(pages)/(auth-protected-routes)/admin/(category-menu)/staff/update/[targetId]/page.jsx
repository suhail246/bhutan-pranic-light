import { getUserDetails } from "@/actions/apiClientActions/user";
import { fetchAdminStaffDetailsPageData } from "@/actions/pageDataActions";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AdminStaff,
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

export const generateMetadata = async ({ params }) => {
  const { targetId } = await params;
  const { userId } = await verifySession();

  if (
    !userId ||
    targetId === "undefiend" ||
    !mongoose.Types.ObjectId.isValid(targetId)
  ) {
    return {
      title: `Update Staff ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description:
        "Unable to retrieve staff details. The requested user may not exist or you may not have the necessary permissions.",
    };
  }

  const { userData, message } = await getUserDetails(userId, targetId);

  return {
    title: message
      ? `Update Staff ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${userData.username} Staff ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Staff details could not be retrieved. The staff may have been removed or you may not have access."
      : `Manage and update details for ${userData.username}.`,
  };
};

const UserDetailsPage = async ({ params }) => {
  const { userDetailsResponse, rolesResponse, userId, targetId, error } =
    await fetchAdminStaffDetailsPageData(params, PERMISSIONS.STAFF.EDIT_STAFF);

  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb
          currentTab="Update Staff"
          mainParentTab="Staff Management"
        />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Staff does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Staff" mainParentTab="Staff Management" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm shadow-light pb-5`}
      >
        <h1 className="py-3 px-5 text-dark-weight-550 dark:text-light-weight-550 font-poppins-md text-[15px] border-b dark:border-[#fff]/10 mb-5">
          {`${userDetailsResponse?.userData?.username} Information` ||
            "User Information"}
        </h1>
        <div className="px-5">
          <AdminStaff
            sessionId={userId}
            targetId={targetId}
            roleLists={rolesResponse.fetchData}
            userDetails={userDetailsResponse.userData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
