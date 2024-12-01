import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import io from "socket.io-client";

// Socket connection to send location updates
const socket = io("http://localhost:5000"); // Update with your server address

// Adjust the map bounds based on the route
const AdjustMapBounds = ({ route, startPoint, endPoint }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (startPoint && endPoint) {
      const bounds = L.latLngBounds([startPoint, endPoint]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, startPoint, endPoint, map]);

  return null;
};

const Aopt = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eta, setETA] = useState(null);
  const [averageDelay, setAverageDelay] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch user's current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        setStartPoint(userLocation);
        setCurrentLocation(userLocation);
        setStartLocation("Your Location");
      },
      (error) => {
        console.error("Error fetching user's location:", error);
        alert("Failed to fetch your location. Please enable location services.");
      }
    );
  }, []);

  // Monitor user's real-time location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(userLocation);

        // Emit the updated location to the server
        socket.emit("send-location", userLocation);
      },
      (error) => {
        console.error("Error fetching real-time location:", error);
        alert("Failed to fetch location. Please try again.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId); // Clean up on component unmount
  }, []);

  // Geocode location using OpenStreetMap Nominatim API
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
        return null;
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      alert("Failed to fetch location. Please try again.");
      return null;
    }
  };

  // Get optimized routes between start and end locations
  const getOptimizedRoutes = async (start, end) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&alternatives=true`
      );
      const routesData = response.data.routes.map((route) => ({
        coordinates: route.geometry.coordinates.map((coord) => [coord[1], coord[0]]),
        duration: route.duration, // in seconds
        trafficSegments: simulateTraffic(route.geometry.coordinates), // Simulated traffic
      }));
      setRoutes(routesData);
      setCurrentRouteIndex(0);
      setETA(formatDuration(routesData[0].duration));
      calculateTrafficDelay(routesData[0]);
    } catch (error) {
      console.error("Error fetching routes from OSRM:", error);
      alert("Failed to fetch routes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format duration from seconds to "Xh Ym" format
  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Handle getting route when both locations are provided
  const handleGetRoute = async () => {
    if (!startPoint || !endLocation) {
      alert("Please ensure your location and end location are set.");
      return;
    }

    const endCoords = await geocodeLocation(endLocation);

    if (startPoint && endCoords) {
      setEndPoint(endCoords);
      getOptimizedRoutes(startPoint, endCoords);
    }
  };

  // Simulate traffic for each route
  const simulateTraffic = (coordinates) => {
    // This function simulates traffic data for demonstration purposes
    return coordinates.map(() => Math.random() * 10); // Random delays
  };

  // Calculate average delay based on simulated traffic
  const calculateTrafficDelay = (route) => {
    const delays = route.trafficSegments;
    const averageDelay = delays.reduce((acc, delay) => acc + delay, 0) / delays.length;
    setAverageDelay(averageDelay);
  };

  // Marker icon for start, end, and current location
  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [25, 25],
  });

  return (
    <div>
      <h1>Route Optimizer with Real-Time Location Monitoring</h1>
      <p>Enter the end location manually to calculate optimized routes.</p>
      <div style={{ marginBottom: "10px" }}>
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
          {loading ? "Loading..." : "Get Routes"}
        </button>
      </div>
      {eta && <p>Estimated Time of Arrival: {eta}</p>}
      {averageDelay && <p>Average Traffic Delay: {averageDelay.toFixed(2)} minutes</p>}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
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
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={markerIcon}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
        {routes.length > 0 && (
          <Polyline positions={routes[currentRouteIndex].coordinates} color="blue" />
        )}
        <AdjustMapBounds
          route={routes[currentRouteIndex]?.coordinates || []}
          startPoint={startPoint}
          endPoint={endPoint}
        />
      </MapContainer>
    </div>
  );
};

export default Aopt;
