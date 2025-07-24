import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import AllNewsCategoryModel from "@/model/news/NewsCategory";
import NewsCategoryTranslationModel from "@/model/news/NewsCategoryTranslation";
import { NewsCategorySchema } from "@/schemas/pagesSchema/newsSystem/newsCategorySchema";
import { isDescendant } from "@/utils/categoryTreeUtils";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      categoryId,
      name,
      slug,
      description,
      parentCategoryId,
      metaTitle,
      metaImage,
      metaDescription,
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
    if (
      !userId ||
      !categoryId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    if (!isTranslationData) {
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

      // Get the category details
      const existsCategory =
        await AllNewsCategoryModel.findById(categoryId).exec();
      if (!existsCategory) {
        return errorResponse({
          message: "Category not found or you are not authorized to update it.",
          status: 404,
        });
      }

      // Handle duplicate category name or slug. Only check for duplicates if name or slug are changed
      let newName;
      let newSlug;
      if (name !== existsCategory.name || slug !== existsCategory.slug) {
        const existingCategory = await AllNewsCategoryModel.find({
          $or: [{ slug }, { name }],
          _id: { $ne: categoryId },
        }).exec();

        if (
          existingCategory &&
          existingCategory.some((item) => item.name === name)
        ) {
          newName = `${name} ${useTitleNanoid()}`;
        }

        if (
          existingCategory &&
          existingCategory.some((item) => item.slug === slug)
        ) {
          newSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Validate parentCategoryId
      if (parentCategoryId && parentCategoryId !== "none") {
        // Check if parentCategoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(parentCategoryId)) {
          return errorResponse({
            message: "Invalid parent category Id.",
            status: 400,
          });
        }

        // Prevent self-referencing
        if (parentCategoryId === categoryId) {
          return errorResponse({
            message: "A category cannot be its own parent.",
            status: 400,
          });
        }

        // Check if parentCategoryId exists
        const parentCategory =
          await AllNewsCategoryModel.findById(parentCategoryId).exec();
        if (!parentCategory) {
          return errorResponse({
            message: "Parent category does not exist.",
            status: 404,
          });
        }

        const isCircularReference = await isDescendant(
          categoryId,
          parentCategoryId
        );
        if (isCircularReference) {
          return errorResponse({
            message:
              "Invalid parent category. A category cannot be a child of itself or its descendants.",
            status: 400,
          });
        }
      }

      // Set category updated values object
      const updatedCategoryObj = {
        name: newName || name,
        slug: newSlug || slug,
        description,
        parentCategoryId: parentCategoryId === "none" ? null : parentCategoryId,
        metaTitle: metaTitle || "",
        metaImage: metaImage || null,
        metaDescription: metaDescription,
      };

      // Update the category
      const updatedCategory = await AllNewsCategoryModel.findOneAndUpdate(
        { _id: categoryId },
        { $set: updatedCategoryObj },
        { new: true }
      ).exec();
      if (!updatedCategory) {
        return errorResponse({
          message: "Unable to update the category. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation =
        await NewsCategoryTranslationModel.findOneAndUpdate(
          {
            referenceId: updatedCategory._id.toString(),
            lang: "en",
          },
          {
            $set: {
              name: updatedCategory?.name || "",
              description: updatedCategory?.description || "",
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
      if (!updateEnTranslation) {
        return errorResponse({
          message:
            "An unexpected error occurred while updating the english translation.",
          status: 400,
        });
      }

      return successResponse({
        message: `News Category has been updated successfully. Refreshing the page...`,
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslation =
      await NewsCategoryTranslationModel.findOneAndUpdate(
        {
          referenceId: categoryId.toString(),
          lang: translateData.lang,
        },
        {
          $set: {
            name: translateData?.name || "",
            description: translateData?.description || "",
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    if (!updateOtherTranslation) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `News Category has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the news category SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
