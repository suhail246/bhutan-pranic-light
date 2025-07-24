"use client";

import {
  EachPostActions,
  PaginationComponent,
  SVGBannerImage,
} from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormatISODate, useGroupUIPermissionCheck } from "@/lib/hooks";
import Image from "next/image";
import { useMemo } from "react";

const AllBlogPostsList = ({
  userId,
  data,
  paginationDetails,
  tableColumns = [],
  permissionItems,
  editRoute = "#",
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
            {data.map((eachPost, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachPost._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>
                  {/* Date */}
                  <TableCell
                    className={`font-poppins-md ${eachPost.isActive ? "" : "line-through opacity-50"} hidden sm:table-cell`}
                  >
                    {useFormatISODate(eachPost.updatedAt)}
                  </TableCell>
                  {/* Banner Image */}
                  <TableCell>
                    <div
                      className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${eachPost.isActive ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                    >
                      {eachPost.bannerImage &&
                      eachPost.bannerImage.fileType.startsWith(
                        "image/svg+xml"
                      ) ? (
                        <SVGBannerImage
                          bannerUrl={eachPost.bannerImage.fileUrl}
                        />
                      ) : (
                        <Image
                          src={
                            eachPost.bannerImage
                              ? eachPost.bannerImage.fileUrl
                              : "/assets/error400-cover.png"
                          }
                          alt={
                            eachPost.bannerImage
                              ? eachPost.bannerImage.fileName
                              : "not-found"
                          }
                          fill
                          sizes="(max-width: 576px) 100px, 150px"
                          loading="lazy"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  {/* Title */}
                  <TableCell
                    className={`${eachPost.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {(eachPost.title?.en || "Anonymous").length > 25
                      ? eachPost.title?.en.slice(0, 25) + "..." || "Anonymous"
                      : eachPost.title?.en || "Anonymous"}
                  </TableCell>
                  {/* Category */}
                  <TableCell
                    className={`${eachPost.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {eachPost.category?.name || "No Category"}
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
                        postDetails={eachPost}
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

export default AllBlogPostsList;
