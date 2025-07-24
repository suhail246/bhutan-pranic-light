import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

// NOTE Store New file in AWS and generate URLs
export const getUploadParams = async ({ fileName, contentType }) => {
  try {
    let mediaType = contentType.split("/");
    let fileExtension = mediaType[1];

    // If SVG with mimetype like "image/svg+xml", strip "+xml"
    if (mediaType[0] === "image" && fileExtension.includes("svg")) {
      fileExtension = fileExtension.replace(/\+xml$/, "");
    }

    const timestamp = Date.now();
    const sanitizedName = path.parse(fileName).name.replace(/\s+/g, "-"); // file_name.extension -> file-name
    const fullFileName = `${sanitizedName}-${timestamp}.${fileExtension}`;
    const fileKey = `bhutan-pranic/images/${fullFileName}`;

    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: bucketName || "",
      Key: fileKey,
      Conditions: [
        [
          "content-length-range",
          0,
          parseInt(process.env.NEXT_PUBLIC_UPPY_MAX_FILE_SIZE_MB || "500") *
            1024 *
            1024,
        ],
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        key: fileKey,
        "Content-Type": contentType,
      },
      Expires: parseInt(
        process.env.NEXT_PUBLIC_UPPY_PRESIGNED_URL_EXPIRES_IN_SECONDS || "600"
      ), // Seconds before the presigned post expires. 3600 by default.
    });

    // console.log(
    //   "Presigned URL generated for upload ",
    //   JSON.stringify(fields, null, 2)
    // ); // TODO REMOVE

    return {
      url,
      fields,
      fileKey,
    };
  } catch (error) {
    console.log(`Error in getting upload params CLIENT: ${error}`);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Unknown error" };
  }
};

// NOTE DELETE PERTICULAR FILE in AWS S3
export const s3DeleteFile = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "",
      Key: key,
    });

    await s3Client.send(command);

    return { success: true };
  } catch (error) {
    console.log(`Error in deleting file in S3 CLIENT: ${error}`);
    return {
      success: false,
      error: "Failed to delete file from S3 Bucket.",
    };
  }
};

// NOTE DOWNLOAD FILE in AWS S3
export const s3DownloadFile = async (fileKey) => {
  try {
    // Prepare the S3 upload params
    const headCommand = new HeadObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "",
      Key: fileKey,
    });

    // Download the file from S3
    const headResponse = await s3Client.send(headCommand);
    const size = headResponse.ContentLength; // This is the file size in bytes

    // Now, generate the download URL
    const getCommand = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "",
      Key: fileKey,
    });

    const url = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 3600, // 1 hours
    });

    return { url, size };
  } catch (error) {
    console.log(`Error in downloading image in AWS S3 CLIENT: ${error}`);
    return {
      error:
        "Something went wrong in downloading image in AWS S3. Please try again later.",
    };
  }
};
