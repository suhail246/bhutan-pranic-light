import dbConnect from "@/lib/db/dbConnect";
import TrainingCoursePackageModel from "@/model/courses/packages/CoursePackage";
import TrainingCoursePackageTranslationModel from "@/model/courses/packages/CoursePackageTranslation";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const lang = searchParams.get("lang");

    // Check invalid inputs
    if (!slug || !lang) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Fetch course details
    const courseDetails = await TrainingCourseModel.findOne({ slug })
      .select("-__v -isActive -isFeatured -createdAt -updatedAt")
      .lean()
      .exec();
    if (!courseDetails) {
      return errorResponse({
        message: "Course not found.",
        status: 404,
      });
    }

    // Fetch course translation details
    const courseTranslationDetails =
      await TrainingCourseTranslationModel.findOne({
        referenceId: courseDetails._id.toString(),
        lang,
      })
        .lean()
        .exec();

    // Utility function to deeply merge default data with translations
    function deepMerge(defaultData, translatedData) {
      if (!translatedData) return defaultData; // Return default data if translation doesn't exist

      return Object.keys(defaultData).reduce((acc, key) => {
        if (translatedData.hasOwnProperty(key)) {
          if (
            typeof defaultData[key] === "object" &&
            key !== "_id" &&
            !Array.isArray(defaultData[key])
          ) {
            acc[key] = deepMerge(defaultData[key], translatedData[key]); // Recursively merge nested objects
          } else {
            acc[key] = translatedData[key]; // Override with translated data
          }
        } else {
          acc[key] = defaultData[key]; // Keep default if translation is missing
        }

        return acc;
      }, {});
    }

    // Fetch default course English translation if requested language translation is missing
    let courseEnData = null;
    if (!courseTranslationDetails) {
      courseEnData = await TrainingCourseTranslationModel.findOne({
        referenceId: courseDetails._id.toString(),
        lang: "en",
      })
        .lean()
        .exec();
    }

    // Fetch all active packages for the course
    const coursePackagesDefaultData = await TrainingCoursePackageModel.find({
      courseId: courseDetails._id.toString(),
      isActive: true,
    })
      .select("-__v -courseId -createdAt -updatedAt")
      .lean();

    // Fetch package translations asynchronously
    const coursePackagesTranslationData = await Promise.all(
      coursePackagesDefaultData.map(async (eachPackage) => {
        const packageTranslatedData =
          await TrainingCoursePackageTranslationModel.findOne({
            referenceId: eachPackage._id.toString(),
            lang,
          })
            .select("-__v -_id -referenceId -lang")
            .lean();

        // Fetch default En translation if no translation exists
        let packageEnData = null;
        if (!packageTranslatedData) {
          packageEnData = await TrainingCoursePackageTranslationModel.findOne({
            referenceId: eachPackage._id.toString(),
            lang: "en",
          })
            .select("-__v -_id -referenceId -lang")
            .lean();
        }

        // Merge package details with translation
        return deepMerge(eachPackage, packageTranslatedData || packageEnData);
      })
    );

    // Merge course details with translation (fallback to English if necessary)
    const mergedCourseDetails = deepMerge(
      courseDetails,
      courseTranslationDetails || courseEnData
    );

    // Sort the packages list by orderNumber
    const sortedPackages = coursePackagesTranslationData.sort(
      (a, b) => parseInt(b.orderNumber) - parseInt(a.orderNumber)
    );

    return successResponse({
      status: 200,
      courseData: mergedCourseDetails,
      packagesData: sortedPackages,
    });
  } catch (error) {
    console.log(`Error in getting course details FE SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
