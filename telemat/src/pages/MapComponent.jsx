import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Latitude for San Francisco
  lng: -122.4194, // Longitude for San Francisco
};

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const { AdvancedMarkerElement } = window.google.maps.marker;

      // Create a new AdvancedMarkerElement
      const marker = new AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
      });

      // Attach a click listener to the marker (optional)
      marker.addListener("click", () => {
        console.log("Marker clicked!");
      });
    }
  }, [mapRef]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCHPtRIIwj7E334xOkNa70J2qWiYHB_SU0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={(map) => (mapRef.current = map)}
      >
        {/* AdvancedMarkerElement is manually added; no JSX here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
