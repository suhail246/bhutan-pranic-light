import "server-only";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const verifySession = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    return {
      userId: session.user._id,
      role: session.user.role,
    };
  } catch (error) {
    console.error("🚨 Error verifying session: ", error);
    return null;
  }
};
