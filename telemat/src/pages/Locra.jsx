import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const Locra = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  // Geocode a location into coordinates
  const geocodeLocation = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        alert(`Location not found: ${address}`);
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      alert("Failed to fetch location. Please try again.");
    }
    return null;
  };

  // Fetch the optimized route from OSRM API
  const getOptimizedRoute = async (start, end) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const coordinates = response.data.routes[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]] // Convert [lng, lat] to [lat, lng] for Leaflet
      );
      setRoute(coordinates);
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
      alert("Failed to fetch route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetRoute = async () => {
    if (!startLocation || !endLocation) {
      alert("Please enter both start and end locations.");
      return;
    }

    const startCoords = await geocodeLocation(startLocation);
    const endCoords = await geocodeLocation(endLocation);

    if (startCoords && endCoords) {
      setStartPoint(startCoords);
      setEndPoint(endCoords);
      getOptimizedRoute(startCoords, endCoords);
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 25],
  });

  return (
    <div>
      <h1>Route Optimizer with OSRM</h1>
      <p>Enter start and end locations manually to calculate the optimized route.</p>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="Enter start location"
          style={{ padding: "5px", width: "45%", marginRight: "10px" }}
        />
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          placeholder="Enter end location"
          style={{ padding: "5px", width: "45%" }}
        />
        <button
          onClick={handleGetRoute}
          style={{
            padding: "10px",
            marginLeft: "10px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Get Route"}
        </button>
      </div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {startPoint && (
          <Marker position={[startPoint.lat, startPoint.lng]} icon={markerIcon}>
            <Popup>Start Point</Popup>
          </Marker>
        )}
        {endPoint && (
          <Marker position={[endPoint.lat, endPoint.lng]} icon={markerIcon}>
            <Popup>End Point</Popup>
          </Marker>
        )}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default Locra;
