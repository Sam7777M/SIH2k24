import React, { useState, useEffect } from "react";
import axios from "axios"; // Map placeholder, assuming integration
import Live from "./Live";

const Dashboard = () => {
  const [driverIndex, setDriverIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/partner");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const nextDriver = () => {
    setDriverIndex((prev) => (prev + 1) % data.length);
  };

  const prevDriver = () => {
    setDriverIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  const driver = data[driverIndex];

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <header className="bg-blue-900 text-white p-5 rounded-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Central Sorting Office</h1>
        <nav>
          <ul className="flex space-x-5">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">Services</li>
            <li className="hover:underline">Dashboard</li>
            <li className="hover:underline">Contact Us</li>
          </ul>
        </nav>
      </header>

      <main className="mt-5 grid grid-cols-12 gap-5">
        {/* Overview Section */}
        <section className="col-span-3 bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Overview Metrics</h2>
          <p>Total Deliveries in Transit: 3</p>
          <p>Completed Deliveries Today: 2</p>
          <p>Pending Deliveries: 1</p>
        </section>

        {/* Vehicle Health */}
        <section className="col-span-3 bg-white shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">Vehicle Health</h2>
          <p>Tire Pressure: Good</p>
          <p>Engine Temperature: Normal</p>
          <p>Fuel Level: Full</p>
          <p>Fuel Cost Trends: Stable</p>
        </section>

        {/* Map Section */}
        <section className="col-span-6">
          <Live />
        </section>

        {/* Delivery Info */}
        <section className="col-span-12 grid grid-cols-12 gap-5 mt-5">
          {/* Left */}
          <div className="col-span-6 bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <p>Driver Name: {driver.name}</p>
            <p>Vehicle: {driver.truck}</p>
            <p>Preferred From: {driver.preferredFrom}</p>
            <p>Preferred To: {driver.preferredTo}</p>
            <p>Preferred Cost: {driver.preferredCost}</p>
          </div>

          {/* Right */}
          <div className="col-span-6 bg-white shadow-md rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4">Package Information</h2>
            <p>Weight: 150kg</p>
            <p>Volume: 30m³</p>
            <p>Category: Electronics</p>
            <p>Specifications: Fragile</p>
          </div>
        </section>
      </main>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={prevDriver}
          className="bg-blue-600 text-white px-4 py-2 rounded-l-lg hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          onClick={nextDriver}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
