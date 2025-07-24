"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CreateNewButton,
  EmptyCard,
  FileDialogInner,
  FileTypeFilterDropdown,
  PaginationComponent,
  SearchByFileName,
} from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PERMISSIONS } from "@/constants/permissions";
import ROUTES from "@/constants/routes";
import { Spinner } from "@/lib/helpers/Spinner";
import { useUIPermissionCheck } from "@/lib/hooks";
import { Suspense, useState } from "react";

const FileDialogContent = ({
  hexCode,
  userId,
  filesList,
  paginationDetails,
  searchValue,
  selectedFileType,
  onSelectFile,
  selectedBannerFileId,
  selectedMetaFileId,
  adminRole,
  permissionsList,
}) => {
  const [selectedFileId, setSelectedFileId] = useState(
    selectedBannerFileId || selectedMetaFileId || ""
  );

  const onSelectId = (id, name, type) => {
    setSelectedFileId((prev) => (prev === id ? "" : id));
    onSelectFile(id, name, type);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-poppins-rg mt-5">
          <div className="flex items-center gap-2">
            <SearchByFileName />
            <FileTypeFilterDropdown />
          </div>

          {useUIPermissionCheck(
            adminRole,
            permissionsList,
            PERMISSIONS.FILE.ADD_FILE
          ) && (
            <CreateNewButton
              hrefLink={ROUTES.ADMIN_CREATE_FILE}
              text="Upload"
            />
          )}
        </DialogTitle>
        <DialogDescription className="text-[14px] font-poppins-rg text-dark-weight-350 dark:text-light-weight-400 italic">
          You can select an image from the list below.
        </DialogDescription>
      </DialogHeader>
      <Card
        className={`${globalStyleObj.backgroundLight900Dark300} h-[70vh] dark:border-[#fff]/10 overflow-auto`}
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
                    _id,
                    fileS3Key,
                    fileName,
                    fileType,
                    fileSize,
                    fileUrl,
                  }) => (
                    <Suspense key={fileS3Key} fallback={<Spinner />}>
                      <FileDialogInner
                        fileId={_id}
                        fileKey={fileS3Key}
                        fileName={fileName}
                        contentType={fileType}
                        size={fileSize}
                        url={fileUrl}
                        userId={userId}
                        selectedFileId={selectedFileId}
                        onSelectId={onSelectId}
                      />
                    </Suspense>
                  )
                )}
              </div>
            </div>
          ) : (
            <EmptyCard
              page={paginationDetails.currentPage}
              totalPages={paginationDetails.totalPages}
              search={searchValue}
              selectedFileType={selectedFileType}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <PaginationComponent paginationDetails={paginationDetails} />
        </CardFooter>
      </Card>
    </>
  );
};

export default FileDialogContent;
