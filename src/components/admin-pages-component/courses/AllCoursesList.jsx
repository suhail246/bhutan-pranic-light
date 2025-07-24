import { EachCourseActions, SVGBannerImage } from "@/components";
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

const AllCoursesList = ({
  userId,
  data,
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
          {data.map((eachItem, index) => {
            return (
              <TableRow
                key={eachItem._id}
                className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
              >
                {/* Serial Number */}
                <TableCell className={`font-poppins-md`}>{index + 1}</TableCell>

                {/* Image */}
                <TableCell>
                  <div
                    className={`w-[40px] h-[40px] sm:w-[100px] sm:h-[60px] rounded-full sm:rounded-md overflow-hidden relative ${eachItem.isActive ? "" : "opacity-50"} border dark:border-[#fff]/10`}
                  >
                    {eachItem?.image &&
                    eachItem?.image?.fileType?.startsWith("image/svg+xml") ? (
                      <SVGBannerImage
                        bannerUrl={eachItem?.image?.fileUrl || ""}
                      />
                    ) : (
                      <Image
                        src={
                          eachItem.image
                            ? eachItem.image.fileUrl
                            : "/assets/error400-cover.png"
                        }
                        alt={
                          eachItem.image ? eachItem.image.fileName : "not-found"
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
                  className={`${eachItem.isActive ? "" : "line-through opacity-50"}`}
                >
                  {eachItem.title?.en || "Not Found"}
                </TableCell>
                {/* Category */}
                <TableCell
                  className={`${eachItem.isActive ? "" : "line-through opacity-50"}`}
                >
                  {(eachItem.shortDescription?.en || "Not Found").length > 40
                    ? eachItem.shortDescription?.en.slice(0, 40) + "..." ||
                      "Not Found"
                    : eachItem.shortDescription?.en || "Not Found"}
                </TableCell>
                {/* Actions */}
                {useGroupUIPermissionCheck(adminRole, permissionsList, [
                  permissionItems.editItem,
                  permissionItems.deleteItem,
                  permissionItems.toggleActiveItem,
                  permissionItems.toggleFeaturedItem,
                ]) && (
                  <TableCell className="text-right">
                    <EachCourseActions
                      userId={userId}
                      courseDetails={eachItem}
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
  );
};

export default AllCoursesList;
