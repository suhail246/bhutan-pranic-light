import { fetchPublicHeaderData } from "@/actions/frontEndPageDataActions";
import {
  useFormattedMenuTree,
  useSortedMenuListByOrderNumber,
} from "@/lib/hooks";
import { HeaderItems } from "..";
import Navbar from "./bhutan-pranic-navbar/Navbar";

const PublicPageNavbar = async () => {
  // const { menuList } = await fetchPublicHeaderData();

  // Convert menu list to menu tree
  // const menuTree = menuList.length > 0 ? useFormattedMenuTree(menuList) : [];
  // const sortedMenu =
  //   menuTree.length > 0 ? useSortedMenuListByOrderNumber(menuTree) : [];

  return (
    <Navbar
    // menuTree={sortedMenu}
    // languageList={languageList}
    // currentLanguage={currentLanguage}
    // settingsData={settingsData}
    // filesList={filesList}
    />
  );
};

export default PublicPageNavbar;
