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
import { useGroupUIPermissionCheck } from "@/lib/hooks";
import Image from "next/image";
import { useMemo } from "react";

const TestimonialLists = ({
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
            {data.map((eachTestimonial, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachTestimonial._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>
                  {/* Image */}
                  <TableCell>
                    <div
                      className={`w-[40px] h-[40px] rounded-full sm:rounded-md overflow-hidden relative ${eachTestimonial.isActive ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                    >
                      {eachTestimonial.image &&
                      eachTestimonial.image.fileType.startsWith(
                        "image/svg+xml"
                      ) ? (
                        <SVGBannerImage
                          bannerUrl={eachTestimonial.image.fileUrl}
                        />
                      ) : (
                        <Image
                          src={
                            eachTestimonial.image
                              ? eachTestimonial.image.fileUrl
                              : "/assets/error400-cover.png"
                          }
                          alt={
                            eachTestimonial.image
                              ? eachTestimonial.image.fileName
                              : "not-found"
                          }
                          fill
                          sizes="(max-width: 576px) 100vh, 100vh"
                          loading="lazy"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  {/* Name */}
                  <TableCell
                    className={`${eachTestimonial.isActive ? "" : "line-through opacity-50"}`}
                  >
                    {(eachTestimonial.name?.en || "Anonymous").length > 25
                      ? eachTestimonial.name?.en.slice(0, 25) + "..." ||
                        "Anonymous"
                      : eachTestimonial.name?.en || "Anonymous"}
                  </TableCell>
                  {/* Message */}
                  <TableCell
                    className={`${eachTestimonial.isActive ? "" : "line-through opacity-50"}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          eachTestimonial?.message?.en?.slice(0, 50) + "..." ||
                          "<p>No Message</p>",
                      }}
                    />
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
                        postDetails={eachTestimonial}
                        permissionItems={permissionItems}
                        editRoute={editRoute}
                        targetType={targetType}
                        targetKeyName="name"
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

export default TestimonialLists;
