"use client";

import { EachPackageActions, PaginationComponent } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGroupUIPermissionCheck } from "@/lib/hooks";
import { useMemo } from "react";

const AllCoursePackagesList = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  permissionItems,
  editRoute = "#",
  targetType = "none",
  actionFunctions,
  adminRole,
  permissionsList,
}) => {
  const columns = useMemo(() => tableColumns, []);

  return (
    <>
      <div className="mx-3 mt-3 border rounded-sm dark:border-[#fff]/10">
        <Table>
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
                      className={`${column.class} font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800`}
                    >
                      {column.name}
                    </TableHead>
                  );
                }
              })}
            </TableRow>
          </TableHeader>
          <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
            {data.map((eachPackage, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachPackage._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>
                  {/* Title */}
                  <TableCell
                    className={`${eachPackage.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {(eachPackage?.packageTitle || "Anonymous").length > 20
                      ? eachPackage?.packageTitle?.slice(0, 20) + "..." ||
                        "Anonymous"
                      : eachPackage?.packageTitle || "Anonymous"}
                  </TableCell>

                  {/* Course Name */}
                  <TableCell
                    className={`${eachPackage.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPackage?.courseId?.title || "No Course"}
                  </TableCell>

                  {/* Package Type */}
                  <TableCell
                    className={`${eachPackage.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPackage?.coursePackageType || "No Type"}
                  </TableCell>
                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    permissionItems.editItem,
                    permissionItems.deleteItem,
                    permissionItems.toggleActiveItem,
                    permissionItems.toggleFeaturedItem,
                  ]) && (
                    <TableCell className="text-right">
                      <EachPackageActions
                        userId={userId}
                        packageDetails={eachPackage}
                        permissionItems={permissionItems}
                        editRoute={editRoute}
                        targetType={targetType}
                        actionFunctions={actionFunctions}
                        adminRole={adminRole}
                        permissionsList={permissionsList}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {paginationDetails.totalItemsCount > paginationDetails.currentLimit && (
        <div className="mt-5 px-3 flex items-center gap-2">
          <PaginationComponent paginationDetails={paginationDetails} />
        </div>
      )}
    </>
  );
};

export default AllCoursePackagesList;
