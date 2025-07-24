"use client";

import {
  deletePerticularMenu,
  toggleMenuActiveStatus,
  toggleProductMenuStatus,
} from "@/actions/apiClientActions/menu";
import { menuTableColumns } from "@/app/assets/data/tableData";
import { globalStyleObj } from "@/app/assets/styles";
import { DeleteButton, SwitchButton } from "@/components";
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
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { useGroupUIPermissionCheck, useUIPermissionCheck } from "@/lib/hooks";
import { Settings } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";
import { MdOutlineFolderOpen } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

const renderAllMenus = (
  menuTree,
  expandedMenus,
  toggleMenu,
  userId,
  adminRole,
  permissionsList,
  level = 12
) => {
  return menuTree.map((menu, index) => (
    <React.Fragment key={menu._id}>
      <TableRow
        className={`text-[11px] sm:text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-450`}
      >
        {/* Menu Name with Toggle Button */}
        <TableCell
          className="cursor-pointer"
          style={{ paddingLeft: `${level}px` }}
          onClick={
            menu.children && menu.children.length > 0
              ? () => toggleMenu(menu._id)
              : null
          }
        >
          {menu.children && menu.children.length > 0 ? (
            <button className="bg-green-500/20 rounded-full p-1">
              {expandedMenus.includes(menu._id) ? (
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
          {/* Menu name for small devices */}
          <span
            className={`${menu.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} md:hidden ml-2`}
          >
            {menu.name?.en?.length > 20
              ? menu.name.en.slice(0, 20) + "..."
              : menu.name?.en || "Not Found"}
          </span>
          {/* Menu name for above small devices */}
          <span
            className={`${menu.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} hidden md:inline ml-2`}
          >
            {menu.name?.en || "Not Found"}
          </span>
        </TableCell>

        {/* Active Status Button above small devices */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU
        ) && (
          <TableCell className="hidden md:table-cell">
            <SwitchButton
              args={[userId, menu._id, menu.activeStatus]}
              status={menu.activeStatus}
              apiCallback={toggleMenuActiveStatus}
              customBodySize="h-4 w-8"
              customThumbSize="h-3 w-3"
              refreshIconSize={16}
            />
          </TableCell>
        )}

        {/* Product Menu Status Button above small devices */}
        {useUIPermissionCheck(
          adminRole,
          permissionsList,
          PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU
        ) && (
          <TableCell className="hidden md:table-cell">
            <SwitchButton
              args={[userId, menu._id, menu.productMenuStatus]}
              status={menu.productMenuStatus}
              apiCallback={toggleProductMenuStatus}
              customBodySize="h-4 w-8"
              customThumbSize="h-3 w-3"
              refreshIconSize={16}
            />
          </TableCell>
        )}

        {/* Edit and Delete Buttons above small devices */}
        {useGroupUIPermissionCheck(adminRole, permissionsList, [
          PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU,
          PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU,
        ]) && (
          <TableCell className="flex-1 pr-3 hidden md:table-cell">
            <div className="flex justify-end items-center gap-2">
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU
              ) && (
                <Link
                  href={ROUTES.ADMIN_EDIT_MENU(menu._id)}
                  className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                >
                  <RiEditBoxLine size={12} />
                </Link>
              )}

              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU
              ) && (
                <DeleteButton
                  userId={userId}
                  targetDetails={menu}
                  targetType="menu"
                  targetName={menu?.name?.en || "Anonymous"}
                  apiCallback={deletePerticularMenu}
                />
              )}
            </div>
          </TableCell>
        )}

        {/* Status, Featured, Default, Edit, Delete Button for small devices */}
        {useGroupUIPermissionCheck(adminRole, permissionsList, [
          PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU,
          PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU,
          PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU,
          PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU,
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
                  {menu.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Edit Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  PERMISSIONS.MENU_MANAGEMENT.EDIT_MENU
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Edit</span>
                    <Link
                      href={ROUTES.ADMIN_EDIT_MENU(menu._id)}
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
                  PERMISSIONS.MENU_MANAGEMENT.DELETE_MENU
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Delete</span>
                    <DeleteButton
                      userId={userId}
                      targetDetails={menu}
                      targetType="menu"
                      targetName={menu?.name?.en || "Anonymous"}
                      apiCallback={deletePerticularMenu}
                    />
                  </DropdownMenuItem>
                )}
                {/* Active Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  PERMISSIONS.MENU_MANAGEMENT.TOGGLE_ACTIVE_MENU
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Active</span>
                    <SwitchButton
                      args={[userId, menu._id, menu.activeStatus]}
                      status={menu.activeStatus}
                      apiCallback={toggleMenuActiveStatus}
                      customBodySize="h-4 w-8"
                      customThumbSize="h-3 w-3"
                      refreshIconSize={16}
                    />
                  </DropdownMenuItem>
                )}
                {/* Product Menu Status Section */}
                {useUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  PERMISSIONS.MENU_MANAGEMENT.TOGGLE_PRODUCT_MENU
                ) && (
                  <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                    <span>Product Menu</span>
                    <SwitchButton
                      args={[userId, menu._id, menu.productMenuStatus]}
                      status={menu.productMenuStatus}
                      apiCallback={toggleProductMenuStatus}
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
      {expandedMenus.includes(menu._id) &&
        menu.children &&
        menu.children.length > 0 && (
          <>
            {renderAllMenus(
              menu.children,
              expandedMenus,
              toggleMenu,
              userId,
              adminRole,
              permissionsList,
              level + 5
            )}
          </>
        )}
    </React.Fragment>
  ));
};

const RenderAllMenus = ({ userId, menuTree, adminRole, permissionsList }) => {
  // State to Track Expanded Menus
  const [expandedMenus, setExpandedMenus] = useState([]);

  // Toggle Function
  const toggleMenu = (menuId) => {
    setExpandedMenus(
      (prevState) =>
        prevState.includes(menuId)
          ? prevState.filter((id) => id !== menuId) // Remove from expanded
          : [...prevState, menuId] // Add to expanded
    );
  };

  // Columns
  const columns = useMemo(() => menuTableColumns(), []);

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
        {renderAllMenus(
          menuTree,
          expandedMenus,
          toggleMenu,
          userId,
          adminRole,
          permissionsList
        )}
      </TableBody>
    </Table>
  );
};

export default RenderAllMenus;
