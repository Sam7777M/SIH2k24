import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import axios from "axios";

const SharedRoute = ({ match }) => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`https://sih-2k24-seven.vercel.app/api/routes/${match.params.id}`);
        setRouteData(response.data);
      } catch {
        alert("Error loading route");
      }
    };
    fetchRoute();
  }, [match.params.id]);

  if (!routeData) return <p>Loading...</p>;

  const { startPoint, endPoint, routes } = routeData;

  return (
    <MapContainer center={[startPoint.lat, startPoint.lng]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[startPoint.lat, startPoint.lng]} />
      <Marker position={[endPoint.lat, endPoint.lng]} />
      <Polyline positions={routes[0].coordinates} color="blue" />
    </MapContainer>
  );
};

export default SharedRoute;
