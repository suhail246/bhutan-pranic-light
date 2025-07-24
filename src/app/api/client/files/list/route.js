import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    // Fetch files
    const filesList = await FilesModel.find()
      .select("-userId -__v -createdAt -updatedAt")
      .exec();

    return successResponse({
      status: 200,
      files: filesList,
    });
  } catch (error) {
    console.log(
      `Error in getting all files FE SERVER: ${error.stack || error}`
    );

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
