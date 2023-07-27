import axios from "axios";

const getToken = async () => {
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
    return data;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};

export default getToken;
