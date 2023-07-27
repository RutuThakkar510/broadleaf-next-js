import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Events = () => {
  const token = useSelector((state) => state.token);
  console.log("in events token", token);
  const getEvents = async () => {
    const eventsData = await axios.get(
      "https://hospitality.admin.legends.blcdemo.com/api/catalog/events",
      {},
      {
        headers: {
          Authorization: token,
          "x-context-request":
            '{"tenantId":"Hospitality","applicationId":"01GPYEXET5B7Y61HW8TB4R0YWH"}',
        },
      }
    );
  };
  useEffect(() => {
    getEvents();
  });
  return <div>Events home page</div>;
};

export default Events;
