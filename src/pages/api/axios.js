import { useAuth } from "@/hooks/useAuth";
import store from "@/redux/store";
import { getAuthToken } from "@/utils/tokenManager";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = process.env.BASE_API_URL;
console.log(API_URL);
const axiosInstance = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("config", config);
    // const accessToken = config.headers.Authorization;
    // const accessToken = useSelector((state) => state.token);
    const token = store.getState();
    console.log("token state", token);
    // const accessToken = useAuth();
    // const accessToken = ;
    // console.log("token in header auth: " + accessToken);
    // const accessToken = localStorage.getItem("broadleaf-token");
    if (token) {
      console.log("in if");
      // If the access token is found, add it to the Authorization header.
      // config.headers.Authorization = `${accessToken}`;
      config.headers["x-context-request"] =
        '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}';
    } else {
      console.log("in else");
      // If the access token is not found, fetch a new one from the API.
      try {
        const { data } = await axios.post(
          `${API_URL}/auth/oauth/token?grant_type=client_credentials`,
          {},
          {
            auth: {
              username: process.env.AUTH_USERNAME,
              password: process.env.AUTH_PASSWORD,
            },
          }
        );
        console.log("data in interceptor", data);
        // localStorage.setItem("access_token", data.access_token);
        config.headers.Authorization = `Bearer ${data.access_token}`;
        config.headers["x-context-request"] =
          '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}';
      } catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
      }
    }

    return config;
  },
  (error) => {
    // Handle request error (if any).
    return Promise.reject(error);
  }
);

export default axiosInstance;
