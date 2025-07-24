import bcrypt from "bcryptjs";

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { ResetPasswordSchema } from "@/schemas";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { resetPasswordCode, newPassword, confirmNewPassword } = body;

    // VALIDATE the request data
    const validatedFields = validateSchema(ResetPasswordSchema, body);
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // NOTE If RESET_CODE is present in User Model
    const userDetails = await UserModel.findOne({
      forgetPasswordCode: resetPasswordCode,
      forgetPasswordCodeExpiry: { $gte: Date.now() }, // handle 1hr time expiry
    }).exec();
    if (!userDetails) {
      return errorResponse({
        message:
          "Invalid or expired password reset code. Please request a new one.",
        status: 400,
      });
    }

    // NOTE Compare the new password with the old password
    const passwordCompareStatus = bcrypt.compareSync(
      newPassword,
      userDetails.password
    );
    if (passwordCompareStatus) {
      return errorResponse({
        message:
          "New password cannot be the same as the current password. Please choose a different one.",
        status: 400,
      });
    }

    // NOTE HASHED_NEW_PASSWORD and save in DB AND remove the reset code and expiry
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.updateOne(
      { _id: userDetails._id },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          forgetPasswordCode: "",
          forgetPasswordCodeExpiry: "",
        },
      }
    );

    // NOTE SUCCESS_RESPONSE
    return successResponse({
      message: `Password has been successfully reset. Please log in with your new password.`,
      status: 200,
    });
  } catch (error) {
    console.error(`Password reset error SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
