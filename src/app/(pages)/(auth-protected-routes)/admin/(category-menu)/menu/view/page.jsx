import { fetchAllMenusPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  CommonErrorTemplate,
  CreateNewButton,
  Error403,
  HandleSessionEnd,
  RenderAllMenus,
  SearchInputField,
  WordFocus,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useFormattedMenuTree, useUIPermissionCheck } from "@/lib/hooks";

// Handle meta data for all categories page
export const metadata = {
  title: titlesObject.allMenus.title,
};

const MenuListingPage = async ({ searchParams }) => {
  // Fetch necessary data for all menus page
  const { menusResponse, userId, adminRole, permissionsList, error } =
    await fetchAllMenusPageData(
      searchParams,
      PERMISSIONS.MENU_MANAGEMENT.VIEW_ALL_MENUS
    );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Handle case when categories retrieval fails
  if (!menusResponse.success) {
    return (
      <div className={`min-h-full mt-[40px]`}>
        <Breadcrumb currentTab="All Menus" mainParentTab="Menu Management" />

        <CommonErrorTemplate
          errorTitle="Not Found"
          errorDescription={menusResponse.message}
        />
      </div>
    );
  }

  // Create menu TREE structure
  const menuTree =
    menusResponse.fetchData.length > 0
      ? useFormattedMenuTree(menusResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="All Menus" mainParentTab="Menu Management" />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className={`${globalStyleObj.flexBetween} gap-5 p-3`}>
          <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
            All Menus
          </h4>

          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.MENU_MANAGEMENT.ADD_MENU
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_ADD_NEW_MENU}
              text="Add Menu"
              extraClass="max-w-[180px]"
            />
          )}
        </div>

        <div className="mx-3">
          <div className="max-w-[200px]">
            <SearchInputField />
          </div>

          {menuTree.length > 0 ? (
            <RenderAllMenus
              userId={userId}
              menuTree={menuTree}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <WordFocus
                sentence="No Menu"
                manualMode={false}
                blurAmount={5}
                borderColor="red"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />

              <p className="text-center text-[13px] md:text-[16px] text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first menu to get started. Please click the{" "}
                <span className="text-dark-weight-550 dark:text-light-weight-800 font-poppins-sb">
                  Add Menu
                </span>{" "}
                button.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuListingPage;
