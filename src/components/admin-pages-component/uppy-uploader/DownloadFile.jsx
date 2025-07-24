"use client";

import { useErrorToast } from "@/lib/hooks";
import { Download } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const DownloadFile = ({ fileKey, contentType, userId }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // const handleDownload = async () => {
  //   setIsProcessing(true);

  //   const { success, responseData, message } = await downloadFile(
  //     fileKey,
  //     contentType,
  //     userId
  //   );

  //   if (!success && message) {
  //     setIsProcessing(false);
  //     showErrorToast(message);
  //   } else {
  //     console.log("RESPONSE_DATA: ", responseData);
  //     // Assuming responseData contains the file blob or signed URL
  //     const fileData = responseData?.data;
  //     const fileDataType = responseData?.headers?.get("content-type");
  //     const contentDisposition = responseData?.headers?.get(
  //       "content-disposition"
  //     );
  //     console.log("FILE_DATA_TYPE: ", typeof fileData);
  //     console.log("FILE_TYPE: ", fileDataType);
  //     console.log("CONTENT_DESPOSITION: ", contentDisposition);

  //     let blob;

  //     // Handle if the data is returned as a base64 string (or similar string data)
  //     if (typeof fileData === "string") {
  //       // Convert base64 or string data into Blob for binary data files
  //       const binaryString = atob(fileData); // Decode the base64 string
  //       const arrayBuffer = new ArrayBuffer(binaryString.length);
  //       const view = new Uint8Array(arrayBuffer);
  //       for (let i = 0; i < binaryString.length; i++) {
  //         view[i] = binaryString.charCodeAt(i);
  //       }
  //       blob = new Blob([view], { type: fileDataType });
  //     } else if (fileData instanceof Blob) {
  //       blob = fileData;
  //     } else {
  //       showErrorToast("Unexpected file format. Please try again.");
  //       setIsProcessing(false);
  //       return;
  //     }

  //     console.log("BLOB: ", blob);

  //     setIsProcessing(false);
  //   }
  // };

  const handleDownload = async () => {
    try {
      setIsProcessing(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/files/download-file?fileKey=${fileKey}&contentType=${contentType}&userId=${userId}`
      );

      if (!response.ok) {
        useErrorToast("Something went wrong. Please try again later.");
        return;
      }

      // Get the file blob
      const blob = await response.blob();
      const contentDisposition = response?.headers?.get("content-disposition");
      const matches = contentDisposition?.match(/filename="(.+)"/);
      const name = matches && matches[1] ? matches[1] : "file.bin";

      // Create a download link
      const downloadLink = document.createElement("a");
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = name;

      // Trigger the download
      downloadLink.click();

      // Clean up the object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      useErrorToast("An unexpected error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button"
      className="absolute bottom-2 right-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:border-[#fff]/10 p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
      onClick={handleDownload}
    >
      {isProcessing ? (
        <ClipLoader color="#0e9f6e" size={16} />
      ) : (
        <Download className={`text-green-500 size-[16px]`} />
      )}
    </button>
  );
};

export default DownloadFile;
