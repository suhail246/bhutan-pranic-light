import dbConnect from "@/lib/db/dbConnect";
import CareerModel from "@/model/career/Career";
import CareerTranslationModel from "@/model/career/CareerTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const careerLists = await CareerModel.find()
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -jobName -jobDescripton")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const careerIds = careerLists.map((career) => career._id);
    const translations = await CareerTranslationModel.find({
      referenceId: { $in: careerIds },
    })
      .select("-__v -createdAt -updatedAt -_id")
      .exec();

    // Map translations by career ID
    const translationMap = {};
    translations.forEach(({ referenceId, lang, jobName, jobDescripton }) => {
      if (!translationMap[referenceId]) {
        translationMap[referenceId] = {};
      }
      translationMap[referenceId][lang] = {
        jobName,
        jobDescripton,
      };
    });

    // Process career and attach translations
    const formattedCareerLists = careerLists.map((eachCareer) => {
      const careerData = eachCareer.toObject();

      // Initialize jobName, jobDescripton as objects
      careerData.jobName = {};
      careerData.jobDescripton = {};

      // Fetch translations for the current career
      const translations = translationMap[eachCareer._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for name, designation and message
            careerData.jobName[lang] = translations[lang].jobName || "";
            careerData.jobDescripton[lang] =
              translations[lang].jobDescripton || "";
          }
        }
      }

      return careerData;
    });

    return successResponse({
      status: 200,
      careers: formattedCareerLists,
    });
  } catch (error) {
    console.log(
      `Error in getting all careers FE SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
