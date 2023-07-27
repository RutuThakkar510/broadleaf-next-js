import jwt from "jsonwebtoken";
import moment from "moment";
import axios from "axios";
import getToken from "@/utils/getToken";
import Cookies from "js-cookie";

export default function tokenValidation(handler) {
  return async (req, res) => {
    // Retrieve the token from the request (e.g., from cookies, headers, etc.)
    const token = req.cookies.broadleafToken;
    console.log("token", token);

    // Check if token exists
    if (!token) {
      console.log("not exist");
      return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    try {
      console.log("in try");
      const tokenPayload = jwt.decode(token);
      console.log("token payload: " + tokenPayload);

      const isNewTokenRequire = moment
        .unix(tokenPayload.exp)
        .isBefore(moment());

      console.log("isNewTokenRequire", isNewTokenRequire);

      if (!isNewTokenRequire) {
        console.log("b4 here in not new token require");
        // await axios.post("/api/broadleaf");
        const data = await getToken();
        console.log("data of getToken", data);
        // console.log("data", data.access_token);
        // Cookies.set("broadleafToken", data.access_token);
        console.log("after here in not new token require");
        // return handler(req, res);
      }

      // For example, if the token has a user ID, you can access it like `decodedToken.userId` // Token is valid; you can access its contents using `decodedToken` //   const decodedToken = jwt.verify(token, "your-secret-key"); // Verify the token

      // Continue with the actual API route handler
      console.log({ handler });
      return handler(req, res);
    } catch (error) {
      // Token verification failed (expired, invalid signature, etc.)
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
}
