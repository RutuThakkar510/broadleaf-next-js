import React, { useEffect, useState } from "react";
import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [products, setProducts] = useState([]);

  const validateToken = (accessToken) => {
    const localToken = localStorage.getItem("broadleafToken");
    if (accessToken !== localToken) {
      localStorage.setItem("broadleafToken", accessToken);
      setAuthToken(accessToken);
    }
  };

  const getToken = async () => {
    const response = await axios.post("/api/broadleaf");
    const token = response.data.access_token;
    localStorage.setItem("broadleafToken", response.data.access_token);
    setAuthToken(token);
  };

  const getEvents = async () => {
    const response = await axios.get("/api/events");
    validateToken(response.data.accessToken);
    setEvents(response.data.eventData);
  };
  const getVenues = async () => {
    const response = await axios.get("/api/venues");
    validateToken(response.data.accessToken);
    setVenues(response.data.venuesData);
  };
  const getProducts = async () => {
    const response = await axios.get("/api/products");
    validateToken(response.data.accessToken);
    setProducts(response.data.productData.content);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => getEvents()}>Get Events</button>
        <button onClick={() => getVenues()}>Get Venues</button>
        <button onClick={() => getProducts()}>Get Products</button>
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

      {events.length > 0 && venues.length > 0 && (
        <h1>List of events based on venue</h1>
      )}
      {events.length > 0 &&
        venues.length > 0 &&
        events.map((eventItem) => {
          console.log("eventItem", eventItem.legendsVenue.id);
          const venueFiltered = venues.filter((venue) => {
            return eventItem.legendsVenue.id === venue.id;
          });
          console.log(venueFiltered);
          return (
            <div key={eventItem.id}>
              <h2>Venue: {venueFiltered[0]?.name}</h2>
              <h4>Event: {eventItem.title}</h4>
            </div>
          );
        })}

      {products.length > 0 && <h1>Products</h1>}

      {products.length > 0 &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <h3>Name: {product.name}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
