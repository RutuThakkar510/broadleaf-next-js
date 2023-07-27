import { setAuthTokenCookie } from "@/utils/cookies";
import axios from "axios";
import Cookies from "js-cookie";

export default async function handler(req, res) {
  console.log(" in broadleaf");
  try {
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
    console.log("response: " + data.access_token);
    // req.setRequestHeader("Content-Type", "application/json");
    // res.setHeader("Authorization", `Bearer ${data.access_token}`);
    // res.setHeader("Set-Cookie", `Authorization=Bearer ${data.access_token}`);
    // Cookies.set("broadleafToken", data.access_token);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ error: err.message });
  }
}
// res.setHeader("Authorization", "Bearer " + data.access_token);
// res.setHeader("Set-Cookie", [
//   `Authorization=Bearer ${data.access_token}`,
//   `"x-context-request"=
//         '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}'`,
// ]);
// res.setHeader("Authorization", `Bearer ${data.access_token}`);
// res.setHeader(
//   "x-context-request",
//   '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}'
// );
