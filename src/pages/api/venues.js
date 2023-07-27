// import axios from "axios";

import axiosInstance from "./axios";

export default async function handler(req, res) {
  console.log("hereeee in venues");
  console.log("req.body", req.body.token);
  console.log("req.body", req.body.axiosIns);
  const axios = axiosInstance;

  try {
    const venuesData = await axios.get(
      "https://hospitality.admin.legends.blcdemo.com/api/catalog/venues",
      {
        // headers: {
        //   // Authorization: `Bearer ${accessToken}`,
        //   "x-context-request":
        //     '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}',
        // },
      }
    );
    // console.log("response", venuesData.data);
    res.status(200).json(venuesData.data);
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
//   const accessToken = localStorage.getItem("broadleaf_token");
//   const accessTokenCookie = req.headers.cookie;
//   console.log(
//     "accessToken in events",
//     accessTokenCookie.substring(accessTokenCookie.indexOf("=") + 1)
//   );
//   const accessToken = accessTokenCookie.substring(
//     accessTokenCookie.indexOf("=") + 1
//   );
//   console.log({ accessTokenCookie });
