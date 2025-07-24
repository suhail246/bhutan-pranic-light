import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { s3DeleteFile } from "@/lib/s3/core";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, name, key, type, size, url } = body;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !name ||
      !key ||
      !type ||
      !size ||
      !Number.isInteger(parseInt(size)) ||
      !url
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.FILE.ADD_FILE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE File exists or not. If exists, delete it from AWS S3
    const fileExists = await FilesModel.findOne({
      fileName: name,
      fileType: type,
      fileSize: parseInt(size),
    });
    if (fileExists) {
      const { success, error } = await s3DeleteFile(key);
      if (success) {
        return errorResponse({
          message: `${name} already exists.`,
          status: 400,
        });
      } else {
        return errorResponse({
          message: error,
          status: 400,
        });
      }
    } else {
      // NOTE Create new file object
      const newFileDetials = {
        userId: authCheck.user._id.toString(),
        fileS3Key: key,
        fileName: name,
        fileType: type,
        fileSize: parseInt(size),
        fileUrl: url,
      };

      const newFile = new FilesModel(newFileDetials);
      await newFile.save();

      return successResponse({
        message: `${newFile.fileName} has been uploaded successfully.`,
        status: 201,
      });
    }
  } catch (error) {
    console.log(`Error in storing file SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
