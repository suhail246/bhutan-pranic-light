import dbConnect from "@/lib/db/dbConnect";
import LanguagesModel from "@/model/Language";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    // Get all languages
    const languages = await LanguagesModel.find({})
      .select("-__v -createdAt -updatedAt")
      .exec();

    return successResponse({
      status: 200,
      languageList: languages,
    });
  } catch (error) {
    console.log(`Error in getting all languages FE SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
