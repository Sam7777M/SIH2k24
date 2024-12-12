import React, { useState, useEffect } from 'react';
import { FaTruck, FaFileAlt, FaBell, FaQrcode } from "react-icons/fa";
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Live from './Live';

const Dashboard3 = () => {
  const [deliveries, setDeliveries] = useState({
    inTransit: 3,
    completedToday: 2,
    pending: 1,
  });

  const [receiveDelivery, setReceiveDelivery] = useState(
    Array.from({ length: 8 }, (_, idx) => `R: RK-DEL-MUM-${12345 + idx}`)
  );

  const [capacityUtilization, setCapacityUtilization] = useState({
    used: 53,
    unused: 47,
    truckId: 'A123',
  });

  const [currentRoute, setCurrentRoute] = useState({
    parcelId: 'TRK-DEL-MUM-12345',
    pickup: 'Department of Posts, Central Sorting Office',
    destination: 'Regional Distribution Hub',
    name: 'Ravi Kumar',
  });

  const [packageInfo, setPackageInfo] = useState({
    entities: 2,
    weight: '10kg',
     
  });

  const [uniqueEmails, setUniqueEmails] = useState([]);

  useEffect(() => {
    // Fetch unique emails from the backend
    const fetchUniqueEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fetchQrData");
        console.log("!!1", response)
        const firstObject = response.data[0];

// Parse the qrrData string to get a JavaScript object
const parsedData = JSON.parse(firstObject.qrrData);

// Access the entities value
const entities = parsedData.entities;
const weight = parsedData.weight;
const name = parsedData.name;
const destination = parsedData.destination;
const uniqueId =parsedData.uniqueId;
const pickup =  parsedData.pickupDate;


        setPackageInfo({
          entities: entities,
          weight: weight,

          
        });
        setCurrentRoute({
          pickup: pickup,
          name: name,
          destination: destination,
          parcelId: uniqueId,
        })
        setUniqueEmails(response.data.emails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchUniqueEmails();
  }, []);

  const handleShowMoreDeliveries = () => {
    setReceiveDelivery((prev) => [
      ...prev,
      ...Array.from({ length: 5 }, (_, idx) => `R: RK-DEL-MUM-${12353 + idx}`),
    ]);
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/update", {
        driver: currentRoute.driver,
        pickup: currentRoute.pickup,
        destination: currentRoute.destination,
      });
      if (response.data.message) {
        alert(response.data.message);
        setCurrentRoute(response.data.data); // Update state with the new details
      }
    } catch (error) {
      console.error("Error updating dashboard details:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-[#1c2938] rounded-full flex items-center p-2 gap-4 w-full  mt-20">
        <div
          className="w-10 h-10 rounded-full bg-center bg-cover"
          style={{
            backgroundImage: "url('path/to/your/image.png')",
          }}
        ></div>
        <div className="flex flex-col w-full">
          <span className="text-white text-base font-bold">Central Sorting Office</span>
          <div className="w-4/5 h-1 bg-[#3c5161] rounded-full mt-1">
            <div className="w-1/2 h-full bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="p-20 grid grid-cols-4 gap-4">
        <div className="bg-[#203a46] text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Overview Metrics</h2>
          <div className="mt-4">
            <div className="mb-4">
              <p>Total Deliveries in Transit: {deliveries.inTransit}</p>
              <div className="mt-2 flex items-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center">
                  <span className="text-xl">{deliveries.completedToday}</span>
                </div>
                <p className="ml-4">Completed Deliveries Today</p>
              </div>
            </div>
            <div className="">
              <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
                <span className="text-xl">{deliveries.pending}</span>
              </div>
              <p className="ml-4">Pending Deliveries</p>
            </div>
          </div>
        </div>

        <div className="bg-[#203a46] text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Receive Delivery</h2>
          <ul className="mt-4 text-sm">
            {receiveDelivery.map((delivery, idx) => (
              <li key={idx}>{delivery}</li>
            ))}
          </ul>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleShowMoreDeliveries}
          >
            Show More
          </button>
        </div>

        <div className="bg-[#203a46] text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Capacity Utilization Metrics</h2>
          <div className="mt-4 flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex justify-center items-center">
              <span className="text-xl">{capacityUtilization.used}%</span>
            </div>
            <p>{capacityUtilization.unused}% capacity left unused in Truck #{capacityUtilization.truckId}</p>
          </div>
        </div>

        <div className="bg-[#d9e8ef] flex justify-center items-center py-8">
          <div className="flex justify-around items-center w-3/4 bg-[#1b3b4a] py-6 px-4 rounded-lg">
            <div className="flex flex-col items-center text-yellow-400 space-y-2">
              <div className="bg-[#203a46] w-16 h-16 rounded-full flex justify-center items-center">
                <FaTruck className="text-3xl" />
              </div>
              <p className="text-sm font-medium text-white">Schedule a Delivery</p>
  <Link to="/schedule1">
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Go to Delivery Page
    </button>
  </Link>
            </div>
            <div className="flex flex-col items-center text-yellow-400 space-y-2">
              <div className="bg-[#203a46] w-16 h-16 rounded-full flex justify-center items-center">
                <FaFileAlt className="text-3xl" />
              </div>
              <p className="text-sm font-medium text-white">Generate MIS Reports</p>
            </div>
            <div className="flex flex-col items-center text-yellow-400 space-y-2">
              <div className="bg-[#203a46] w-16 h-16 rounded-full flex justify-center items-center">
                <FaBell className="text-3xl" />
              </div>
              <p className="text-sm font-medium text-white">Alerts & Notifications</p>
            </div>
            <div className="flex flex-col items-center text-yellow-400 space-y-2">
              <div className="bg-[#203a46] w-16 h-16 rounded-full flex justify-center items-center">
                <FaQrcode className="text-3xl" />
              </div>
              <p className="text-sm font-medium text-white">Check-In/Out QR</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 row-span-2 bg-white rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Current Route</h2>
            <div className="bg-gray-200 mt-4 w-full h-96"><Live/></div>
            <div className="mt-4">
  <h3 className="text-sm font-semibold">Update Details</h3>
  <input
    type="text"
    placeholder="Pickup Location"
    value={currentRoute.pickup}
    onChange={(e) => setCurrentRoute({ ...currentRoute, pickup: e.target.value })}
    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Destination"
    value={currentRoute.destination}
    onChange={(e) => setCurrentRoute({ ...currentRoute, destination: e.target.value })}
    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Driver Name"
    value={currentRoute.driver}
    onChange={(e) => setCurrentRoute({ ...currentRoute, driver: e.target.value })}
    className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onClick={handleUpdateDetails}
  >
    Update Details
  </button>
</div>

          </div>
        </div>

        <div className="bg-[#203a46] text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Package Information</h2>
          <div className="mt-4">
            <p>Entities: {packageInfo.entities}</p>
            <p>Weight: {packageInfo.weight}</p>
            
          </div>
        </div>

        <div className="bg-[#203a46] text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Unique Emails</h2>
          <ul className="mt-4 text-sm">
            
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard3;
