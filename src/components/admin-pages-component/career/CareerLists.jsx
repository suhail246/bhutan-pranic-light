"use client";

import { EachPostActions, PaginationComponent } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormatISODate, useGroupUIPermissionCheck } from "@/lib/hooks";
import { useMemo } from "react";

const CareerLists = ({
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
            {data.map((eachCareer, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachCareer._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>

                  {/* Date */}
                  <TableCell
                    className={`font-poppins-md ${eachCareer.isActive ? "" : "line-through opacity-50"} hidden sm:table-cell`}
                  >
                    {useFormatISODate(eachCareer.updatedAt)}
                  </TableCell>

                  {/* Job Name */}
                  <TableCell
                    className={`${eachCareer.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {(eachCareer?.jobName?.en || "Anonymous").length > 25
                      ? eachCareer?.jobName?.en?.slice(0, 25) + "..." ||
                        "Anonymous"
                      : eachCareer?.jobName?.en || "Anonymous"}
                  </TableCell>

                  {/* Job Vacancies */}
                  <TableCell
                    className={`${eachCareer.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachCareer?.jobVacancies || "Anonymous"}
                  </TableCell>

                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    permissionItems.editItem,
                    permissionItems.deleteItem,
                    permissionItems.toggleActiveItem,
                    permissionItems.toggleFeaturedItem,
                  ]) && (
                    <TableCell className="text-right">
                      <EachPostActions
                        userId={userId}
                        postDetails={eachCareer}
                        permissionItems={permissionItems}
                        editRoute={editRoute}
                        targetType={targetType}
                        targetKeyName="jobName"
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

export default CareerLists;
