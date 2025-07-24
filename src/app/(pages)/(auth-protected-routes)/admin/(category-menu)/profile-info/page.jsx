import { getAllFilesFromDB } from "@/actions/apiClientActions/files";
import { getSessionUserData } from "@/actions/authActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { AdminUserInfoForm, Breadcrumb, HandleSessionEnd } from "@/components";
import { verifySession } from "@/utils/verifySession";

export const metadata = {
  title: titlesObject.profile.title,
};

const UserProfile = async ({ searchParams }) => {
  // Get the current session user ID
  const { userId } = await verifySession();
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const [userResponse, filesResponse] = await Promise.all([
    getSessionUserData(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
  ]);

  // Handle logout scenarios
  if (userResponse.logout) {
    return <HandleSessionEnd />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Profile" />

      <AdminUserInfoForm
        userDetails={userResponse?.userDetails || {}}
        permissionsList={userResponse?.permissionsList || []}
        filesList={filesResponse?.filesList || []}
        allFiles={filesResponse?.allFilesData || []}
        paginationDetails={filesResponse?.paginationData || {}}
        searchValue={searchName}
        selectedFileType={selectedFileType}
      />
    </div>
  );
};

export default UserProfile;
