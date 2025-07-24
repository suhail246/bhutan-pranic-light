import dbConnect from "@/lib/db/dbConnect";
import WebsiteSettingsModel from "@/model/WebsiteSettings";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const settingsList = await WebsiteSettingsModel.find()
      .select("key value lang")
      .exec();

    return successResponse({
      status: 200,
      settingsList,
    });
  } catch (error) {
    console.log(`Error in getting the website settings FE SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
