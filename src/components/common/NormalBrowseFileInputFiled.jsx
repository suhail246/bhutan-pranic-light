"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { FileReuseDialog, LabelText } from "..";
import { Skeleton } from "../ui/skeleton";

const NormalBrowseFileInputFiled = ({
  userId,
  isFetching = false,
  labelText = "",
  fieldId = "unknown",
  allFilesResponse,
  searchValue = "",
  selectedFileType = "",
  onChangeImageFunction,
  selectedFileId = "",
  adminRole,
  permissionsList = [],
  infoText = "",
  extraContainerClasses = "",
  extraInputClasses = "",
}) => {
  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <>
          {labelText && <Skeleton className="w-[150px] h-[30px] rounded-md" />}
          <Skeleton className="w-full lg:max-w-[500px] h-[50px] rounded-md" />
        </>
      ) : (
        <>
          {labelText && <LabelText text={labelText} htmlForId={fieldId} />}

          <div className={`w-full lg:max-w-[500px] ${extraInputClasses}`}>
            <FileReuseDialog
              htmlId={fieldId}
              userId={userId}
              filesList={allFilesResponse?.filesList || []}
              allFiles={allFilesResponse?.allFilesData || []}
              paginationDetails={allFilesResponse?.paginationData || {}}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={onChangeImageFunction}
              selectedBannerFileId={selectedFileId}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />

            {infoText && (
              <p className="text-[10px] text-light-weight-400 font-poppins-rg mt-1">
                {infoText}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NormalBrowseFileInputFiled;
