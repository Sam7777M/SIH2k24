import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";

const socket = io("https://sih-2k24-seven.vercel.app"); // Update with your server address

const Monitor = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    socket.on("receive-location", (data) => {
      setLocations((prevLocations) => {
        const index = prevLocations.findIndex((loc) => loc.id === data.id);
        if (index !== -1) {
          const updatedLocations = [...prevLocations];
          updatedLocations[index] = data;
          return updatedLocations;
        }
        return [...prevLocations, data];
      });
    });

    // Clean up on component unmount
    return () => {
      socket.off("receive-location");
    };
  }, []);

  return (
    <div>
      <h1>Real-time User Locations</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker position={[location.latitude, location.longitude]} key={location.id}>
            <Popup>{`User ID: ${location.id}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Monitor;
