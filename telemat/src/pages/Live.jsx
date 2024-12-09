import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

const socket = io("https://sih-2k24-seven.vercel.app");

const Live = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    socket.on("receive-location", (data) => {
      setLocations((prevLocations) => [...prevLocations, data]);
    });

    return () => socket.off("receive-location");
  }, []);

  return (
    <div>
      <h1>Live Tracking</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "420px", width: "93%"  }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]}>
            <Popup>{`User: ${location.name}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Live;
