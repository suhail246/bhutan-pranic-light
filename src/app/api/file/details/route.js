import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const type = searchParams.get("type");
    const size = searchParams.get("size");

    // NOTE Validate Category and User IDs
    if (
      !userId ||
      !name ||
      !type ||
      !size ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !Number.isInteger(parseInt(size))
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.FILE.FILE_DETAILS],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get file details
    const fileDetails = await FilesModel.find({
      fileName: name,
      fileType: type,
      fileSize: parseInt(size),
    }).exec();

    return successResponse({
      status: 200,
      file: fileDetails,
    });
  } catch (error) {
    console.log(`Error from get file info SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
