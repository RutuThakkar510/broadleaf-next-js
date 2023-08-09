import tokenValidation from "@/middleware/tokenValidation";
import axios from "axios";

async function handler(req, res) {
  const accessToken = req.headers.authorization;

  try {
    const productData = await axios.get(
      `${process.env.BASE_API_URL}/api/catalog/products`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-context-request": `{"tenantId":"${process.env.TENANT_ID}","applicationId":"${process.env.APPLICATION_ID}"}`,
          "accept-language": "fr-FR",
        },
      }
    );
    res.status(200).json({ productData: productData.data, accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default tokenValidation(handler);
