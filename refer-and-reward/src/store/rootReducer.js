import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/UserSlice";

// import SignUpReducer from "./slices/SignUpSlice";
// import loginReducer from "./slices/loginSlice";

export const rootReducer = combineReducers({
  user: userReducer,
});
