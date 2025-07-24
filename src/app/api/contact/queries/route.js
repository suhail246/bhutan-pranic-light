import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import AllContactQueryMessageModel from "@/model/contacts/ContactQueryMessage";
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
      requiredPermissions: [PERMISSIONS.CONTACTS.VIEW_ALL_CONTACT_QUERIES],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // Escape special characters - (), ., *, +, ?, [, ], ^, $, \ -> Prevents regex injection attacks. More info: https://www.freeformatter.com/regexp-escape.html [Ex - hello(world) = hello\(world\)]. Ensures your search strings behave as intended in a regular expression. Reduces runtime errors caused by invalid regex patterns.
    const searchQuery = escapeStringRegexp(search || "");
    const query = {
      ...(searchQuery && {
        $or: [
          { firstName: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
          { problemDescription: { $regex: searchQuery, $options: "i" } },
        ],
      }),
    };

    // Get all queris
    const queriesList = await AllContactQueryMessageModel.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const paginationTotalContactQueries =
      await AllContactQueryMessageModel.countDocuments(query).exec();
    const totalItemsCount =
      await AllContactQueryMessageModel.countDocuments().exec();

    // Pagination
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize,
      totalPages: Math.ceil(paginationTotalContactQueries / pageSize),
      totalItemsPerQuery: paginationTotalContactQueries,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      queries: queriesList,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all contact queries SERVER: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
