import AllBlogsCategoryModel from "@/model/blog/BlogsCategory";
import mongoose from "mongoose";

export const updateChildCategories = async (categoryId, active) => {
  // Child featured changes only happen if parent want to be inactive (means when active = true)
  if (!active) return;

  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    parentCategoryId: categoryId,
    activeStatus: true,
  }).exec();

  // Update each child category's activeStatus
  for (let category of childCategories) {
    await AllBlogsCategoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: {
          activeStatus: false,
          isFeatured: false,
        },
      },
      { new: true }
    ).exec();

    // Recursively update children of this category (if any)
    await updateChildCategories(category._id, active);
  }
};

export const updateParentCategories = async (parentId, active) => {
  // Only update if activeStatus is false and parentId is not null
  if (active || !parentId) return;

  // Find the unfeatured parent category
  const parentCategoryDetails = await AllBlogsCategoryModel.findOne({
    _id: parentId,
    activeStatus: false,
  }).exec();

  if (!parentCategoryDetails) return;

  // Update the parent category
  await AllBlogsCategoryModel.findByIdAndUpdate(
    parentId,
    { $set: { activeStatus: true } },
    { new: true }
  ).exec();

  // Recursively update parent categories of this category (if any)
  await updateParentCategories(parentCategoryDetails.parentCategoryId, active);
};

export const checkDefaultChildCategoryPresence = async (categoryId) => {
  // Find all child categories of the category
  const childCategories = await AllBlogsCategoryModel.find({
    parentCategoryId: categoryId,
  }).exec();

  // Check if any child is a default category
  for (let category of childCategories) {
    if (category.isDefault) {
      return true; // Found a default category
    }

    // Recursively check the child's children
    const hasDefaultInChildren = await checkDefaultChildCategoryPresence(
      category._id
    );
    if (hasDefaultInChildren) {
      return true; // Found a default category in children
    }
  }

  // No default category found in this branch
  return false;
};

export const preventCircularReference = async (
  categoryId,
  parentCategoryId
) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) return;

  const newParentCategory =
    await AllBlogsCategoryModel.findById(parentCategoryId).exec();
  if (newParentCategory?.parentCategoryId?.toString() === categoryId) {
    await AllBlogsCategoryModel.findByIdAndUpdate(
      parentCategoryId,
      { $set: { parentCategoryId: null } },
      { new: true }
    ).exec();
  }
};

// Function to check if the given target node exists in the descendants of the current node
export const isDescendant = async (nodeId, targetId) => {
  // Get the direct children of the current node
  const children = await AllBlogsCategoryModel.find({
    parentCategoryId: nodeId,
  });

  for (const child of children) {
    if (child._id.toString() === targetId) return true; // Target is found in the descendants

    // Recursively check in the children of the current child
    const foundInDescendants = await isDescendant(child._id, targetId);
    if (foundInDescendants) return true; // Target found in sub-tree
  }

  return false; // Target not found in the descendants
};
