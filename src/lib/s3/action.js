import { getUploadParams } from "./core";

// 1 KB = 1024 bytes
// 1 MB = 1024 * 1024 bytes
// 500 MB = 500 * 1024 * 1024 bytes
const MAX_FILES_SIZES = {
  images:
    parseInt(process.env.NEXT_PUBLIC_UPPY_MAX_IMAGE_FILE_SIZE_MB || "10") *
    1024 *
    1024, // 10 MB
  videos:
    parseInt(process.env.NEXT_PUBLIC_UPPY_MAX_VIDEO_FILE_SIZE_MB || "50") *
    1024 *
    1024, // 50 MB
  pdf:
    parseInt(process.env.NEXT_PUBLIC_UPPY_MAX_PDF_FILE_SIZE_MB || "20") *
    1024 *
    1024, // 20 MB
  other:
    parseInt(process.env.NEXT_PUBLIC_UPPY_MAX_OTHER_FILE_SIZE_MB || "100") *
    1024 *
    1024, // 100 MB
};

// Helper function to determine file type category
const getFileTypeCategory = (contentType) => {
  switch (contentType) {
    case contentType.startsWith("image/"):
      return "images";
      break;
    case contentType.startsWith("video/"):
      return "videos";
      break;
    case contentType === "application/pdf":
      return "pdf";
      break;
    default:
      return "other"; // For files like Word, ZIP, etc.
      break;
  }
};

export const getS3UploadParams = async (
  fileName,
  contentType,
  sizeBytes,
  userId
) => {
  // Determine the file type category (image, video, pdf, other)
  const fileTypeCategory = getFileTypeCategory(contentType);

  // Validate file size based on category
  const maxSize = MAX_FILES_SIZES[fileTypeCategory];

  // Validate file size
  if (sizeBytes > maxSize) {
    throw new Error(
      `File size exceeds the maximum limit of ${maxSize / (1024 * 1024)}MB`
    );
  }

  // If validation passes, proceed with getting upload params
  const response = await getUploadParams({ fileName, contentType });

  return response;
};
