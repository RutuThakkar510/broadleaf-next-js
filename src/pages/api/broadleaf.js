import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.post(
      "https://hospitality.admin.legends.blcdemo.com/auth/oauth/token?grant_type=client_credentials",
      {},
      {
        auth: {
          username: process.env.AUTH_USERNAME,
          password: process.env.AUTH_PASSWORD,
        },
      }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
}
