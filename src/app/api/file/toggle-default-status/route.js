import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PATCH(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, fileKey } = body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.FILE.TOGGLE_DEFAULT_FILE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Get File Details
    const fileDetails = await FilesModel.findOne({ fileS3Key: fileKey }).exec();
    if (!fileDetails) {
      return errorResponse({
        message: "File not found.",
        status: 404,
      });
    }

    // NOTE Make sure the file type is image
    if (!fileDetails.fileType.startsWith("image/")) {
      return errorResponse({
        message: "This file type is not supported.",
        status: 400,
      });
    }

    // NOTE Make all other files default status false
    await FilesModel.updateMany(
      { isDefault: true },
      { $set: { isDefault: false } }
    );

    // NOTE Toggle default status
    const updatedFile = await FilesModel.findByIdAndUpdate(
      fileDetails._id,
      {
        $set: {
          isDefault: !fileDetails.isDefault,
        },
      },
      { new: true }
    ).exec();
    if (!updatedFile) {
      return errorResponse({
        message: "Failed to update the file. Try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: `${updatedFile.fileName} is now the default file. Refreshing to apply changes...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in changing file default status SERVER: `, error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
