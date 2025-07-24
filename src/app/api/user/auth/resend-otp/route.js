import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { EmailSchema } from "@/schemas";
import { sendEmail } from "@/utils/mailer";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email } = body;

    // VALIDATE the request data
    const validatedFields = validateSchema(EmailSchema, body);
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // INFO: Fetch the user details
    const userDetails = await UserModel.findOne({ email }).exec();
    if (!userDetails) {
      return errorResponse({
        message:
          "No account found with this email address. Please provide your registered email address.",
        status: 400,
      });
    }

    // INFO: Send verification email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESEND",
      username: userDetails.username,
      userId: userDetails._id,
    });

    // INFO: Response send email with error
    if (!emailResponse.success) {
      return errorResponse({
        message: "There was an issue sending the OTP. Please try again later.",
        status: 400,
      });
    }

    // INFO: Response send email with success
    return NextResponse.json(
      {
        success: true,
        message:
          "An OTP has been successfully sent to your registered email address.",
      },
      { status: 200 }
    );
    return successResponse({
      message: `An OTP has been successfully sent to your registered email address.`,
      status: 201,
    });
  } catch (error) {
    console.error(`Error resending otp SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
