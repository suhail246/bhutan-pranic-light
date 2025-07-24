import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import TestimonialModel from "@/model/testimonial/Testimonial";
import TestimonialTranslationModel from "@/model/testimonial/TestimonialTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const testimonialLists = await TestimonialModel.find()
      .populate({
        path: "image",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -name -designation -message")
      .sort({ createdAt: -1 })
      .exec();

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const testimonialIds = testimonialLists.map(
      (testimonial) => testimonial._id
    );
    const translations = await TestimonialTranslationModel.find({
      referenceId: { $in: testimonialIds },
    })
      .select("-__v -createdAt -updatedAt -_id")
      .exec();

    // Map translations by testimonial ID
    const translationMap = {};
    translations.forEach(
      ({ referenceId, lang, name, designation, message }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          name,
          designation,
          message,
        };
      }
    );

    // Process testimonial and attach translations
    const formattedTstimonialLists = testimonialLists.map((eachTestimonial) => {
      const testimonialData = eachTestimonial.toObject();

      // Initialize name, designation and message as objects
      testimonialData.name = {};
      testimonialData.designation = {};
      testimonialData.message = {};

      // Fetch translations for the current testimonial
      const translations = translationMap[eachTestimonial._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations for name, designation and message
            testimonialData.name[lang] = translations[lang].name || "";
            testimonialData.designation[lang] =
              translations[lang].designation || "";
            testimonialData.message[lang] = translations[lang].message || "";
          }
        }
      }

      return testimonialData;
    });

    return successResponse({
      status: 200,
      testimonials: formattedTstimonialLists,
    });
  } catch (error) {
    console.log(
      `Error in getting all testimonials FE SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
