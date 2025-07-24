import { DeleteButton, PaginationComponent } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useFormatISODate,
  useGroupUIPermissionCheck,
  useUIPermissionCheck,
} from "@/lib/hooks";
import { useMemo } from "react";

const AllContactQueryList = ({
  userId,
  data,
  paginationDetails,
  tableColumns,
  permissionItems,
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
            {data.map((eachQuery, index) => {
              const serialNumber =
                parseInt(paginationDetails.currentLimit) *
                  (parseInt(paginationDetails.currentPage) - 1) +
                index +
                1;

              return (
                <TableRow
                  key={eachQuery._id}
                  className={`${index === data.length - 1 ? "border-0" : "border-b dark:border-[#fff]/10"}`}
                >
                  {/* Serial Number */}
                  <TableCell className={`font-poppins-md`}>
                    {serialNumber}
                  </TableCell>

                  {/* Date */}
                  <TableCell className={`font-poppins-md hidden sm:table-cell`}>
                    {useFormatISODate(eachQuery.createdAt)}
                  </TableCell>

                  {/* Name */}
                  <TableCell>
                    {`${eachQuery.firstName} ${eachQuery?.lastName || ""}`}
                  </TableCell>

                  {/* Contact Info */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {eachQuery?.mobileNumber && (
                        <span>{eachQuery.mobileNumber}</span>
                      )}

                      {eachQuery?.email && <span>{eachQuery.email}</span>}
                    </div>
                  </TableCell>

                  {/* Message */}
                  <TableCell>
                    {eachQuery?.problemDescription || "No Message"}
                  </TableCell>

                  {/* Action */}
                  {useUIPermissionCheck(
                    adminRole,
                    permissionsList,
                    permissionItems.deleteItem
                  ) && (
                    <TableCell className="text-right">
                      <DeleteButton
                        userId={userId}
                        targetDetails={eachQuery}
                        targetType={targetType}
                        targetName={eachQuery?.firstName || ""}
                        apiCallback={actionFunctions.deleteItemFnc}
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

export default AllContactQueryList;
