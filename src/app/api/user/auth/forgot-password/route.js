import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { EmailSchema } from "@/schemas";
import { sendEmail } from "@/utils/mailer";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";

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

    // NOTE GET the user details by provided forgotPasswordEmail
    const userDetails = await UserModel.findOne({ email }).exec();
    if (!userDetails) {
      return errorResponse({
        message:
          "The provided email address is not registered. Please use a valid registered email address.",
        status: 400,
      });
    }

    // NOTE Send RESET LINK to the user email
    const emailResponse = await sendEmail({
      email: userDetails.email,
      emailType: "RESET",
      username: userDetails.username,
      userId: userDetails._id,
    });

    // NOTE RESPONSE send email with error
    if (!emailResponse.success) {
      return errorResponse({
        message:
          "We encountered an issue while sending the reset password email. Please try again later.",
        status: 400,
      });
    }

    return successResponse({
      message: `A password reset code has been successfully sent to your email address. Please check your inbox.`,
      status: 200,
    });
  } catch (error) {
    console.error(`Error forgot password send email error: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
