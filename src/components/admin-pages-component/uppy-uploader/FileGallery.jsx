"use server";

import { getAllFilesFromDB } from "@/actions/apiClientActions/files";
import { globalStyleObj } from "@/app/assets/styles";
import { EmptyCard, FileItemWrapper, PaginationComponent } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FileGallery = async ({
  userId,
  page,
  pageSize,
  selectedFileType,
  search,
  adminRole,
  permissionsList,
}) => {
  const { success, filesList, paginationData, errorMessage } =
    await getAllFilesFromDB(userId, search, page, pageSize, selectedFileType);

  if (success) {
    return (
      <Card
        className={`${globalStyleObj.backgroundLight900Dark300} dark:border-[#fff]/10`}
      >
        <CardHeader>
          <CardTitle className="font-poppins-rg text-[13px] md:text-[15px] text-dark-weight-400 dark:text-light-weight-800 tracking-wider">
            File Gallery
          </CardTitle>
          <CardDescription className="text-[13px] font-poppins-rg text-light-weight-450">
            View uploaded files
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden">
          {filesList.length > 0 ? (
            <div className="h-full overflow-auto pr-4 scroll-smooth">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filesList.map(
                  ({
                    fileS3Key,
                    fileName,
                    fileType,
                    fileSize,
                    fileUrl,
                    isDefault,
                  }) => (
                    <div key={fileS3Key} className="flex flex-col">
                      <FileItemWrapper
                        fileKey={fileS3Key}
                        fileName={fileName}
                        contentType={fileType}
                        size={fileSize}
                        url={fileUrl}
                        userId={userId}
                        isDefault={isDefault}
                        adminRole={adminRole}
                        permissionsList={permissionsList}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <EmptyCard
              page={paginationData.currentPage}
              totalPages={paginationData.totalPages}
              search={search}
              selectedFileType={selectedFileType}
            />
          )}
        </CardContent>
        {/* DEBUG Show only when total file > currentPageSize */}
        <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <PaginationComponent
            paginationDetails={paginationData}
            searchName={search}
          />
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card
        className={`${globalStyleObj.backgroundLight900Dark300} dark:border-[#fff]/10`}
      >
        <CardHeader>
          <CardTitle className="font-poppins-rg text-[13px] md:text-[15px] text-dark-weight-400 dark:text-light-weight-800 tracking-wider">
            File Gallery
          </CardTitle>
          <CardDescription className="text-[13px] font-poppins-rg text-light-weight-450">
            View uploaded files
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <EmptyCard
            page={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            search={search}
            selectedFileType={selectedFileType}
          />
        </CardContent>
      </Card>
    );
  }
};

export default FileGallery;
