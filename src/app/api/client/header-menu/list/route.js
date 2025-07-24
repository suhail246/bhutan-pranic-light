import dbConnect from "@/lib/db/dbConnect";
import HeaderMenuModel from "@/model/HeaderMenu";
import MenuTranslationModel from "@/model/HeaderMenuTranslation";
import LanguagesModel from "@/model/Language";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { link: { $regex: searchQuery, $options: "i" } },
      ],
    };

    // Initial Menu List Without name key
    const menuList = await HeaderMenuModel.find(query)
      .select("-__v -createdAt -updatedAt")
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const menuIds = menuList.map((menu) => menu._id);
    const translations = await MenuTranslationModel.find({
      referenceId: { $in: menuIds },
    }).exec();

    // Map translations by menu ID
    const translationMap = {};
    translations.forEach(({ referenceId, lang, name }) => {
      if (!translationMap[referenceId]) {
        translationMap[referenceId] = {};
      }
      translationMap[referenceId][lang] = name;
    });

    // Process menus and attach translations
    const formattedMenuList = menuList.map((menu) => {
      const menuData = menu.toObject();
      menuData.name = translationMap[menu._id] || {};
      return menuData;
    });

    return successResponse({
      status: 200,
      menus: formattedMenuList,
    });
  } catch (error) {
    console.log(`❌ Error in getting all menus FE SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
