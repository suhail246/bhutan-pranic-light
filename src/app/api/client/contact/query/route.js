import dbConnect from "@/lib/db/dbConnect";
import AllContactQueryMessageModel from "@/model/contacts/ContactQueryMessage";
import { ContactQueryMessageSchema } from "@/schemas";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      problemDescription,
      lang,
    } = body;

    // VALIDATE the request data
    const validatedFields = validateSchema(ContactQueryMessageSchema, {
      firstName,
      lastName,
      mobileNumber,
      email,
      problemDescription,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new contact query and save into DB
    const newContactQuery = new AllContactQueryMessageModel({
      firstName,
      lastName,
      mobileNumber,
      email,
      problemDescription,
    });

    const savedContactQuery = await newContactQuery.save();

    if (!savedContactQuery) {
      return errorResponse({
        message:
          lang === "en"
            ? "An unexpected error occurred while saving the contact query"
            : "حدث خطأ غير متوقع أثناء حفظ استعلام جهة الاتصال",
        status: 400,
      });
    }

    return successResponse({
      message:
        lang === "en"
          ? "Query submitted successfully"
          : "تم إرسال الاستعلام بنجاح",
      status: 201,
    });
  } catch (error) {
    console.log(`❌ Error in submitting contact query FE SERVER: ${error}`);

    return errorResponse({
      message:
        lang === "en"
          ? "An unexpected error occurred Internal server error"
          : "حدث خطأ غير متوقع خطأ داخلي في الخادم",
      status: 500,
    });
  }
}
