import React, { useEffect } from 'react';

const LiveTracking = () => {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Send location to backend
            fetch('http://localhost:5000/api/update-location', { // Updated URL
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to update location');
                }
                console.log('Location updated successfully');
              })
              .catch((error) => {
                console.error('Error updating location:', error);
              });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          {
            enableHighAccuracy: true,
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  return <div>Tracking your location...</div>;
};

export default LiveTracking;
