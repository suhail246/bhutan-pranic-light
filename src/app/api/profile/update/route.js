import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { _id, ...rest } = body;

    console.log(body);
    console.log(rest);

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    const existingUserDetails = await UserModel.findById(_id).exec();
    if (!existingUserDetails) {
      return errorResponse({
        message: "User does not exists.",
        status: 404,
      });
    }

    const extractCommingPassword = rest?.password || "";

    const updateProfileFields = {
      email: rest?.email || existingUserDetails.email,
      username: rest?.username || existingUserDetails.username,
      password:
        extractCommingPassword === ""
          ? existingUserDetails.password
          : await bcrypt.hash(extractCommingPassword, 10),
      picture: rest?.picture || existingUserDetails?.picture || null,
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      {
        $set: updateProfileFields,
      },
      { new: true }
    );
    if (!updatedUser) {
      return errorResponse({
        message: "Failed to update the user. Please try again later.",
        status: 500,
      });
    }

    return successResponse({
      message: `${updatedUser.username} has been updated successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log(`❌ Error in updating the profile SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Please try again later.",
      status: 500,
    });
  }
}
