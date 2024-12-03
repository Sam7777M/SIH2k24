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
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Fetch schedules from the server
    axios.get("http://localhost:5000/api/schedules")
      .then((response) => setSchedules(response.data))
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStartPoint({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Error fetching location:", error)
    );
  }, []);

  const fetchRoute = async (start, end) => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const routeCoordinates = response.data.routes[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
      setRoute(routeCoordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const handleGetRoute = async () => {
    if (!startPoint || !selectedSchedule) {
      alert("Please select a schedule and ensure your location is enabled.");
      return;
    }

    const selectedDestination = schedules.find((schedule) => schedule._id === selectedSchedule).destination;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(selectedDestination)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setEndPoint({ lat: parseFloat(lat), lng: parseFloat(lon) });
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
      <p>Select a schedule to calculate the route.</p>
      <select
        value={selectedSchedule}
        onChange={(e) => setSelectedSchedule(e.target.value)}
        style={{ padding: "5px", width: "300px", marginBottom: "10px" }}
      >
        <option value="">Select Schedule</option>
        {schedules.map((schedule) => (
          <option key={schedule._id} value={schedule._id}>
            {schedule.name} - {schedule.destination}
          </option>
        ))}
      </select>
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
        Get Route
      </button>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%", marginTop: "20px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
