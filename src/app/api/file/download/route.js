import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { s3DownloadFile } from "@/lib/s3/core";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");
    const contentType =
      searchParams.get("contentType") || "application/octet-stream";
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !fileKey) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.FILE.DOWNLOAD_FILE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get the file details
    const fileRecord = await FilesModel.findOne({
      fileS3Key: fileKey,
    });
    if (!fileRecord) {
      return errorResponse({
        message: "File not found.",
        status: 404,
      });
    }

    // NOTE Image AWS key
    const key = fileRecord.fileS3Key;

    // NOTE Perfome download functionality in AWS S3
    const { url, size, error } = await s3DownloadFile(key);
    if (!url || !size || error) {
      return errorResponse({
        message: error,
        status: 404,
      });
    }

    // NOTE: You can directly return the signedUrl, but we are fetching the files
    // from S3 using the signed URL to avoid any unauthorized access to the files.
    const response = await fetch(url);
    // Check if the response is valid
    if (!response.ok) {
      return errorResponse({
        message: "Failed to fetch the file from the signed URL.",
        status: response.status,
      });
    }

    // Extract file stream
    const fileStream = response.body;
    // Determine content type and default to application/octet-stream
    const detectedContentType =
      contentType ||
      response.headers.get("Content-Type") ||
      "application/octet-stream";

    // Stream the file back to the client
    return new NextResponse(fileStream, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60", // Catch the data for 60 sec
        "Content-Type": detectedContentType,
        "Content-Length": size,
        "Content-Disposition": `attachment; filename="${fileRecord.fileName}"`,
      },
    });
  } catch (error) {
    console.log(`Error in downloading perticular image SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
