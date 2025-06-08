import axios from "axios";
import { getToken } from "../authUtils";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UserDetailsService = {
  getOne,
};

async function getOne(request, config = {}) {
  try {
    const token = getToken();
    let localStorageId = "";
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorageId = localStorage.getItem("Id");
    }
    const userId = JSON.parse(localStorageId);

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return await axios.get(
      `${API_URL}/api/user/referred/${userId}?search=${request.search}&sortBy=${
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
