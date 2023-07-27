// utils/tokenManager.js
let authToken = null;

export const setAuthToken = (token) => {
  console.log("setAuthToken");
  console.log("token", token);
  authToken = token;
};

export const getAuthToken = () => {
  console.log("here", authToken);
  return authToken;
};
