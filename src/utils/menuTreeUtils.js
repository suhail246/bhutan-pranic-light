import HeaderMenuModel from "@/model/HeaderMenu";

// Update Child Menus
export const updateChildMenus = async (menuId, active) => {
  // Child featured changes only happen if parent want to be inactive (means when active = true)
  if (!active) return;

  // Find all child menus of the menu
  const childMenus = await HeaderMenuModel.find({
    parentMenu: menuId,
    activeStatus: true,
  }).exec();

  // Update each child menu's activeStatus
  for (let menu of childMenus) {
    await HeaderMenuModel.findByIdAndUpdate(
      menu._id,
      {
        $set: {
          activeStatus: false,
          productMenuStatus: false,
        },
      },
      { new: true }
    ).exec();

    // Recursively update children of this menu (if any)
    await updateChildMenus(menu._id, active);
  }
};

// Update Parent Menus
export const updateParentMenus = async (parentId, active) => {
  // Only update if activeStatus is false and parentId is not null
  if (active || !parentId) return;

  // Find the unfeatured parent menu
  const parentMenuDetails = await HeaderMenuModel.findOne({
    _id: parentId,
    activeStatus: false,
  }).exec();

  if (!parentMenuDetails) return;

  // Update the parent menu
  await HeaderMenuModel.findByIdAndUpdate(
    parentId,
    { $set: { activeStatus: true } },
    { new: true }
  ).exec();

  // Recursively update parent menus of this menu (if any)
  await updateParentMenus(parentMenuDetails.parentMenu, active);
};

// Check Circular Descendant
export const isParentMenuDescendant = async (nodeId, targetId) => {
  // Get the direct children of the current node
  const children = await HeaderMenuModel.find({
    parentMenu: nodeId,
  });

  for (const child of children) {
    if (child._id.toString() === targetId) return true; // Target found in the descendants

    // Recursively check in the children of the current child
    const foundInDescendants = await isParentMenuDescendant(
      child._id,
      targetId
    );
    if (foundInDescendants) return true; // Target found in sub-tree
  }

  return false; // Target not found in the descendants
};
