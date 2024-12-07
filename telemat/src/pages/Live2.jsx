import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import * as turf from "@turf/turf";

// Establish the socket connection
const socket = io("http://localhost:5000");

// Component to select the geofence center by clicking on the map
const GeofenceSelector = ({ setGeofenceCenter }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      setGeofenceCenter([lat, lng]);
    },
  });

  return null;
};

const Live2 = () => {
  const [locations, setLocations] = useState([]); // Store live locations of all users
  const [alerts, setAlerts] = useState([]); // Store geofence alerts
  const [userGeofenceStatus, setUserGeofenceStatus] = useState({}); // Track each user's geofence status
  const [geofenceCenter, setGeofenceCenter] = useState([28.6147, 77.1599]); // Default geofence center
  const geofenceRadius = 3000; // Radius in meters

  // Handle location updates from the backend
  useEffect(() => {
    socket.on("receive-location", (data) => {
      console.log("Received location:", data);

      // Check if the user is inside the geofence
      const isInside = turf.booleanPointInPolygon(
        turf.point([data.longitude, data.latitude]),
        turf.circle(geofenceCenter, geofenceRadius / 1000, { units: "kilometers" })
      );

      // Update or add user location
      setLocations((prevLocations) => {
        const existingIndex = prevLocations.findIndex((loc) => loc.userID === data.userID);
        if (existingIndex !== -1) {
          const updatedLocations = [...prevLocations];
          updatedLocations[existingIndex] = { ...updatedLocations[existingIndex], ...data };
          return updatedLocations;
        }
        return [...prevLocations, data];
      });

      // Update geofence status and generate alerts
      setUserGeofenceStatus((prevStatus) => {
        const currentStatus = prevStatus[data.userID] || false; // Default to "outside"
        if (isInside && !currentStatus) {
          setAlerts((prevAlerts) => [...prevAlerts, `${data.name} has entered the geofence!`]);
        } else if (!isInside && currentStatus) {
          setAlerts((prevAlerts) => [...prevAlerts, `${data.name} has exited the geofence!`]);
        }
        return { ...prevStatus, [data.userID]: isInside };
      });
    });

    // Cleanup socket listener on unmount
    return () => socket.off("receive-location");
  }, [geofenceCenter]);

  return (
    <div>
      <h1>Live Tracking</h1>
      <p>
        <strong>Click on the map to set the geofence center. Current center:</strong>{" "}
        {geofenceCenter[0].toFixed(4)}, {geofenceCenter[1].toFixed(4)}
      </p>

      <MapContainer
        center={geofenceCenter}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render the geofence circle */}
        <Circle
          center={geofenceCenter}
          radius={geofenceRadius}
          pathOptions={{ color: "blue", fillColor: "lightblue", fillOpacity: 0.5 }}
        />

        {/* Enable setting the geofence center */}
        <GeofenceSelector setGeofenceCenter={setGeofenceCenter} />

        {/* Render live markers for each user */}
        {locations.map((location) => (
          <Marker
            key={location.userID}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              {`User: ${location.name}`}
              <br />
              {`Coordinates: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Render geofence alerts */}
      <div>
        <h2>Geofence Alerts</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Live2;
