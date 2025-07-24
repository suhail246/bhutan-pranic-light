import { checkUserPermission } from "@/actions/pageDataActions";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  Error403,
  HandleSessionEnd,
  UppyUploader,
} from "@/components";
import { PERMISSIONS } from "@/constants/permissions";

export const metadata = {
  title: titlesObject.createFiles.title,
};

const CreateFiles = async () => {
  const { userId, error } = await checkUserPermission(
    PERMISSIONS.FILE.ADD_FILE
  );

  if (error) {
    return error === "Unauthorized" ? <HandleSessionEnd /> : <Error403 />;
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb currentTab="Create File" mainParentTab="Files Console" />

      <div
        className={`mt-[40px] ${globalStyleObj.backgroundLight900Dark300} rounded-sm p-3 shadow-light sm:p-5`}
      >
        <h1 className="text-dark-weight-500 dark:text-light-weight-800 text-[13px] md:text-[16px] tracking-wide font-poppins-md mb-2">
          Upload Files Rules
        </h1>
        <div className="mb-5">
          <p className="text-dark-weight-400 dark:text-light-weight-400 text-[13px] font-poppins-rg not-italic">
            You can upload files by dragging them into the area below or
            clicking to browse your device. Please note the following file size
            limitations for uploads:
          </p>
          <ul className="list-disc pl-6 my-5">
            <li className="text-[13px] font-poppins-rg text-light-weight-450">
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550 not-italic">
                Images:
              </span>{" "}
              Maximum file size is{" "}
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
                {process.env.NEXT_PUBLIC_UPPY_MAX_IMAGE_FILE_SIZE_MB}
                MB.
              </span>
            </li>
            <li className="text-[13px] font-poppins-rg text-light-weight-450">
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550 not-italic">
                Videos:
              </span>{" "}
              Maximum file size is{" "}
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
                {process.env.NEXT_PUBLIC_UPPY_MAX_VIDEO_FILE_SIZE_MB}
                MB.
              </span>
            </li>
            <li className="text-[13px] font-poppins-rg text-light-weight-450">
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550 not-italic">
                PDFs:
              </span>{" "}
              Maximum file size is{" "}
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
                {process.env.NEXT_PUBLIC_UPPY_MAX_PDF_FILE_SIZE_MB}
                MB.
              </span>
            </li>
            <li className="text-[13px] font-poppins-rg text-light-weight-450">
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550 not-italic">
                Other files (e.g., Word, ZIP, etc.):
              </span>{" "}
              Maximum file size is{" "}
              <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
                {process.env.NEXT_PUBLIC_UPPY_MAX_OTHER_FILE_SIZE_MB}
                MB.
              </span>
            </li>
          </ul>
          <p className="text-dark-weight-400 dark:text-light-weight-400 text-[13px] font-poppins-rg not-italic">
            The total number of files you can upload at once is limited to{" "}
            <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
              {process.env.NEXT_PUBLIC_UPPY_RESTRICTED_FILES_COUNT}
            </span>
            , with a combined total size of{" "}
            <span className="font-poppins-md text-dark-weight-400 dark:text-light-weight-550">
              {process.env.NEXT_PUBLIC_UPPY_RESTRICTED_FILES_SIZE}
              MB
            </span>
            . Files exceeding these limits will not be accepted. Start uploading
            now and manage your files effortlessly!
          </p>
        </div>

        <div className="relative">
          <UppyUploader userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CreateFiles;
