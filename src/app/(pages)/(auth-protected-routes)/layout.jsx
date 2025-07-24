import { getSessionUserData } from "@/actions/authActions";
import { globalStyleObj } from "@/app/assets/styles";
import { HandleSessionEnd } from "@/components";
import AuthProtectedLayoutProvider from "@/components/navigation/AuthProtectedLayoutProvider";
import DarkModeProvider from "@/context/DarkModeProvider";
import { verifySession } from "@/utils/verifySession";

const CommonLayoutForAdminAndUser = async ({ children }) => {
  const session = await verifySession();
  const { success, userDetails, permissionsList, logout } = session
    ? await getSessionUserData(session.userId)
    : { success: false, userDetails: {}, permissionsList: [], logout: true };

  if (logout) {
    return <HandleSessionEnd />;
  }

  return (
    <div
      id="full-screen-toggle-container"
      className={`${globalStyleObj.backgroundLight800Dark600} flex w-full justify-center`}
    >
      <DarkModeProvider>
        <AuthProtectedLayoutProvider
          userDetails={success ? userDetails : {}}
          permissionsList={success ? permissionsList : []}
        >
          {children}
        </AuthProtectedLayoutProvider>
      </DarkModeProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
