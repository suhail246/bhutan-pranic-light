import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
import { CareerSchema } from "@/schemas";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const {
      userId,
      jobName,
      jobDescripton,
      jobVacancies,
      orderNumber,
      applyLink,
      image,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
    } = body;

    // Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CAREER.ADD_CAREER],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(CareerSchema, {
      jobName,
      jobDescripton,
      jobVacancies,
      orderNumber,
      applyLink,
      image,
      metaTitle,
      metaImage,
      metaKeywords,
      metaDescription,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Create a new career and save into DB
    const newCareer = new CareerModel({
      jobName,
      jobDescripton,
      jobVacancies,
      orderNumber: orderNumber || "1",
      applyLink,
      image: image ? image : null,
      metaTitle,
      metaImage: metaImage ? metaImage : null,
      metaKeywords,
      metaDescription,
    });
    const savdCareer = await newCareer.save();

    // Store jobName, jobDescripton in the Translation collection with lang = "en" default
    const createEnTranslation = await CareerTranslationModel.findOneAndUpdate(
      {
        referenceId: savdCareer._id.toString(),
        lang: "en",
      },
      {
        $set: {
          jobName,
          jobDescripton,
        },
      },
      { new: true, upsert: true }
    );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving career data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: `${savdCareer?.jobName || "Anonymous"} career created successfully.`,
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating career SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
