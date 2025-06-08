// authUtils.js

// Get token from local storage
export const getToken = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("accessToken"));
  }
  return null;
};

// Set token to local storage
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", JSON.stringify(token));
  }
};

// Clear token from local storage
export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};
