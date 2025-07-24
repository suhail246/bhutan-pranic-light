import { deletePerticularRole } from "@/actions/apiClientActions/user";
import { roleTableColumns } from "@/app/assets/data/tableData";
import { DeleteButton } from "@/components";
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
import Link from "next/link";
import { useMemo } from "react";
import { RiEditBoxLine } from "react-icons/ri";

const RolesTable = ({
  sessionUserId,
  rolesList,
  paginationDetails,
  adminRole,
  permissionsList,
}) => {
  const columns = useMemo(() => roleTableColumns(), []);

  return (
    <Table className="border dark:border-[#fff]/10 rounded-sm mt-2">
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
                  className={`${column.class} text-dark-weight-500 dark:text-light-weight-550 text-[13px] sm:text-[14px] font-poppins-rg`}
                >
                  {column.name}
                </TableHead>
              );
            }
          })}
        </TableRow>
      </TableHeader>
      <TableBody className="font-poppins-rg text-[11px] sm:text-[11px] text-dark-weight-400 dark:text-light-weight-450">
        {rolesList.length > 0 ? (
          <>
            {rolesList.map((role, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow key={role._id}>
                  {/* Serial Number */}
                  <TableCell className="text-dark-weight-500 dark:text-light-weight-550 text-[11px] sm:text-[13px] font-poppins-rg">
                    <div className="py-5">{serialNumber}</div>
                  </TableCell>
                  {/* Role Name */}
                  <TableCell className="text-dark-weight-550 dark:text-light-weight-400 text-[11px] sm:text-[13px] font-poppins-rg">
                    <div className="py-5">{role.name}</div>
                  </TableCell>
                  {/* Options */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    PERMISSIONS.STAFF.EDIT_STAFF_ROLE,
                    PERMISSIONS.STAFF.DELETE_STAFF_ROLE,
                  ]) && (
                    <TableCell className="text-dark-weight-550 dark:text-light-weight-400 text-[11px] sm:text-[13px] font-poppins-rg">
                      <div className="py-5 flex items-center justify-end gap-2">
                        {useUIPermissionCheck(
                          adminRole,
                          permissionsList,
                          PERMISSIONS.STAFF.EDIT_STAFF_ROLE
                        ) && (
                          <Link
                            href={ROUTES.ADMIN_STAFF_UPDATE_ROLE(role._id)}
                            className="transition-300 rounded-full bg-[#49ABE0]/20 p-1 md:p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                          >
                            <RiEditBoxLine size={12} />
                          </Link>
                        )}

                        {useUIPermissionCheck(
                          adminRole,
                          permissionsList,
                          PERMISSIONS.STAFF.DELETE_STAFF_ROLE
                        ) && (
                          <DeleteButton
                            userId={sessionUserId}
                            targetDetails={role}
                            targetType="role"
                            targetName={role.name}
                            apiCallback={deletePerticularRole}
                          />
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </>
        ) : (
          <TableRow>No roles has been created yet.</TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RolesTable;
