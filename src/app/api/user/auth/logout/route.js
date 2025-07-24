import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { cacheKeyNames } from "@/app/assets/data/cacheKeysData";
import { deleteCache } from "@/lib/redis/actions";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { getServerSession } from "next-auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?._id) {
    return errorResponse({
      message: "Unauthenticated user.",
      status: 401,
    });
  }

  try {
    const { cacheStatus, errorMessage } = await deleteCache(
      `${cacheKeyNames.SESSION_USER_DETAILS}-${session.user._id}`
    );

    if (cacheStatus) {
      return successResponse({
        message: "Logging out...",
        status: 200,
      });
    } else {
      return errorResponse({
        message: errorMessage,
        status: 500,
      });
    }
  } catch (error) {
    console.log(`Error in logout SERVER: ${error}`);

    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
