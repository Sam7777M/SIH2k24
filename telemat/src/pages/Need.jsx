Step-by-Step Implementation:
Frontend (ReactJS):
Collecting Location Data:
javascript
Copy code
import React, { useEffect } from 'react';

const LiveTracking = () => {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Send location to backend
            fetch('/api/update-location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
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
Backend (Node.js/Express):
Receiving Location Updates:
javascript
Copy code
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/trackingDB', { useNewUrlParser: true });

app.use(bodyParser.json());

const locationSchema = new mongoose.Schema({
  userId: String,
  latitude: Number,
  longitude: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model('Location', locationSchema);

// Endpoint to update location
app.post('/api/update-location', async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  await Location.findOneAndUpdate(
    { userId },
    { latitude, longitude, updatedAt: new Date() },
    { upsert: true } // Create new record if not found
  );

  res.status(200).send('Location updated');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));
3. Database (MongoDB):
Use MongoDB to store and update user location data as shown in the backend code above.
4. Displaying the Location (Google Maps in React):
javascript
Copy code
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ userId }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(/api/get-location/${userId});
      const data = await response.json();
      setLocation({ lat: data.latitude, lng: data.longitude });
    };

    fetchLocation();
  }, [userId]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ height: '400px', width: '100%' }}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
5. WebSocket for Real-Time Updates:
For real-time updates, use Socket.io:

javascript
Copy code
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('locationUpdate', (data) => {
    io.emit('updateLocation', data); // Broadcast to all clients
  });
});