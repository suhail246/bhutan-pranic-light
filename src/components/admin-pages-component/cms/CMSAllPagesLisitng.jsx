"use client";

import { EachCMSPageActions, PaginationComponent } from "@/components";
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

const CMSAllPagesLisitng = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  permissionItems,
  editRoute = "#",
  sectionUpdateRoute = "#",
  targetType = "none",
  actionFunctions,
  search,
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
            {data.map((eachPage, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachPage._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>
                  {/* Page Name */}
                  <TableCell
                    className={`${eachPage.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPage?.pageName || "Anonymous"}
                  </TableCell>
                  {/* Slug */}
                  <TableCell
                    className={`${eachPage.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {`${process.env.NEXT_PUBLIC_DOMAIN_URL}/${eachPage?.slug || "Anonymous"}`}
                  </TableCell>
                  {/* Actions */}
                  {useGroupUIPermissionCheck(adminRole, permissionsList, [
                    permissionItems.editItem,
                    permissionItems.deleteItem,
                    permissionItems.toggleActiveItem,
                  ]) && (
                    <TableCell className="text-right">
                      <EachCMSPageActions
                        userId={userId}
                        itemDetails={eachPage}
                        permissionItems={permissionItems}
                        editRoute={editRoute}
                        sectionUpdateRoute={sectionUpdateRoute}
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

export default CMSAllPagesLisitng;
