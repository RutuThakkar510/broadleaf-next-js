// server/middleware/auth.js
import { setAuthTokenCookie } from "../../utils/cookies";
import axios from "axios";

// Simulate fetching the token from server-side API (Replace this with actual logic)
const fetchAuthTokenFromServer = async () => {
  const { data } = await axios.post(
    "https://hospitality.admin.legends.blcdemo.com/auth/oauth/token?grant_type=client_credentials",
    {},
    {
      auth: {
        username: "th-client",
        password: "klj2390!@90as!ASD",
      },
    }
  );
  //   return "your_auth_token_here";
  return data.access_token;
};

const authMiddleware = (req, res, next) => {
  console.log("in auth middleware");
  const token = fetchAuthTokenFromServer(); // Fetch the token from the server-side API or other sources
  setAuthTokenCookie(token); // Set the token as a cookie
  next(); // Continue with the Next.js rendering process
};

export default authMiddleware;
