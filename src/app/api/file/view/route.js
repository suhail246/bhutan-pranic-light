import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import FilesModel from "@/model/Files";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import escapeStringRegexp from "escape-string-regexp";
import mongoose from "mongoose";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "24", 10);
    const selectedFileType = searchParams.get("selectedFileType");

    // NOTE Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [
        PERMISSIONS.POST.ADD_POST,
        PERMISSIONS.POST.EDIT_POST,
        PERMISSIONS.CATEGORY.ADD_CATEGORY,
        PERMISSIONS.CATEGORY.EDIT_CATEGORY,
        PERMISSIONS.NEWS.ADD_NEWS_ARTICLE,
        PERMISSIONS.NEWS.EDIT_NEWS_ARTICLE,
        PERMISSIONS.NEWS_CATEGORY.ADD_NEWS_CATEGORY,
        PERMISSIONS.NEWS_CATEGORY.EDIT_NEWS_CATEGORY,
        PERMISSIONS.CONTACTS.ADD_CONTACT,
        PERMISSIONS.CONTACTS.EDIT_CONTACT,
        PERMISSIONS.TESTIMONIAL.ADD_TESTIMONIAL,
        PERMISSIONS.TESTIMONIAL.EDIT_TESTIMONIAL,
        PERMISSIONS.CAREER.ADD_CAREER,
        PERMISSIONS.CAREER.EDIT_CAREER,
        PERMISSIONS.COURSES.ADD_COURSE,
        PERMISSIONS.COURSES.EDIT_COURSE,
        PERMISSIONS.PACKAGES.ADD_PACKAGE,
        PERMISSIONS.PACKAGES.EDIT_PACKAGE,
        PERMISSIONS.CMS_SETUP.ADD_PAGE,
        PERMISSIONS.CMS_SETUP.EDIT_PAGE,
        PERMISSIONS.CMS_SETUP.EDIT_PAGE_SECTIONS,
        PERMISSIONS.WEBSITE_SETUP.HEADER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.FOOTER_SETUP,
        PERMISSIONS.WEBSITE_SETUP.GENERAL_SETTINGS,
        PERMISSIONS.FILE.VIEW_ALL_FILES,
      ],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Map selected file types
    let actualFileType;

    switch (selectedFileType) {
      case "images":
        actualFileType = { fileType: { $regex: "^image/" } }; // Match FILE type starting with "image/"
        break;
      case "videos":
        actualFileType = { fileType: { $regex: "^video/" } };
        break;
      case "pdf":
        actualFileType = { fileType: "application/pdf" };
        break;
      case "other":
        actualFileType = {
          $and: [
            { fileType: { $not: { $regex: "^image/" } } },
            { fileType: { $not: { $regex: "^video/" } } },
            { fileType: { $ne: "application/pdf" } },
          ],
        };
        break;
      default:
        actualFileType = null; // Ignore unsupported types
        break;
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const query = {};
    if (search) {
      const searchQuery = escapeStringRegexp(search);
      query.$or = [
        { fileName: { $regex: searchQuery, $options: "i" } },
        { fileType: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (actualFileType) {
      query.$or = [...(query.$or || []), actualFileType];
    }

    // Fetch files with pagination
    const [filesList, totalFiles, allFilesList] = await Promise.all([
      FilesModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
      FilesModel.countDocuments(query).exec(),
      FilesModel.find().exec(),
    ]);

    // Prepare pagination data
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(totalFiles / pageSize),
      totalFiles,
    };

    return successResponse({
      status: 200,
      files: filesList,
      allFiles: allFilesList,
      paginationData,
    });
  } catch (error) {
    console.log(`Error in getting all files SERVER: ${error.stack || error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
