import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { otp } = reqBody;

    // INFO: Handle not getting token
    if (!otp) {
      return errorResponse({
        message: "Verification code is required to proceed.",
        status: 404,
      });
    }

    // NOTE: If token is present ****
    const userDetails = await UserModel.findOne({
      verifyCode: otp,
      verifyCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    }).exec();

    if (!userDetails) {
      return errorResponse({
        message:
          "Invalid OTP or the OTP has expired. Please request a new one.",
        status: 400,
      });
    }

    await UserModel.updateOne(
      { _id: userDetails._id },
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          verifyCode: "",
          verifyCodeExpiry: "",
        },
      }
    );

    return successResponse({
      message:
        "Email verification successful. Please login using your credentials.",
      status: 200,
    });
  } catch (error) {
    console.error(`Error verifying user account: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
