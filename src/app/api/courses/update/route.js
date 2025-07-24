import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import TrainingCourseModel from "@/model/courses/TrainingCourse";
import TrainingCourseTranslationModel from "@/model/courses/TrainingCourseTranslation";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import mongoose from "mongoose";

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const { userId, slug, lang, _id, ...rest } = body;

    // Check invalid inputs
    if (!userId || !slug || !lang || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.COURSES.EDIT_COURSE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Get course details
    const existingCourseDetails = await TrainingCourseModel.findOne({ slug })
      .lean()
      .exec();
    if (!existingCourseDetails) {
      return errorResponse({
        message: "Course not found.",
        status: 404,
      });
    }

    // Only check for duplicates if title or slug are changed
    let newSlug;
    let newTitle;
    if (
      rest.title !== existingCourseDetails.title ||
      rest.slug !== existingCourseDetails.slug
    ) {
      const existingCourse = await TrainingCourseModel.find({
        $or: [{ slug: rest.slug }, { title: rest.title }],
        _id: { $ne: existingCourseDetails._id },
      }).exec();

      // Handle Duplicate Course Title (Add Random Characters)
      if (
        existingCourse &&
        existingCourse.some((course) => course.title === rest.title)
      ) {
        newTitle = `${rest.title} ${useTitleNanoid()}`;
      }

      // Handle Duplicate Course Slug (Add Random Characters) only in Lang = "en"

      if (
        existingCourse &&
        existingCourse.some((course) => course.slug === rest.slug) &&
        lang === "en"
      ) {
        newSlug = `${rest.slug}-${useSlugNanoid()}`;
      }
    }

    // Set course updated values object
    if (lang === "en") {
      const updatedCourseObj = {
        ...rest,
        title: newTitle || rest.title,
        slug: newSlug || rest.slug,
      };

      // Update the course
      const updatedCourse = await TrainingCourseModel.findByIdAndUpdate(
        existingCourseDetails._id,
        {
          $set: updatedCourseObj,
        },
        { new: true }
      ).exec();
      if (!updatedCourse) {
        return errorResponse({
          message: "Failed to update the course. Please try again later.",
          status: 500,
        });
      }
    }

    // Update Translations according to updated course id
    await TrainingCourseTranslationModel.findOneAndUpdate(
      {
        referenceId: existingCourseDetails._id.toString(),
        lang,
      },
      {
        $set: rest,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return successResponse({
      message: `${rest.title} course updated successfully. Refreshing...`,
      status: 200,
    });
  } catch (error) {
    console.log("Error in updating course SERVER: ", error);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
