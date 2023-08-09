import axios from "axios";

export default async function handler(req, res) {
  try {
    // const { data } = await axios.post(
    //   `${process.env.BASE_API_URL}/auth/oauth/token?grant_type=client_credentials`,
    //   {},
    //   {
    //     auth: {
    //       username: process.env.AUTH_USERNAME,
    //       password: process.env.AUTH_PASSWORD,
    //     },
    //   }
    // );
    const { data: dataa } = await axios.post(
      `${process.env.BASE_API_URL}/auth/oauth/token`,
      null,
      {
        params: {
          grant_type: "refresh_token",
          client_id: process.env.AUTH_USERNAME,
          client_secret: process.env.AUTH_PASSWORD,
          // scope: "OFFLINE_ACCESS",
        },
        // auth: {
        //   username: process.env.AUTH_USERNAME,
        //   password: process.env.AUTH_PASSWORD,
        // },
        headers: {
          grant_type: "refresh_token",
          scope: "OFFLINE_ACCESS",
        },
      }
    );
    console.log("dataaaaa", dataa);
    res.status(200).json(dataa);
  } catch (err) {
    console.log("error", err);
    console.log("error", err.response.data);
    res.status(500).json({ error: err.message });
  }
}
