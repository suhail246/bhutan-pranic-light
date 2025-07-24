import { API_ENDPOINTS } from "@/app/assets/data/apiEndPointData";
import axios from "axios";

export const handleSessionLogout = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}${API_ENDPOINTS.LOGOUT_USER}`
    );

    if (response.data.success && response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log("Error in logout: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again later.",
    };
  }
};
