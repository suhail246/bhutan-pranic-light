import {
  deletePerticularLanguage,
  toggleActiveLanguage,
  toggleDefaultLanguage,
  toggleRTLLanguage,
} from "@/actions/apiClientActions/languages";
import { languagesTableColumns } from "@/app/assets/data/tableData";
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
import { useMemo } from "react";
import { RiEditBoxLine } from "react-icons/ri";

const RenderAllLanguages = ({
  userId,
  languagesList,
  adminRole,
  permissionsList,
}) => {
  // Columns
  const columns = useMemo(() => languagesTableColumns(), []);

  return (
    <Table className="border dark:border-[#fff]/10 rounded-sm mt-5">
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
        {languagesList.map((lang, index) => {
          return (
            <TableRow
              key={lang._id}
              className={`text-[11px] sm:text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-450 ${lang.status ? "" : "opacity-70"}`}
            >
              {/* Serial Number */}
              <TableCell className={`font-poppins-md pl-2`}>
                {index + 1}
              </TableCell>

              {/* Name */}
              <TableCell className="font-poppins-md">
                <span
                  className={`${!lang.status ? "line-through text-light-weight-400" : ""}`}
                >
                  {lang.name}
                </span>
              </TableCell>

              {/* Active Status Button above small devices */}
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.LANGUAGE.TOGGLE_ACTIVE_LANGUAGE
              ) && (
                <TableCell className="hidden md:table-cell">
                  <SwitchButton
                    args={[userId, lang._id, lang.status]}
                    status={lang.status}
                    apiCallback={toggleActiveLanguage}
                    customBodySize="h-4 w-8"
                    customThumbSize="h-3 w-3"
                    refreshIconSize={16}
                  />
                </TableCell>
              )}

              {/* RTL Button above small devices */}
              {useUIPermissionCheck(
                adminRole,
                permissionsList,
                PERMISSIONS.LANGUAGE.TOGGLE_RTL_LANGUAGE
              ) && (
                <TableCell className="hidden md:table-cell">
                  <SwitchButton
                    args={[userId, lang._id, lang.rtl]}
                    status={lang.rtl}
                    apiCallback={toggleRTLLanguage}
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
                PERMISSIONS.LANGUAGE.TOGGLE_DEFAULT_LANGUAGE
              ) && (
                <TableCell className="hidden md:table-cell">
                  <SwitchButton
                    args={[userId, lang._id, lang.default]}
                    status={lang.default}
                    apiCallback={toggleDefaultLanguage}
                    customBodySize="h-4 w-8"
                    customThumbSize="h-3 w-3"
                    refreshIconSize={16}
                  />
                </TableCell>
              )}

              {/* Edit and Delete Buttons above small devices */}
              {useGroupUIPermissionCheck(adminRole, permissionsList, [
                PERMISSIONS.LANGUAGE.EDIT_LANGUAGE,
                PERMISSIONS.LANGUAGE.DELETE_LANGUAGE,
              ]) && (
                <TableCell className="flex-1 pr-3 hidden md:table-cell">
                  <div className="flex justify-end items-center gap-2">
                    {useUIPermissionCheck(
                      adminRole,
                      permissionsList,
                      PERMISSIONS.LANGUAGE.EDIT_LANGUAGE
                    ) && (
                      <Link
                        href={ROUTES.ADMIN_UPDATE_LANGUAGE(lang._id)}
                        className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                      >
                        <RiEditBoxLine size={12} />
                      </Link>
                    )}

                    {useUIPermissionCheck(
                      adminRole,
                      permissionsList,
                      PERMISSIONS.LANGUAGE.DELETE_LANGUAGE
                    ) && (
                      <DeleteButton
                        userId={userId}
                        targetDetails={lang}
                        targetType="language"
                        targetName={lang.name}
                        apiCallback={deletePerticularLanguage}
                        isDefault={lang.default}
                      />
                    )}
                  </div>
                </TableCell>
              )}

              {/* Status, Rtl, Default, Edit, Delete Button for small devices */}
              {useGroupUIPermissionCheck(adminRole, permissionsList, [
                PERMISSIONS.LANGUAGE.EDIT_LANGUAGE,
                PERMISSIONS.LANGUAGE.DELETE_LANGUAGE,
                PERMISSIONS.LANGUAGE.TOGGLE_ACTIVE_LANGUAGE,
                PERMISSIONS.LANGUAGE.TOGGLE_RTL_LANGUAGE,
                PERMISSIONS.LANGUAGE.TOGGLE_DEFAULT_LANGUAGE,
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
                        {lang.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {/* Edit Section */}
                      {useUIPermissionCheck(
                        adminRole,
                        permissionsList,
                        PERMISSIONS.LANGUAGE.EDIT_LANGUAGE
                      ) && (
                        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                          <span>Edit</span>
                          <Link
                            href={ROUTES.ADMIN_UPDATE_LANGUAGE(lang._id)}
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
                        PERMISSIONS.LANGUAGE.DELETE_LANGUAGE
                      ) && (
                        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                          <span>Delete</span>
                          <DeleteButton
                            userId={userId}
                            targetDetails={lang}
                            targetType="language"
                            targetName={lang.name}
                            apiCallback={deletePerticularLanguage}
                            isDefault={lang.default}
                          />
                        </DropdownMenuItem>
                      )}
                      {/* Active Section */}
                      {useUIPermissionCheck(
                        adminRole,
                        permissionsList,
                        PERMISSIONS.CATEGORY.TOGGLE_ACTIVE_CATEGORY
                      ) && (
                        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                          <span>Active</span>
                          <SwitchButton
                            args={[userId, lang._id, lang.status]}
                            status={lang.status}
                            apiCallback={toggleActiveLanguage}
                            customBodySize="h-4 w-8"
                            customThumbSize="h-3 w-3"
                            refreshIconSize={16}
                          />
                        </DropdownMenuItem>
                      )}
                      {/* RTL Section */}
                      {useUIPermissionCheck(
                        adminRole,
                        permissionsList,
                        PERMISSIONS.CATEGORY.TOGGLE_FEATURED_CATEGORY
                      ) && (
                        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                          <span>Featured</span>
                          <SwitchButton
                            args={[userId, lang._id, lang.rtl]}
                            status={lang.rtl}
                            apiCallback={toggleRTLLanguage}
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
                        PERMISSIONS.CATEGORY.TOGGLE_DEFAULT_CATEGORY
                      ) && (
                        <DropdownMenuItem className="flex items-center justify-between gap-2 text-[12px]">
                          <span>Default</span>
                          <SwitchButton
                            args={[userId, lang._id, lang.default]}
                            status={lang.default}
                            apiCallback={toggleDefaultLanguage}
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
          );
        })}
      </TableBody>
    </Table>
  );
};

export default RenderAllLanguages;
