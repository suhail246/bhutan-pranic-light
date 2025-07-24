import { fetchCreateNewMenuPageData } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, Error403, HandleSessionEnd, MenuForm } from "@/components";
import { PERMISSIONS } from "@/constants/permissions";
import { useFormattedMenuTree } from "@/lib/hooks";

// Handle meta data info
export const metadata = {
  title: titlesObject.createMenu.title,
};

const AddNewMenuPage = async ({ searchParams }) => {
  const { menusResponse, userId, error } = await fetchCreateNewMenuPageData(
    searchParams,
    PERMISSIONS.MENU_MANAGEMENT.ADD_MENU
  );

  // Handle different error cases
  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  // Create menu TREE structure
  const menuTree =
    menusResponse.success && menusResponse.fetchData.length > 0
      ? useFormattedMenuTree(menusResponse.fetchData)
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Create Menu" mainParentTab="Menu Management" />

      <MenuForm userId={userId} menuTree={menuTree} />
    </div>
  );
};

export default AddNewMenuPage;
