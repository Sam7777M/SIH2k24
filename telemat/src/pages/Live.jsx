import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

const socket = io("https://sih-2k24-seven.vercel.app/");

// A helper component to update the map's center
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
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    socket.on("receive-location", (data) => {
      setLocations((prevLocations) => [...prevLocations, data]);
      setCurrentLocation([data.latitude, data.longitude]); // Update the current location
    });

    return () => socket.off("receive-location");
  }, []);

  return (
    <div>
      <h1>Live Tracking</h1>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "420px", width: "93%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentLocation && <MapUpdater position={currentLocation} />}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
          >
            <Popup>{`User: ${location.name}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Live;
