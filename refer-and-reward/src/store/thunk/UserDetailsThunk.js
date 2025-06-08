import { getToken } from "@/service/authUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserListStatus } from "../slices/UserSlice";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// First, create the thunk
export const fetchUserDetails = createAsyncThunk(
  "users/fetchUser",
  async (_, { getState, rejectWithValue, dispatch }) => {
    dispatch(
      setUserListStatus({
        status: "LOADING",
        message: "",
      })
    );
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/api/detail`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for a successful response
      if (response.status === 200) {
        const data = await response.data;

        const {
          _id,
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
          referralCode,
          role,
          createdAt,
          updatedAt,
        } = data.data;

        // Extract data from the response
        localStorage.setItem("Id", JSON.stringify(_id));
        localStorage.setItem("referralCode", JSON.stringify(referralCode));
        dispatch(
          setUserListStatus({
            status: "SUCCESS",
            message: response.data.message,
          })
        );
        return {
          _id,
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
          referralCode,
          role,
          createdAt,
          updatedAt,
        };
      } else {
        // Handle the case where the response status is not 200
        return rejectWithValue(response.data); // Assuming the error information is in the response data
      }
    } catch (error) {
      // Handle network or other errors
      dispatch(
        setUserListStatus({
          status: "ERROR",
          message: error.message,
        })
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
