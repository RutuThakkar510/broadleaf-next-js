import React, { useEffect, useState } from "react";
import axios from "axios";
// const API_URL='https://hospitality.admin.legends.blcdemo.com'
// const API_URL = "/broadleaf";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/actions";
import Cookies from "js-cookie";
import { setAuthTokenCookie } from "@/utils/cookies";
import { useAuth } from "@/context/AuthContext";
import { setAuthToken } from "@/utils/tokenManager";
// import getToken from "@/utils/getToken";

const Home = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);

  // const getAuthToken = async () => {
  //   const { data } = await axios.post(
  //     `${API_URL}/auth/oauth/token?grant_type=client_credentials`,
  //     // `/auth/oauth/token?grant_type=client_credentials`,
  //     {},
  //     {
  //       auth: {
  //         username: "th-client",
  //         password: "klj2390!@90as!ASD",
  //       },
  //     }
  //   );
  // };

  // const getEvents = async () => {
  //   const result = await axios.get(`${API_URL}/api/catalog/events`, {
  //     // headers: {
  //     //   accept: "application/json",
  //     //   "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     //   authorization:
  //     //     "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYnJvYWRsZWFmLWF1dGhlbnRpY2F0aW9uIiwib2F1dGgyLXJlc291cmNlIl0sIm1heCI6MTY4OTE4NzMxOCwic2NvcGUiOlsiSU5WRU5UT1JZIiwiUFJPRFVDVCIsIk1FTlUiLCJURU5BTlQiLCJBVVRIX1VTRVIiLCJJTlZFTlRPUllfTE9DQVRJT04iXSwiaXNzIjoiYnJvYWRsZWFmLWF1dGhlbnRpY2F0aW9uIiwiZXhwIjoxNjg5MTQ0NDE4LCJhdXRob3JpdGllcyI6WyJSRUFEX1BST0RVQ1QiLCJBTExfSU5WRU5UT1JZIiwiUkVBRF9JTlZFTlRPUllfTE9DQVRJT04iLCJSRUFEX01FTlUiLCJBTExfQVVUSF9VU0VSIiwiSU5WRU5UT1JZIiwiUFJPRFVDVCIsIlJFQURfVEVOQU5UIiwiTUVOVSIsIlRFTkFOVCIsIkFVVEhfVVNFUiIsIklOVkVOVE9SWV9MT0NBVElPTiJdLCJqdGkiOiJlMGNiYTMzMC1mOGY1LTQxOTItYjVhMi1kOTQxYTVjZDQ2NzEiLCJjbGllbnRfaWQiOiJ0aC1jbGllbnQifQ.j1702mvOFVlNEdYo5s7xPACo9NdP1aC7ktW7YoUyaKp_HDvAEZPyxe5QBka4zsWvUfEKJZ76F3kCTjc8L0MGmocqne2nN9XSsGAvfBCrNA1FGN1riYMLEzep-LGVolGGfoOWW7E5yujmw-hovtGLzGAh7KGfdB1A36IAkoutX5kAK-6qawJkTWGTgwz0CuJGOXKURpTfFD8ZBdwqspFblOoTfzH4UqYtihAR4mwudSFR7NvceW0Cx1zVncVIdVmG5Ke9KSdjtRxA4f3kvfmFnJa8GG6vmslUXxtFsXYmz4i5t8fTpi-PghIDf3lNv34_Rq5lribu0MA9nMmFqHycAw",
  //     //   "cache-control": "no-cache",
  //     //   pragma: "no-cache",
  //     //   "sec-ch-ua":
  //     //     '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
  //     //   "sec-ch-ua-mobile": "?0",
  //     //   "sec-ch-ua-platform": '"macOS"',
  //     //   "sec-fetch-dest": "empty",
  //     //   "sec-fetch-mode": "cors",
  //     //   "sec-fetch-site": "same-origin",
  //     //   "x-context-request":
  //     //     '{   "applicationId": "01GPYEXET5B7Y61HW8TB4R0YWH",   "tenantId": "Hospitality" }',
  //     //   "x-ignore-translation": "false",
  //     // },
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "x-context-request":
  //         '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH","customerContextId":"01GPYEXET5B7Y61HW8TB4R0YWH","changeContainer":{}}',
  //     },
  //   });
  //   console.log("result ==>", result);
  // };
  // const { setAuthToken } = useAuth();

  const getToken = async () => {
    const response = await axios.post("/api/broadleaf");
    console.log("response", response);
    console.log("response data access token", response.data.access_token);
    const token = response.data.access_token;
    dispatch(setToken(token));
    localStorage.setItem("broadleaf-token", token);
    // setAuthTokenCookie(response.data.access_token);
    setAuthTokenCookie(token);
    // setAuthToken(token); // Set the token in the context
    setAuthToken(token);
    // await getEvents();
    // Cookies.set("broadleafToken", response.data.access_token);
  };

  // const token = useSelector((state) => state.token);
  const getEvents = async () => {
    const token = localStorage.getItem("broadleaf-token");
    const { data } = await axios.post("/api/events", {
      token: token,
    });
    console.log("eventsList================================", data);
    console.log("type", typeof data);
    setEvents(data);
  };
  const getVenues = async () => {
    // const axiosIns = axiosInstance();
    const { data } = await axios.get("/api/venues");
    console.log("venuesList================================", data);
    console.log("type", typeof data);
    setVenues(data);
  };

  // const getEvents = async () => {
  //   const eventsData = await axios.get(
  //     "https://hospitality.admin.legends.blcdemo.com/api/catalog/events",
  //     {},
  //     {
  //       headers: {
  //         Authorization: token,
  //         "x-context-request":
  //           '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}',
  //       },
  //     }
  //   );
  //   console.log("response", eventsData);
  // };

  useEffect(() => {
    getToken();
    // axios
    //   .get("/api/events")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    // axios
    //   .get("/api/broadleaf")
    //   .then((response) => {
    //     console.log("response", response.access_token);
    //     console.log("indexxxx====>", response.access_token);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    // getAuthToken();
    // getEvents();
  }, []);

  // const getEvents = async () => {
  //   const eventsData = await axios.get(
  //     "https://hospitality.admin.legends.blcdemo.com/api/catalog/events",
  //     {},
  //     {
  //       headers: {
  //         Authorization: token,
  //         "x-context-request":
  //           '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}',
  //       },
  //     }
  //   );
  // };
  return (
    <div>
      This is home
      <div>
        <button onClick={() => getEvents()}>Get Events</button>
        <button onClick={() => getVenues()}>Get Venues</button>
      </div>
      {events.length > 0 && (
        <div>
          <h2>Events</h2>
          {events.map((event) => {
            return (
              <div key={event.id}>
                <h3>{event.title}</h3>
                <ul>
                  <li>Start Time and Date: {event.eventStartDateTime}</li>
                  <li>End Time and Date: {event.eventEndDateTime}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
      {venues.length > 0 && (
        <div>
          <h2>Venues</h2>
          {venues.map((venue) => {
            return (
              <div key={venue.id}>
                <h3>Name: {venue.name}</h3>
                <p>Capacity: {venue.capacity}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
