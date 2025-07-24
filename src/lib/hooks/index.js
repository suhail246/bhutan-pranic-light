import { format } from "date-fns";
import { customAlphabet } from "nanoid";
import { toast } from "react-toastify";

// Define custom nanoid generators
const nanoidSlug = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4); // 4 characters
const nanoidTitle = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 4); // 4 characters

// Formate Pathname
export const useFormattedPathname = (path) => {
  const pathSegments = path
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin"); // Example -> /admin/dashboard/analytics -> [dashboard, analytics]

  // // Find the index of "update" in the path segments
  // const updateIndex = pathSegments.indexOf("update");

  // // Check if "update" exists and if there is a segment after it
  // if (updateIndex !== -1 && updateIndex < pathSegments.length - 1) {
  //   pathSegments.pop(); // Remove the last segment
  // }

  return pathSegments.join("-");
};

// Make Category Tree Structure
export const useFormattedCategoryTree = (categories) => {
  // 1: Create a map to hold each category by its _id and initialize an empty children array for each category
  const map = {};
  categories.forEach((category) => {
    // Store each category in the map using its _id as the key and initialize an empty children array
    map[category._id] = { ...category, children: [] };
  });

  // 2: Initialize an empty array to store the final tree structure
  const tree = [];

  // 3: Iterate through the categories again to build the tree
  categories.forEach((category) => {
    if (category.parentCategoryId) {
      // If the category has a parent, find the parent in the map and add this category to the parent's children array
      map[category.parentCategoryId].children.push(map[category._id]);
    } else {
      // If the category has no parent (i.e., it's a top-level category), add it directly to the tree array

      tree.push(map[category._id]);
    }
  });

  // 4: Return the final tree structure
  return tree;
};

// Make Menu Tree Structure
export const useFormattedMenuTree = (menus) => {
  // 1: Create a map to hold each menu by its _id and initialize an empty children array for each category
  const map = {};
  menus.forEach((menu) => {
    // Store each menu in the map using its _id as the key and initialize an empty children array
    map[menu._id] = { ...menu, children: [] };
  });

  // 2: Initialize an empty array to store the final tree structure
  const tree = [];

  // 3: Iterate through the menus again to build the tree
  menus.forEach((menuItem) => {
    if (menuItem.parentMenu) {
      // If the menu has a parent, find the parent in the map and add this menu to the parent's menu array
      map[menuItem.parentMenu].children.push(map[menuItem._id]);
    } else {
      // If the menu has no parent (i.e., it's a top-level menu), add it directly to the tree array

      tree.push(map[menuItem._id]);
    }
  });

  // 4: Return the final tree structure
  return tree;
};

// Make Menu Sorted by Order Number with Active Status
export const useSortedMenuListByOrderNumber = (menuList) => {
  return menuList
    .filter((menu) => menu.activeStatus)
    .sort((a, b) => Number(b.orderNumber || 1) - Number(a.orderNumber || 1));
};

// Generate Slug
export const useGenerateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "r") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
    .trim();
};

// Generate Title
export const useGenerateTitle = (text) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Nanoid Slug Generator
export const useSlugNanoid = () => {
  return nanoidSlug();
};

// Nanoid Title Generator
export const useTitleNanoid = () => {
  return nanoidTitle();
};

// Formate File Size
export const useFormateFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, index)).toFixed(2); // Keep 2 decimal places

  return `${value} ${sizes[index]}`;
};

// Formate Date
export const useFormatISODate = (
  isoDateString,
  locale = "en-GB",
  options = { day: "numeric", month: "short", year: "numeric" }
) => {
  if (!isoDateString) {
    return "Invalid Date";
  }

  try {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.log(`Error in useFormatISODate ISO Date Formate: ${error}`);
    return "Invalid Date";
  }
};

// Success Toast Message
export const useSuccessToast = (message) => {
  toast.success(message || "Success.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Error Toast Message
export const useErrorToast = (message) => {
  toast.error(message || "Something went wrong. Please try again later.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// GROUP UI Permission Check
export const useGroupUIPermissionCheck = (
  adminRole,
  permissionsList,
  requireList
) => {
  if (adminRole === "Super Admin" || !requireList) return true;

  return requireList.some((item) => permissionsList.includes(item));
};

// PERTICULAR UI Permission Check
export const useUIPermissionCheck = (
  adminRole,
  permissionsList,
  requiredPermission
) => {
  if (adminRole === "Super Admin") return true;

  return adminRole && permissionsList.includes(requiredPermission);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND DEFAULT STATUS (False)
export const useFilterActiveNonDefaultItems = (
  items = [],
  activeKeyName = "isActive",
  defaultKeyName = "isDefault"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && !item[defaultKeyName]);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND RETURN THE LATEST N ITEMS (IF SPECIFIED)
export const useFilterActiveItems = (
  items = [],
  activeKeyName = "isActive",
  limit = null
) => {
  if (!items || items.length === 0) return [];

  const filteredItems = items.filter((item) => item[activeKeyName]);

  return limit && limit > 0
    ? [...filteredItems].slice(0, limit)
    : [...filteredItems];
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND FEATURED STATUS (False)
export const useFilterActiveNonFeaturedItems = (
  items = [],
  activeKeyName = "isActive",
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && !item[featuredKeyName]);
};

// FILTER ITEMs BY ACTIVE STATUS (True) AND FEATURED STATUS (True)
export const useFilterActiveFeaturedItems = (
  items = [],
  activeKeyName = "isActive",
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[activeKeyName] && item[featuredKeyName]);
};

// FILTER ITEMs BY FEATURED STATUS (True)
export const useFilterFeaturedItems = (
  items = [],
  featuredKeyName = "isFeatured"
) => {
  if (!items || items.length === 0) return [];

  return items.filter((item) => item[featuredKeyName]);
};

// Transform Date into -> Mar 11, 2025
export const useTransformDate = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = format(date, "MMM dd, yyyy"); // Example: May 05, 2024

  return `${formattedDate}`;
};

// Transform Date into -> 21.12.2024
export const useTransformCustomDate = (timeStamp) => {
  const date = new Date(timeStamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear(); // Keep the actual year

  return `${day}.${month}.${year}`;
};

// Extract slug and targtId
export const useExtractSlugAndTargetId = (slug) => {
  const itemsLength = slug.split("-").length;

  if (itemsLength === 0) {
    return { slugData: "", targetId: "" };
  }

  const targetId = slug.split("-")[itemsLength - 1];
  const slugData = slug
    .split("-")
    .slice(0, itemsLength - 1)
    .join("-");

  return { slugData, targetId };
};
