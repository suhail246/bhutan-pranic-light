"use client";

import { uploadFilesToDB } from "@/actions/apiClientActions/files";
import { getS3UploadParams } from "@/lib/s3/action";
import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useErrorToast } from "@/lib/hooks";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { useTheme } from "next-themes";

// Current max 50 files, 1000 MB
const createUppy = (userId) => {
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: parseInt(
        process.env.NEXT_PUBLIC_UPPY_RESTRICTED_FILES_COUNT || "10"
      ),
      maxTotalFileSize:
        parseInt(process.env.NEXT_PUBLIC_UPPY_RESTRICTED_FILES_SIZE || "100") *
        1024 *
        1024,
    },
  });

  return uppy.use(AwsS3, {
    async getUploadParameters(fileObject, options) {
      const file = fileObject.data;

      // Fetch S3 upload parameters
      const { url, fields, fileKey } = await getS3UploadParams(
        file.name,
        file.type,
        file.size,
        userId
      );
      if (!url || !fields) {
        useErrorToast("Upload URL is undefined.");
        throw new Error("Upload URL is undefined.");
      }

      // Set file metadata for S3
      uppy.setFileMeta(fileObject.id, { fileKey });

      // Return S3 upload parameters
      return {
        method: "POST",
        url,
        fields,
      };
    },
  });
};

const UppyUploader = ({ userId }) => {
  const [uppy] = useState(() => createUppy(userId));
  const toastIdRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleComplete = async (result) => {
      const { successful = [], failed } = result;

      const validUploads = successful.map((file) => ({
        userId,
        name: file.name,
        key: file.meta.fileKey,
        size: file.size,
        type: file.type,
        url: file.uploadURL,
      }));

      // const { success, message } = await uploadFilesToDB(validUploads);
      for (let file of validUploads) {
        const { success, message } = await uploadFilesToDB(file);
        if (!success) {
          if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
            toast.error(message);
          } else {
            toast.error(message);
          }
        } else {
          if (toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
            toast.success(message);
          } else {
            toast.success(message);
          }
        }
      }
    };

    const handleProgress = (progress) => {
      const progressMessage = `Uploading files... progress: ${progress}/100%`;

      if (!toastIdRef.current && progress > 0) {
        toastIdRef.current = toast.loading(progressMessage, {
          action: {
            label: "Cancel",
            onClick: () => {
              console.log("Close");
            },
          },
        });
      } else if (progress > 0) {
        toast.loading(progressMessage, {
          id: toastIdRef.current,
        });
      }
    };

    uppy.on("complete", handleComplete);
    uppy.on("progress", handleProgress);

    return () => {
      // Cleanup listeners and destroy instance only on unmount
      uppy.off("complete", handleComplete);
      uppy.off("progress", handleProgress);
    };
  }, [uppy, userId]);

  return (
    <Dashboard
      uppy={uppy}
      theme={theme}
      inline={true}
      height={300} // Example height
      width="100%" // Full width
      note="Drag and drop your files here or browse to upload"
    />
  );
};

export default UppyUploader;
