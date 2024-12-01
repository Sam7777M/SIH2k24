// frontend/src/components/Loc.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Loc = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [otherLocations, setOtherLocations] = useState([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const geoWatcher = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });

          // Send your location to the backend
          fetch('http://localhost:3001/api/update-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              deviceId: 'user1', // Use a unique device ID for each mobile
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(geoWatcher);
      };
    } else {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.',
      }));
    }
  }, []);

  // Fetch locations of other devices
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3001/api/locations')
        .then((response) => response.json())
        .then((data) => {
          setOtherLocations(data);
        })
        .catch((error) => {
          console.error('Error fetching other locations:', error);
        });
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>Track Locations of Multiple Devices on Map</h1>
      {location.error ? (
        <p style={{ color: 'red' }}>{location.error}</p>
      ) : location.latitude && location.longitude ? (
        <div>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            {/* Marker for your location */}
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>Your current location</Popup>
            </Marker>

            {/* Markers for other locations */}
            {otherLocations.map((device) => (
              <Marker
                key={device.deviceId}
                position={[device.latitude, device.longitude]}
                icon={new L.Icon({ iconUrl: 'https://example.com/device-icon.png', iconSize: [25, 25] })}
              >
                <Popup>Device {device.deviceId}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

export default Loc;
