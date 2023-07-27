import jwt from "jsonwebtoken";
import moment from "moment";
import getToken from "@/utils/getToken";

export default function tokenValidation(handler) {
  return async (req, res) => {
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token not found" });
    }

    try {
      const tokenPayload = jwt.decode(token);
      const isNewTokenRequire = moment
        .unix(tokenPayload.exp)
        .isBefore(moment());

      if (!isNewTokenRequire) {
        return handler(req, res);
      }

      const data = await getToken();
      if (data.access_token) {
        req.headers.authorization = data.access_token;
        return handler(req, res);
      } else {
        return "error";
      }
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
}
