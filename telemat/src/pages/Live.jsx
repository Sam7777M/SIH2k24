import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Socket connection to receive location updates
const socket = io("http://localhost:5000"); // Update with your server address

const Live = () => {
  const [locations, setLocations] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState(0); // Store the connected users count
  const mapRef = useRef();

  // Listen for incoming location data from the server
  useEffect(() => {
    socket.on("receive-location", (data) => {
      console.log("Received location data:", data);
      const { id, latitude, longitude } = data;
      const latLng = [latitude, longitude];

      // Update locations state with the new location
      setLocations((prevLocations) => [
        ...prevLocations.filter((location) => location.id !== id), // Remove any existing marker with the same ID
        { id, latLng },
      ]);

      // Center the map on the new location
      mapRef.current.setView(latLng, 13); // Adjust zoom level if necessary
    });

    // Listen for the number of connected users from the server
    socket.on("connected-users", (count) => {
      setConnectedUsers(count);
    });

    return () => {
      socket.off("receive-location");
      socket.off("connected-users");
    };
  }, []);

  return (
    <div>
      <h1>Live Location Tracking</h1>
      <p>Connected Users: {connectedUsers}</p> {/* Display the connected users count */}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Render a Marker for each user location */}
        {locations.map((location) => (
          <Marker key={location.id} position={location.latLng}>
            <Popup>{`User ID: ${location.id}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Live;
