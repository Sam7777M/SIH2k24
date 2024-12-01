import React, { useState, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const RouteOptimization = () => {
  const [map, setMap] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherConditions, setWeatherConditions] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const tomTomApiKey = "NFTQjnnCwSIGFaAlgP1pKCLqcbTwGQT5";
  const openWeatherApiKey = "60fc55efdaf97986b4e1361fb4ef8661";

  const initializeMap = () => {
    const mapInstance = tt.map({
      key: tomTomApiKey,
      container: "map",
      center: [0, 0],
      zoom: 2,
    });
    setMap(mapInstance);

    return () => mapInstance.remove();
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${tomTomApiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lon } = data.results[0].position;
        return { lat, lon };
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
    return null;
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`
      );
      const data = await response.json();

      if (data.main && data.weather && data.weather.length > 0) {
        return {
          temperature: data.main.temp,
          condition: data.weather[0].description,
        };
      } else {
        console.error("Unexpected weather API response:", data);
        return { temperature: "N/A", condition: "N/A" };
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      return { temperature: "N/A", condition: "N/A" };
    }
  };

  const fetchRoute = async () => {
    if (!startCoords || !endCoords) {
      alert("Please select both start and destination locations.");
      return;
    }

    setLoading(true);

    try {
      const weatherAtStart = await fetchWeather(startCoords.lat, startCoords.lon);
      const weatherAtEnd = await fetchWeather(endCoords.lat, endCoords.lon);

      setWeatherConditions({
        start: weatherAtStart,
        end: weatherAtEnd,
      });
     
      const routeData = await ttServices.services.calculateRoute({
        key: tomTomApiKey,
        traffic: true,
        locations: `${startCoords.lon},${startCoords.lat}:${endCoords.lon},${endCoords.lat}`,
      });

      const geoJson = routeData.toGeoJson();

      // Extract travel time in seconds and convert to minutes
      const travelTimeInSeconds = routeData.routes[0].summary.travelTimeInSeconds;
      const travelTimeInMinutes = Math.ceil(travelTimeInSeconds / 60);
      setEstimatedTime(travelTimeInMinutes);

      if (map.getSource("route")) {
        map.getSource("route").setData(geoJson);
      } else {
        map.addSource("route", {
          type: "geojson",
          data: geoJson,
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#4a90e2",
            "line-width": 6,
          },
        });
      }

      const bounds = new tt.LngLatBounds();
      geoJson.features[0].geometry.coordinates.forEach((point) => {
        bounds.extend(tt.LngLat.convert(point));
      });
      map.fitBounds(bounds, { padding: 50 });
    } catch (error) {
      console.error("Error fetching route:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartLocationChange = async (e) => {
    const value = e.target.value;
    setStartLocation(value);
    if (value) {
      const coords = await fetchCoordinates(value);
      if (coords) setStartCoords(coords);
    } else {
      setStartCoords(null);
    }
  };

  const handleEndLocationChange = async (e) => {
    const value = e.target.value;
    setEndLocation(value);
    if (value) {
      const coords = await fetchCoordinates(value);
      if (coords) setEndCoords(coords);
    } else {
      setEndCoords(null);
    }
  };

  useEffect(() => {
    if (!map) {
      initializeMap();
    }
  }, [map]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Route Optimizer</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Start Location:
          <input
            type="text"
            value={startLocation}
            onChange={handleStartLocationChange}
            placeholder="Enter start location"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <br />
        <label>
          End Location:
          <input
            type="text"
            value={endLocation}
            onChange={handleEndLocationChange}
            placeholder="Enter end location"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <br />
        <button
          onClick={fetchRoute}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "Get Best Route"}
        </button>
      </div>

      {weatherConditions && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Weather Conditions:</h3>
          <p>
            <strong>Start:</strong> {weatherConditions.start.temperature}°C,{" "}
            {weatherConditions.start.condition}
          </p>
          <p>
            <strong>End:</strong> {weatherConditions.end.temperature}°C,{" "}
            {weatherConditions.end.condition}
          </p>
        </div>
      )}

      {estimatedTime !== null && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Estimated Travel Time:</h3>
          <p>
            <strong>{estimatedTime} minutes</strong>
          </p>
        </div>
      )}

      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default RouteOptimization;
