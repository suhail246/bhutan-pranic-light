import { getPerticularMenuDetails } from "@/actions/apiClientActions/menu";
import { fetchUpdateMenuPageData } from "@/actions/pageDataActions";
import {
  Breadcrumb,
  CommonErrorTemplate,
  Error403,
  HandleSessionEnd,
  MenuForm,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFormattedMenuTree } from "@/lib/hooks";
import { verifySession } from "@/utils/verifySession";
import mongoose from "mongoose";

// Handle dynamic meta data info
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
      title: `Update Menu ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: "Menu details not found.",
    };
  }

  // Fetch the menu details
  const { menuData, message } = await getPerticularMenuDetails(
    userId,
    targetId
  );

  return {
    title: message
      ? `Update Menu ${process.env.NEXT_PUBLIC_META_APP_NAME}`
      : `${menuData.name} ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
    description: message
      ? "Menu details not found."
      : `${menuData.name} update details form page.`,
  };
};

const MenuUpdatePage = async ({ params }) => {
  // Fetch necessary data for updating the menu
  const {
    menusResponse,
    languagesResponse,
    menuDetailsResponse,
    userId,
    adminRole,
    permissionsList,
    error,
  } = await fetchUpdateMenuPageData(
    params,
    PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? (
      <HandleSessionEnd />
    ) : error === "Not Found" ? (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Menu" mainParentTab="Menu Management" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription="Menu does not exists."
        />
      </div>
    ) : (
      <Error403 />
    );
  }

  // Handle case when category details retrieval fails
  if (!menuDetailsResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="Update Menu" mainParentTab="Menu Management" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={menuDetailsResponse.message}
        />
      </div>
    );
  }

  // Create menu TREE structure
  const menuTree =
    menusResponse.success && menusResponse.fetchData.length > 0
      ? useFormattedMenuTree(menusResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Update Menu" mainParentTab="Menu Management" />

      <MenuForm
        userId={userId}
        languages={languagesResponse?.fetchData || []}
        menuDetails={menuDetailsResponse?.menuData || {}}
        translationDetails={menuDetailsResponse?.translationDetails || {}}
        menuTree={menuTree}
      />
    </div>
  );
};

export default MenuUpdatePage;
