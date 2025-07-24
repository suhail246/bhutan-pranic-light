import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import PageCMSModel from "@/model/cms/PageCMS";
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
    const page = parseInt(searchParams.get("page"));
    const pageSize = parseInt(searchParams.get("pageSize"));

    // Validate Category and User IDs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CMS_SETUP.VIEW_ALL_PAGES],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // NOTE Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { pageName: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }),
    };

    const cmsPageList = await PageCMSModel.find(query)
      .select(
        "-__v -description -metaTitle -metaImage -metaKeywords -metaDescription -createdAt -updatedAt"
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Pagination
    const paginationTotalPages =
      await PageCMSModel.countDocuments(query).exec();
    const totalItemsCount = await PageCMSModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalPages / pageSize),
      totalItemsPerQuery: paginationTotalPages,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      cmsPages: cmsPageList,
      paginationData,
    });
  } catch (error) {
    console.log(`Error in getting all cms pages SERVER: ${error.message}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
