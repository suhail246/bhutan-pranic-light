"use client";

import { DeleteButton, SwitchButton } from "@/components";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";
import { MdOutlineFolderOpen } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGroupUIPermissionCheck, useUIPermissionCheck } from "@/lib/hooks";
import { Settings } from "lucide-react";
import React from "react";

const renderAllCategories = (
  userId,
  categoryTree,
  expandedCategories,
  toggleCategory,
  permissionsItems,
  editRoute,
  actionFunctions,
  adminRole,
  permissionsList,
  level = 12
) => {
  return categoryTree.map((category, index) => (
    <React.Fragment key={category._id}>
      <TableRow
        className={`text-[11px] sm:text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-450`}
      >
        {/* Category Name with Toggle Button */}
        <TableCell
          className="cursor-pointer"
          style={{ paddingLeft: `${level}px` }}
          onClick={
            category.children && category.children.length > 0
              ? () => toggleCategory(category._id)
              : null
          }
        >
          {category.children && category.children.length > 0 ? (
            <button className="bg-green-500/20 rounded-full p-1">
              {expandedCategories.includes(category._id) ? (
                <AiOutlineFolderOpen size={12} className="text-green-500" />
              ) : (
                <MdOutlineFolderOpen size={12} className="text-green-500" />
              )}
            </button>
          ) : (
            <button className="bg-[#000]/20 dark:bg-[#fff]/10 rounded-full p-1">
              <FaMinus
                size={8}
                className="text-dark-weight-500 dark:text-light-weight-550"
              />
            </button>
          )}
          {/* Category name for small devices */}
          <span
            className={`${category.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} md:hidden ml-2`}
          >
            {(category.name?.en || "Anonymous").length > 20
              ? category.name?.en?.slice(0, 20) + "..." || "Anonymous"
              : category.name?.en || "Anonymous"}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-1">
                Default
              </span>
            )}
          </span>
          {/* Category name for above small devices */}
          <span
            className={`${category.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} hidden md:inline ml-2`}
          >
            {category.name?.en || "Anonymous"}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-1">
                Default
              </span>
            )}
          </span>
        </TableCell>

        {/* Active Status Button above small devices */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionsItems.toggleActiveCategory
        ) && (
          <TableCell className="hidden md:table-cell">
            <SwitchButton
              args={[userId, category._id, category.activeStatus]}
              status={category.activeStatus}
              apiCallback={actionFunctions.toggleActiveCategoryFnc}
              customBodySize="h-4 w-8"
              customThumbSize="h-3 w-3"
              refreshIconSize={16}
            />
          </TableCell>
        )}

        {/* Featured Button above small devices */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionsItems.toggleFeaturedCategory
        ) && (
          <TableCell className="hidden md:table-cell">
            <SwitchButton
              args={[userId, category._id, category.isFeatured]}
              status={category.isFeatured}
              apiCallback={actionFunctions.toggleFeaturedCategoryFnc}
              customBodySize="h-4 w-8"
              customThumbSize="h-3 w-3"
              refreshIconSize={16}
            />
          </TableCell>
        )}

        {/* Default Status Button above small devices */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          permissionsItems.toggleDefaultCategory
        ) && (
          <TableCell className="hidden md:table-cell">
            <SwitchButton
              args={[userId, category._id, category.isDefault]}
              status={category.isDefault}
              apiCallback={actionFunctions.toggleDefaultCategoryFnc}
              customBodySize="h-4 w-8"
              customThumbSize="h-3 w-3"
              refreshIconSize={16}
            />
          </TableCell>
        )}

        {/* Edit and Delete Buttons above small devices */}
        {useGroupUIPermissionCheck(adminRole, permissionsList, [
          permissionsItems.editCategory,
          permissionsItems.deleteCategory,
        ]) && (
          <TableCell className="flex-1 pr-3 hidden md:table-cell">
            <div className="flex justify-end items-center gap-2">
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                permissionsItems.editCategory
              ) && (
                <Link
                  href={`${editRoute}/${category._id}`}
                  className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                >
                  <RiEditBoxLine size={12} />
                </Link>
              )}

              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                permissionsItems.deleteCategory
              ) && (
                <DeleteButton
                  userId={userId}
                  targetDetails={category}
                  targetType="category"
                  targetName={category?.name?.en || "Anonymous"}
                  apiCallback={actionFunctions.deleteCategoryFnc}
                  isDefault={category.isDefault}
                />
              )}
            </div>
          </TableCell>
        )}

        {/* Status, Featured, Default, Edit, Delete Button for small devices */}
        {useGroupUIPermissionCheck(adminRole, permissionsList, [
          permissionsItems.editCategory,
          permissionsItems.deleteCategory,
          permissionsItems.toggleActiveCategory,
          permissionsItems.toggleFeaturedCategory,
          permissionsItems.toggleDefaultCategory,
        ]) && (
          <TableCell className="md:hidden text-right">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <div className="flex justify-end items-center rounded-full bg-[#000]/10 dark:bg-[#fff]/10 p-2">
                  <Settings className="text-blue-500 size-[13px]" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`${globalStyleObj.backgroundLight900Dark200} border dark:border-[#fff]/10 font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 min-w-[150px]`}
              >
                <DropdownMenuLabel className="dark:text-light-weight-800 tracking-wider text-[13px]">
                  {category.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Edit Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  permissionsItems.editCategory
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Edit</span>
                    <Link
                      href={`${editRoute}/${category._id}`}
                      className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                    >
                      <RiEditBoxLine size={12} />
                    </Link>
                  </DropdownMenuItem>
                )}
                {/* Delete Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  permissionsItems.deleteCategory
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Delete</span>
                    <DeleteButton
                      userId={userId}
                      targetDetails={category}
                      targetType="category"
                      targetName={category?.name?.en || "Anonymous"}
                      apiCallback={actionFunctions.deleteCategoryFnc}
                      isDefault={category.isDefault}
                    />
                  </DropdownMenuItem>
                )}
                {/* Active Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  permissionsItems.toggleActiveCategory
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Active</span>
                    <SwitchButton
                      args={[userId, category._id, category.activeStatus]}
                      status={category.activeStatus}
                      apiCallback={actionFunctions.toggleActiveCategoryFnc}
                      customBodySize="h-4 w-8"
                      customThumbSize="h-3 w-3"
                      refreshIconSize={16}
                    />
                  </DropdownMenuItem>
                )}
                {/* Featured Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  permissionsItems.toggleFeaturedCategory
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Featured</span>
                    <SwitchButton
                      args={[userId, category._id, category.isFeatured]}
                      status={category.isFeatured}
                      apiCallback={actionFunctions.toggleFeaturedCategoryFnc}
                      customBodySize="h-4 w-8"
                      customThumbSize="h-3 w-3"
                      refreshIconSize={16}
                    />
                  </DropdownMenuItem>
                )}
                {/* Default Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  permissionsItems.toggleDefaultCategory
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Default</span>
                    <SwitchButton
                      args={[userId, category._id, category.isDefault]}
                      status={category.isDefault}
                      apiCallback={actionFunctions.toggleDefaultCategoryFnc}
                      customBodySize="h-4 w-8"
                      customThumbSize="h-3 w-3"
                      refreshIconSize={16}
                    />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        )}
      </TableRow>

      {/* Render Children if Expanded */}
      {expandedCategories.includes(category._id) &&
        category.children &&
        category.children.length > 0 && (
          <>
            {renderAllCategories(
              userId,
              category.children,
              expandedCategories,
              toggleCategory,
              permissionsItems,
              editRoute,
              actionFunctions,
              adminRole,
              permissionsList,
              level + 5
            )}
          </>
        )}
    </React.Fragment>
  ));
};

const RenderAllCategories = ({
  userId,
  categoryTree,
  tableColumns,
  permissionsItems,
  editRoute,
  actionFunctions,
  adminRole,
  permissionsList,
}) => {
  // State to Track Expanded Categories
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle Function
  const toggleCategory = (categoryId) => {
    setExpandedCategories(
      (prevState) =>
        prevState.includes(categoryId)
          ? prevState.filter((id) => id !== categoryId) // Remove from expanded
          : [...prevState, categoryId] // Add to expanded
    );
  };

  // Columns
  const columns = useMemo(() => tableColumns, []);

  return (
    <Table className="border dark:border-[#fff]/10 rounded-sm mt-3">
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => {
            if (
              useGroupUIPermissionCheck(
                adminRole,
                permissionsList,
                column.requirePermissionList
              )
            ) {
              return (
                <TableHead
                  key={`${column.name}-${index + 1}`}
                  className={`${column.class} font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 pl-3`}
                >
                  {column.name}
                </TableHead>
              );
            }
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
        {renderAllCategories(
          userId,
          categoryTree,
          expandedCategories,
          toggleCategory,
          permissionsItems,
          editRoute,
          actionFunctions,
          adminRole,
          permissionsList
        )}
      </TableBody>
    </Table>
  );
};

export default RenderAllCategories;
