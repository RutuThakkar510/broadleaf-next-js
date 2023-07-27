import tokenValidation from "@/middleware/tokenValidation";
import axios from "axios";

async function handler(req, res) {
  console.log("hereeee");
  const accessToken = req.cookies.broadleafToken;

  try {
    const eventsData = await axios.get(
      "https://hospitality.admin.legends.blcdemo.com/api/catalog/events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-context-request":
            '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}',
        },
      }
    );
    // console.log("response", eventsData.data);
    res.status(200).json(eventsData.data);
  } catch (err) {
    // console.log(err.message);
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default tokenValidation(handler);

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
