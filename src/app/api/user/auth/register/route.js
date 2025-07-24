import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { RegistrationSchema } from "@/schemas";
import { sendEmail } from "@/utils/mailer";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";

export async function POST(request) {
  await dbConnect(); // INFO: Database connection

  try {
    const body = await request.json();
    const { email, username, password, confirmPassword } = body;

    // VALIDATE the request data
    const validatedFields = validateSchema(RegistrationSchema, body);
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // NOTE: EXISTENCE_CHECK if user is already existing by email address but not verified
    const existingUserByEmail = await UserModel.findOne({
      email,
    }).exec();
    if (existingUserByEmail) {
      // NOTE Check if existing user is verified
      if (existingUserByEmail.isVerified) {
        return errorResponse({
          message: "An account with this email already exists. Please log in.",
          status: 400,
        });
      } else {
        // NOTE Check if existing user is not verified, then modify the user details

        existingUserByEmail.username = username;
        existingUserByEmail.password = password;

        const saveUpdatedUser = await existingUserByEmail.save();

        // NOTE Send verification email
        const emailResponse = await sendEmail({
          email,
          emailType: "VERIFY",
          username,
          userId: saveUpdatedUser._id,
        });

        // NOTE Response verification email with error
        if (!emailResponse.success) {
          return errorResponse({
            message:
              "Failed to send verification email. Please try again later.",
            status: 400,
          });
        }

        // NOTE Response verification email with success message
        const { password: pass, ...rest } = saveUpdatedUser._doc; // removing password

        return successResponse({
          message:
            "Registration successful. Please check your email to verify your account.",
          status: 201,
          userData: rest,
        });
      }
    } else {
      // NOTE Create a new user

      // NOTE Create new user
      const newUser = new UserModel({
        email,
        username,
        password,
      });

      // NOTE Save the new user in DB
      const saveNewUser = await newUser.save();

      // NOTE Send verification email
      const emailResponse = await sendEmail({
        email,
        emailType: "VERIFY",
        username,
        userId: saveNewUser._id,
      });

      // NOTE Response verification email with error
      if (!emailResponse.success) {
        return errorResponse({
          message: "Failed to send verification email. Please try again later.",
          status: 400,
        });
      }

      // NOTE Response verification email with success message
      const { password: pass, ...rest } = saveNewUser._doc; // removing password

      return successResponse({
        message:
          "Registration successful. Please check your email to verify your account.",
        status: 201,
        userData: rest,
      });
    }
  } catch (error) {
    console.error(`Error registering user SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
