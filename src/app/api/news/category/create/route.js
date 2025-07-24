import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useGenerateSlug } from "@/lib/hooks";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsCategoryTranslationModel from "@/model/news/NewsCategoryTranslation";
import { NewsCategorySchema } from "@/schemas/pagesSchema/newsSystem/newsCategorySchema";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      name,
      slug,
      description,
      parentCategoryId,
      metaTitle,
      metaImage,
      metaDescription,
    } = body;

    // Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.NEWS_CATEGORY.ADD_NEWS_CATEGORY],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(NewsCategorySchema, {
      name,
      slug,
      description,
      parentCategoryId,
      metaTitle,
      metaImage,
      metaDescription,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Set new category object
    const newCategory = {
      userId: authCheck.user._id.toString(),
      name,
      slug: slug || useGenerateSlug(name),
      description,
      parentCategoryId: parentCategoryId
        ? parentCategoryId === "none"
          ? null
          : parentCategoryId
        : null,
      metaTitle,
      metaImage: metaImage || null,
      metaDescription,
    };

    // Create new category
    const newCategoryItem = new AllNewsCategoryModel(newCategory);
    const savedCategory = await newCategoryItem.save();

    // Store name and description in language translations as initial lang = "en"
    const createEnTranslation =
      await NewsCategoryTranslationModel.findOneAndUpdate(
        {
          referenceId: savedCategory._id.toString(),
          lang: "en",
        },
        {
          $set: {
            name,
            description,
          },
        },
        { new: true, upsert: true }
      );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving news category data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `The ${savedCategory?.name || "Anonymous"} category is successfully created.`,
      status: 201,
    });
  } catch (error) {
    console.log(`Error in creating new news category SERVER: `, error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
