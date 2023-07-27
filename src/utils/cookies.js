// utils/cookies.js
import cookie from "js-cookie";

export const setAuthTokenCookie = (token) => {
  console.log("in cookies", token);
  cookie.set("broadleafToken", token, {
    expires: 7, // Set an expiration time for the cookie in days
    // secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
    // sameSite: "strict", // Set the sameSite attribute for added security
  });
};
