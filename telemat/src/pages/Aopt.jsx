import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

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
  const [destination, setDestination] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedQrData = localStorage.getItem("qrrData");
    if (savedQrData) {
      try {
        const parsedData = JSON.parse(savedQrData);
        setDestination(parsedData.destination);
        setUser(parsedData.name); // Extract user's name
      } catch (error) {
        console.error("Error parsing saved QR data:", error);
      }
    }

    const updateLocationAndSendToServer = async (position) => {
      const { latitude, longitude } = position.coords;
      const currentLocation = { lat: latitude, lng: longitude, name: user };
      setStartPoint(currentLocation);

      try {
        await axios.post("https://sih-2k24-seven.vercel.app/api/coordinates", currentLocation);
      } catch (error) {
        console.error("Error sending location to server:", error);
      }
    };

    const locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        updateLocationAndSendToServer,
        (error) => console.error("Error fetching location:", error)
      );
    }, 5000);

    return () => clearInterval(locationInterval);
  }, [user]);

  const fetchRoute = async (start, end) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const routeCoordinates = response.data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
      setRoute(routeCoordinates);
      const distanceInKm = response.data.routes[0].distance / 1000;
      setDistance(distanceInKm.toFixed(2));
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const handleGetRoute = async () => {
    if (!startPoint) {
      alert("Location not found. Please enable your location.");
      return;
    }
    if (!destination) {
      alert("Destination not found. Ensure the QR code data is valid.");
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
      );
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        setEndPoint({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setDestinationName(display_name);
        fetchRoute(startPoint, { lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert("Destination not found.");
      }
    } catch (error) {
      console.error("Error geocoding destination:", error);
    }
  };

  return (
    <div>
      <h1>Route Optimizer</h1>
      <h2>User: {user}</h2>
      <button onClick={handleGetRoute} style={{ padding: "10px", backgroundColor: "#4caf50", color: "#fff" }}>
        Get Route
      </button>
      {destinationName && <h2>Destination: {destinationName}</h2>}
      {distance && <h3>Distance: {distance} km</h3>}

      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {startPoint && (
          <Marker position={[startPoint.lat, startPoint.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {endPoint && (
          <Marker position={[endPoint.lat, endPoint.lng]}>
            <Popup>Destination</Popup>
          </Marker>
        )}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
        <AdjustMapBounds route={route} startPoint={startPoint} endPoint={endPoint} />
      </MapContainer>
    </div>
  );
};

export default Aopt;
