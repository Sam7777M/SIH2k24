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

  // Starting location by place name
  const [startPlace, setStartPlace] = useState("");

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
  }, []);

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
    if (!startPlace) {
      alert("Please enter a starting location.");
      return;
    }

    // Get the starting point coordinates from the place name
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startPlace)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const validStartPoint = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setStartPoint(validStartPoint);

        if (!destination) {
          alert("Destination not found. Ensure the QR code data is valid.");
          return;
        }

        // Get the destination coordinates
        const destinationResponse = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
        );
        if (destinationResponse.data.length > 0) {
          const { lat: destLat, lon: destLon, display_name } = destinationResponse.data[0];
          setEndPoint({ lat: parseFloat(destLat), lng: parseFloat(destLon) });
          setDestinationName(display_name);
          fetchRoute(validStartPoint, { lat: parseFloat(destLat), lng: parseFloat(destLon) });
        } else {
          alert("Destination not found.");
        }
      } else {
        alert("Starting location not found.");
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
    }
  };

  return (
    <div>
      <h1>Route Optimizer</h1>
      <h2>User: {user}</h2>

      {/* Input field for starting location as place name */}
      <div>
        <label>Starting Location (Place Name):</label>
        <input
          type="text"
          value={startPlace}
          onChange={(e) => setStartPlace(e.target.value)}
          placeholder="Enter starting location"
        />
      </div>

      <button onClick={handleGetRoute} style={{ padding: "10px", backgroundColor: "#4caf50", color: "#fff" }}>
        Get Route
      </button>

      {destinationName && <h2>Destination: {destinationName}</h2>}
      {distance && <h3>Distance: {distance} km</h3>}

      <MapContainer center={startPoint ? [startPoint.lat, startPoint.lng] : [51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%", marginTop: "20px" }}>
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
