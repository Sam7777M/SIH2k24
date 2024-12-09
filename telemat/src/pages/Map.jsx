import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icons in React-Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ userId }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/get-location/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch location: ${response.statusText}`);
        }
        const data = await response.json();
        setLocation({ lat: data.latitude, lng: data.longitude });
      } catch (err) {
        console.error("Error fetching location:", err);
        setError("Failed to load the location. Please try again later.");
      }
    };

    if (userId) {
      fetchLocation();
    }
  }, [userId]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <MapContainer
          center={location}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>Current Location</Popup>
            <h1>ugygyhu</h1>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
