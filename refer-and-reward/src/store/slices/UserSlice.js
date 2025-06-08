import { createSlice } from "@reduxjs/toolkit";

import { fetchUserDetails } from "../thunk/UserDetailsThunk";
const apiInitialStatus = {
  status: "LOADING",
  message: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    status: "idle",
    message: "",
    userListStatus: apiInitialStatus,
  },
  reducers: {
    clearState: (state) => {
      state.data = [];
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.message = "";
      state.data = [];
      return state;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.errorMessage = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setUserListStatus: (state, action) => {
      state.userListStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export const { clearState, setStatus, setMessage, setUserListStatus } =
  userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user.data.data;
