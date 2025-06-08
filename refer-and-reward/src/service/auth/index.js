import axios from "axios";
import Router from "next/router";
import { clearToken, getToken } from "../authUtils";
import { clearState } from "@/store/slices/UserSlice";
// import { get, post } from "../../helpers/api/api_helpers";
//apply base url for axios
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let localStorageToken = "";

if (typeof window !== "undefined") {
  // Perform localStorage action
  localStorageToken = localStorage.getItem("accessToken");
}
export const authService = {
  login,
  logout,
  register,
  //   refresh,
  //   forgotPassword,
  //   resetPassword,
  //   updateProfile,
  //   getProfile,
};

async function login(request) {
  const payload = { email: request.email, password: request.password };
  return await axios.post(`${API_URL}/api/auth/login`, payload);
}

async function register(request) {
  const payload = {
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    password: request.password,
    phone: request.phone,
    address: request.address,
    promocode: request.promocode,
  };
  return await axios.post(`${API_URL}/api/auth/signup`, payload);
}

async function logout() {
  try {
    const token = getToken();

    if (token) {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {}, // Empty object for the request data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear token and redirect to login
      clearToken();
      localStorage.removeItem("Id");
      localStorage.removeItem("referralCode");
      localStorage.removeItem("firstName");
      Router.push("/");
      clearState();
      return response;
    } else {
      // If no token, redirect to login without making the request
      Router.push("/");
    }
  } catch (error) {
    // Handle any errors from the server
    console.error("Error logging out", error);
    throw error;
  }
}
