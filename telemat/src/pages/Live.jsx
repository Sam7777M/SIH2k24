import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet"; // Import Leaflet for custom icons

// Connect to the server via Socket.io
const socket = io("http://localhost:5000/");

// Helper component to update the map center
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);
  return null;
};

const Live = () => {
  const [locations, setLocations] = useState([]); // Store all received locations
  const [currentLocation, setCurrentLocation] = useState(null); // Store current user's location
  const [loading, setLoading] = useState(true); // Loading state for geolocation

  useEffect(() => {
    // Get the user's current geolocation as the starting point
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]); // Set initial current location
          setLoading(false); // Stop loading once the location is fetched
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false); // Stop loading if there's an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false); // Stop loading if geolocation is not supported
    }

    // Listen for location updates from the server
    socket.on("receive-location", (data) => {
      console.log("Received location from server:", data); // Debugging statement
      setLocations((prevLocations) => [...prevLocations, data]); // Add new location to state
    });

    // Cleanup on unmount
    return () => socket.off("receive-location");
  }, []);

  // Extract coordinates for the route (only if there's more than one location)
  const routeCoordinates = currentLocation
    ? [currentLocation, ...locations.map((location) => [location.latitude, location.longitude])]
    : [];

  // Log the coordinates for debugging
  console.log("Current location:", currentLocation);
  console.log("Destination locations:", locations);

  // Show loading indicator while fetching geolocation
  if (loading) {
    return <div>Loading your location...</div>;
  }

  return (
    <div>
      <h1>Live Tracking</h1>
      <MapContainer
        center={currentLocation || [51.505, -0.09]} // Default to a fallback location if no currentLocation
        zoom={13}
        style={{ height: "420px", width: "93%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentLocation && <MapUpdater position={currentLocation} />} {/* Update the map center */}

        {/* Show markers for all locations */}
        {locations.length > 0 &&
          locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={
                index === locations.length - 1
                  ? new L.Icon({ iconUrl: "path_to_special_icon.png", iconSize: [32, 32] }) // Special icon for the last marker (final destination)
                  : undefined
              }
            >
              <Popup>{`User: ${location.name}`}</Popup>
            </Marker>
          ))}

        {/* Show route (Polyline) if there are at least two locations */}
        {routeCoordinates.length > 1 && (
          <Polyline positions={routeCoordinates} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default Live;
