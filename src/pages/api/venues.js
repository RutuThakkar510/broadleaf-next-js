import tokenValidation from "@/middleware/tokenValidation";
import axios from "axios";

async function handler(req, res) {
  const accessToken = req.headers.authorization;

  try {
    const venuesData = await axios.get(
      `${process.env.BASE_API_URL}/api/catalog/venues`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-context-request": `{"tenantId":"${process.env.TENANT_ID}","applicationId":"${process.env.APPLICATION_ID}"}`,
        },
      }
    );
    res.status(200).json({ venuesData: venuesData.data, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default tokenValidation(handler);
