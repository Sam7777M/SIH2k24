import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import PropTypes from 'prop-types';

// Adjust map bounds based on route and points
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

// Pan map to user's location
const PanToLocation = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation, map]);

  return null;
};

const TrackingPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [destination, setDestination] = useState("Times Square, NYC");
  const [endPoint, setEndPoint] = useState({ lat: 40.758, lng: -73.9855 });

  // Function to fetch user location periodically
  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setUserLocation(currentLocation);
          console.log("Updated location:", currentLocation);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    };

    // Fetch location every 5 seconds
    const locationInterval = setInterval(updateLocation, 5000);

    // Initial fetch
    updateLocation();

    // Clear interval on component unmount
    return () => clearInterval(locationInterval);
  }, []);

  // Fetch the route from user location to the destination
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

  // Recalculate the route whenever the user's location changes
  useEffect(() => {
    if (userLocation) {
      fetchRoute(userLocation, endPoint);
    }
  }, [userLocation, endPoint]);

  return (
    <div>
      <h1>Live Route Tracker</h1>
      <p>Tracking your route in real-time.</p>

      <h3>
        User's Location:{" "}
        {userLocation ? `${userLocation.lat}, ${userLocation.lng}` : "Fetching location..."}
      </h3>
      <h3>Destination: {destination}</h3>

      <MapContainer
        center={userLocation || [51.505, -0.09]}
        zoom={13}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
        {endPoint && (
          <Marker position={[endPoint.lat, endPoint.lng]}>
            <Popup>Destination</Popup>
          </Marker>
        )}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
        <AdjustMapBounds route={route} startPoint={userLocation} endPoint={endPoint} />
        <PanToLocation userLocation={userLocation} />
      </MapContainer>
    </div>
  );
};
PanToLocation.propTypes = {
  userLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default TrackingPage;
