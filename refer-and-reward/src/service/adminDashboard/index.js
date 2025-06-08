import axios from "axios";
import { getToken } from "../authUtils";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AdminApiServices = {
  getAllUserList,
};

async function getAllUserList(request, config = {}) {
  try {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return await axios.get(
      `${API_URL}/api/admin/users?search=${request.search}&sortBy=${
        request.sortby ? request.sortby : "id"
      }&sortOrder=${request.sortdir ? request.sortdir : "asc"}&page=${
        request.page
      }&pageSize=${request.perpage}`,
      config
    );
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    throw new Error("Invalid token or authentication failure");
  }
}
