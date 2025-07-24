import { userTableColumns } from "@/app/assets/data/tableData";
import { PaginationComponent, UserToggleOptions } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PERMISSIONS } from "@/constants/permissions";
import { useGroupUIPermissionCheck } from "@/lib/hooks";
import { useMemo } from "react";

const UsersTable = ({
  userId,
  usersList,
  paginationDetails,
  roleLists,
  adminRole,
  permissionsList,
}) => {
  const columns = useMemo(() => userTableColumns(), []);

  return (
    <>
      <Table className="border dark:border-[#fff]/10 rounded-sm">
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              if (
                useGroupUIPermissionCheck(
                  adminRole,
                  permissionsList,
                  column.requirePermissionList
                )
              ) {
                return (
                  <TableHead
                    key={column.name}
                    className={`${column.class} text-dark-weight-500 dark:text-light-weight-800 text-[12px] sm:text-[14px] font-poppins-rg`}
                  >
                    {column.name}
                  </TableHead>
                );
              }
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {(usersList || []).map((user, index) => {
            const serialNumber =
              parseInt(paginationDetails.currentLimit) *
                (parseInt(paginationDetails.currentPage) - 1) +
              index +
              1;

            return (
              user?.adminAsignedRole?.name !== "Super Admin" && (
                <TableRow
                  key={user._id}
                  className={`${user.isBlocked ? "opacity-50" : ""}`}
                >
                  {/* Serial Number */}
                  <TableCell className="text-dark-weight-500 dark:text-light-weight-800 text-[12px] sm:text-[13px] font-poppins-rg pl-3">
                    <div className="py-5">{serialNumber}</div>
                  </TableCell>
                  {/* Username */}
                  <TableCell className="text-dark-weight-550 dark:text-light-weight-400 text-[12px] sm:text-[13px] font-poppins-rg">
                    <div className="py-5">{user.username}</div>
                  </TableCell>
                  {/* User Email */}
                  <TableCell className="text-dark-weight-550 dark:text-light-weight-400 text-[12px] sm:text-[13px] font-poppins-rg">
                    <div className="py-5 max-w-[80px] md:max-w-fit overflow-auto">
                      {user.email}
                    </div>
                  </TableCell>
                  {/* User Role */}
                  <TableCell
                    className={`text-[12px] sm:text-[13px]  ${user.adminAsignedRole && user.adminAsignedRole.name === "Super Admin" ? "text-red-500 font-poppins-md" : user.adminAsignedRole && user.adminAsignedRole.name !== "User" ? "text-blue-500 font-poppins-rg" : "text-dark-weight-550 dark:text-light-weight-400 font-poppins-rg"}`}
                  >
                    <div className="py-5">
                      {user.adminAsignedRole
                        ? user.adminAsignedRole.name
                        : "User"}
                    </div>
                  </TableCell>
                  {/* Other Options */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.STAFF.EDIT_STAFF,
                    PERMISSIONS.STAFF.DELETE_STAFF,
                  ]) && (
                    <TableCell className="text-center pr-3">
                      <div className="flex justify-end py-5">
                        <UserToggleOptions
                          userId={userId}
                          user={user}
                          adminRole={adminRole}
                          permissionsList={permissionsList}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            );
          })}
        </TableBody>
      </Table>

      {paginationDetails.totalUsersCount > paginationDetails.currentLimit && (
        <div className="mt-5 px-3 flex items-center gap-2">
          <PaginationComponent paginationDetails={paginationDetails} />
        </div>
      )}
    </>
  );
};

export default UsersTable;
