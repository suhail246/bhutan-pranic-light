import dbConnect from "@/lib/db/dbConnect";
import AllContactsModel from "@/model/contacts/Contacts";
import ContactTranslationModel from "@/model/contacts/ContactTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Check invalid inputs
    if (!slug) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Get common contact details
    const contactCommonDetails = await AllContactsModel.findOne({ slug })
      .select(
        "-__v -branchName -branchAddress -openingHours.labels -createdAt -updatedAt"
      )
      .populate({
        path: "metaImage",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .exec();
    if (!contactCommonDetails) {
      return errorResponse({
        message: "Contact not found.",
        status: 404,
      });
    }

    // Get all types of languages ["en", "ar", ...]
    const languagesList = await LanguagesModel.find({
      status: true,
    })
      .select("code")
      .exec();

    // Fetch translations and format them as { "en": { ...translationData }, "ar": {}, ... }
    const details = {};

    await Promise.all(
      languagesList.map(async (language) => {
        const translation = await ContactTranslationModel.findOne({
          referenceId: contactCommonDetails._id.toString(),
          lang: language.code,
        })
          .select("-referenceId -__v -createdAt -updatedAt")
          .exec();

        details[language.code] = translation || {}; // Empty object if null
      })
    );

    return successResponse({
      status: 200,
      contactDetails: contactCommonDetails,
      translationData: details,
    });
  } catch (error) {
    console.log(`Error in getting contact details SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
