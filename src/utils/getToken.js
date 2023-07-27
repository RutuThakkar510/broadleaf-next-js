import axios from "axios";
import Cookies from "js-cookie";

const getToken = async () => {
  console.log("getToken in broadleaf");
  try {
    // const { data } = await axios.post(
    //   "https://hospitality.admin.legends.blcdemo.com/auth/oauth/token?grant_type=client_credentials",
    //   {},
    //   {
    //     auth: {
    //       username: "th-client",
    //       password: "klj2390!@90as!ASD",
    //     },
    //   }
    // );
    debugger;

    const { data } = await axios.post("/api/broadleaf");
    debugger;

    // console.log("response: " + data.access_token);
    // Cookies.remove("broadleafToken");
    // Cookies.get("broadleafToken");
    // Cookies.set("broadleafToken", data.access_token);
    // res.status(200).json(data);
    return data;
  } catch (err) {
    console.log(err.message);
    return err;
    // res.status(200).json({ error: err.message });
  }
};

export default getToken;
