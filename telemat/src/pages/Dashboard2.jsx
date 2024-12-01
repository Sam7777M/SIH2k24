import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Live from './Live'; // Assuming you have a Navbar component
import { Link } from 'react-router-dom';

const Dashboard2 = () => {
  // State to store fetched data
  const [dashboardData, setDashboardData] = useState({
    overviewMetrics: {
      parcelsInTransit: 0,
      completedDeliveries: 0,
      pendingDeliveries: 0,
    },
    fuelEfficiency: {
      averageFuelConsumption: 0,
      fuelCostTrends: [],
    },
    capacityUtilization: {
      capacityUsed: 0,
      capacityLeft: 0,
      truckID: '',
    },
    deliveryInfo: {
      trackingNumber: '',
      pickupLocation: '',
      contactPerson: '',
      destination: '',
    },
    deliveryPackageInfo: {
      numberOfEntities: 0,
      parcelWeight: 0,
      parcelVolume: 0,
    },
    mapInfo: {
      coordinates: '',
      checkpoints: 0,
    },
  });

  const [loading , setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/save-parcel');
        if (response.ok) {
          const data = await response.json();

          // Map or transform the data to match the expected structure if necessary
          setDashboardData((prevState) => ({
            ...prevState,
            overviewMetrics: {
              parcelsInTransit: data.parcelsInTransit || 0,
              completedDeliveries: data.completedDeliveries || 0,
              pendingDeliveries: data.pendingDeliveries || 0,
            },
          }));
        } else {
          console.error('Failed to fetch data', response.status);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-gray-200 to-blue-100 p-4">
      {/* Navbar */}
      <Navbar
        style={{
          backgroundColor: 'darkblue',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      />

      {/* Rectangle Div */}
      <div className="h-16  bg-[rgba(30,45,52,1)] flex items-center justify-start px-8 rounded-full mt-20 relative"
       style={{ width: "1300px", left:"100px" }} // Decreased width
>
  <div className="w-4 h-4 bg-[rgba(30,45,52,1)] rounded-full mr-10"></div>
  <span className="text-white">Dashboard</span>

  {/* Ellipse 12 */}
  <div 
  className ="absolute w-20 h-20 -top-2 left-0 rounded-full bg-[#1e2d34] sm:w-16 sm:h-16 sm:-top-1 md:w-20 md:h-20 md:-top-2">
</div>

</div>


      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4 mt-5">
      
        {/* 1st Div (Overview Metrics, Fuel Efficiency, Capacity Utilization) */}
<div className="flex">
  {/* Left side for Overview Metrics */}
  <div 
  className="text-white p-4 rounded-lg mb-4 bg-[#3e4a56] w-48 h-[409px] relative left-12 top-0 gap-5 opacity-100 sm:w-40 sm:h-[350px] sm:left-8 md:w-48 md:h-[409px] md:left-12">


    {/* Overlapping div */}
    <div 
  className="absolute top-0 left-0 w-48 h-10 bg-[#2A3644] flex items-center justify-center font-semibold text-white italic text-[16px] leading-[19.36px] rounded-t-[20px] z-20 sm:w-40 sm:h-8 sm:text-[14px] sm:leading-[18px] md:w-48 md:h-10 md:text-[16px] md:leading-[19.36px]">


      Overview Metrics
    </div>

    <h2 className="text-xl font-bold mb-4 ">Overview Metrics</h2>
    <div className="space-y-20">
      <div>
        <p>Total Parcels in Transit: {dashboardData.overviewMetrics.parcelsInTransit}</p>
      </div>
      <div>
        <p>Completed Deliveries Today: {dashboardData.overviewMetrics.completedDeliveries}</p>
      </div>
      <div>
        <p>Pending Deliveries: {dashboardData.overviewMetrics.pendingDeliveries}</p>
      </div>
    </div>
  </div>

  {/* Right side for Fuel Efficiency and Capacity Utilization */}
  <div className="flex flex-col">
    {/* Fuel Efficiency */}
    <div
      className="p-4 rounded-md mb-4"
      style={{
        backgroundColor: 'rgba(62, 74, 86, 1)',
        width: '200px',
        height: '242px',
        top: '0px',
        left: '65px',
        gap: '0px',
        borderRadius: '20px',
        opacity: '1', // Set to 1 for visibility
        position: 'relative',
      }}
    >
      <p> {dashboardData.fuelEfficiency.averageFuelConsumption}</p>
      <p> {dashboardData.fuelEfficiency.fuelCostTrends.join(', ')}</p>

      {/* Original Overlapping div */}
      <div
        style={{
          backgroundColor: 'rgba(42, 54, 68, 1)',
          width: '200px',
          height: '40px',
          top: '0px',
          left: '0px',
          gap: '0px',
          borderRadius: '20px 20px 0px 0px',
          opacity: '1',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '16px',
          fontStyle: 'italic',
          lineHeight: '19.36px',
          textAlign: 'left',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
          color: 'white',
          zIndex: 2,
        }}
      >
        Fuel Efficiency
      </div>

      {/* Light div overlapping */}
      <div
        style={{
          background: 'rgba(80, 96, 106, 1)',
          width: '162px',
          height: '26px',
          top: '150px',
          left: '20px',
          gap: '0px',
          borderRadius: '10px',
          opacity: '1',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '11px',
          color: 'white',
          zIndex: 2,
        }}
      >
        Average fuel consumption
      </div>

      {/* Light div overlapping */}
      <div
        style={{
          background: 'rgba(80, 96, 106, 1)',
          width: '162px',
          height: '26px',
          top: '190px',
          left: '20px',
          gap: '0px',
          borderRadius: '10px',
          opacity: '1',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '11px',
          color: 'white',
          zIndex: 2,
        }}
      >
        Fuel Cost Trends
      </div>
    </div>

    {/* Capacity Utilization */}
    <div
      className="p-4 rounded-md"
      style={{
        background: 'rgba(62, 74, 86, 1)',
        width: '200px',
        height: '160px',
        top: '430px',
        left: '280px',
        gap: '0px',
        borderRadius: '20px',
        opacity: '0px',
        position: 'absolute',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(42, 54, 68, 1)',
          width: '200px',
          height: '45px',
          top: '0px',
          left: '0px',
          gap: '0px',
          borderRadius: '20px 20px 0px 0px',
          opacity: '1',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '16px',
          fontStyle: 'italic',
          lineHeight: '19.36px',
          textAlign: 'center',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
          color: 'white',
          zIndex: 2,
        }}
      >
        Capacity Utilization <br /> Metrics
      </div>

      
      <div
        className="p-9"
        style={{
          opacity: '0px',
          fontSize: '11px',
          fontWeight: '400',
          lineHeight: '13.31px',
          textAlign: 'center',
          textUnderlinePosition: 'from-font',
          textDecorationSkipInk: 'none',
          color: 'white',
        }}
      >
        <p>
          {dashboardData.capacityUtilization.capacityLeft}% capacity left unused in Truck {' '}
          {dashboardData.capacityUtilization.truckID}
        </p>
      </div>
{/* Added New Div */}
<div
  style={{
    width: '414px',
    height: '83px',
    top: '170px',
    right: '0px',
    gap: '0px',
    borderRadius: '20px',
    opacity: '0px',
    background: 'rgba(62, 74, 86, 1)',
    position: 'absolute', // Required for positioning
    display: 'flex',
    justifyContent: 'center', // Center the ellipses horizontally
    alignItems: 'center', // Vertically center the ellipses
    padding: '0 10px', // Optional padding to add spacing around the div
  }}
>
  {/* Ellipse 1 */}
  <Link
  to="/schedule1" // The link you want to navigate to
  style={{
    position: 'absolute',
    width: '50px',
    height: '50px',
    borderRadius: '50%', // Circular shape
    backgroundColor: 'rgba(54, 64, 74, 1)',
    opacity: '1', // Set opacity to 1 for visibility
    backgroundSize: 'cover',
    top: '5px',
    mixBlendMode: 'hard-light', // Apply hard light blend mode
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)', // Box shadow
    backgroundPosition: 'center',
    backgroundImage: 'url(/public/images/e1.png)', // Image inside the ellipse
    left: '40px', // Position first ellipse on the left
    display: 'block', // Ensure the link is a block-level element so that it occupies the area of the div
  }}
>
  {/* Optionally, you can add content or a tooltip here */}
</Link>
   {/* Schedule a Delivery text below Ellipse 1 */}
   <div
    style={{
      position: 'absolute',
      top: '60px', // Adjust this value to position text below the ellipse
      right: '143px', // Keep the text aligned with the ellipse
      color: 'rgba(255, 255, 255, 1)', // Text color
      fontSize: '6px', // Font size as specified
      fontWeight: '400', // Set font weight to 400
      lineHeight: '7.26px', // Set line height
      textAlign: 'center', // Center the text
      width: '100%', // Ensure text width matches the container's width
    }}
  >
    Schedule a <br /> Delivery
  </div>


  {/* Ellipse 2 */}
  <div
    style={{
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%', // Circular shape
      backgroundColor: 'rgba(54, 64, 74, 1)', // Placeholder color
      opacity: '1', // Set opacity to 1 for visibility
      backgroundSize: 'cover',
      top:'5px',
      mixBlendMode: 'hard-light', // Apply hard light blend mode
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)', // Box shadow
      backgroundPosition: '',
      backgroundImage: 'url(/public/images/e2.png)', // Image inside the ellipse
      left: '135px', // Adjust position for overlap
    }}
  ></div>

<div
    style={{
      position: 'absolute',
      top: '60px', // Adjust this value to position text below the ellipse
      right: '46px', // Keep the text aligned with the ellipse
      color: 'rgba(255, 255, 255, 1)', // Text color
      fontSize: '6px', // Font size as specified
      fontWeight: '400', // Set font weight to 400
      lineHeight: '7.26px', // Set line height
      textAlign: 'center', // Center the text
      width: '100%', // Ensure text width matches the container's width
    }}
  >
    Generate MIS  <br /> Reports
  </div>

  {/* Ellipse 3 */}
  <div
    style={{
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%', // Circular shape
      backgroundColor: 'rgba(54, 64, 74, 1)',
      opacity: '1', // Set opacity to 1 for visibility
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      top:'5px',
      mixBlendMode: 'hard-light', // Apply hard light blend mode
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)', // Box shadow
      backgroundImage: 'url(/public/images/e3.png)', // Image inside the ellipse
      left: '230px', // Adjust position for overlap
    }}
  ></div>
<div
    style={{
      position: 'absolute',
      top: '60px', // Adjust this value to position text below the ellipse
      left: '50px', // Keep the text aligned with the ellipse
      color: 'rgba(255, 255, 255, 1)', // Text color
      fontSize: '6px', // Font size as specified
      fontWeight: '400', // Set font weight to 400
      lineHeight: '7.26px', // Set line height
      textAlign: 'center', // Center the text
      width: '100%', // Ensure text width matches the container's width
    }}
  >
   Alerts &  <br />  Notifications
  </div>

  {/* Ellipse 4 */}
  <div
    style={{
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%', // Circular shape
      backgroundColor: 'rgba(54, 64, 74, 1)',
      opacity: '1', // Set opacity to 1 for visibility
      backgroundSize: 'cover',
      mixBlendMode: 'hard-light', // Apply hard light blend mode
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)', // Box shadow
      backgroundPosition: 'center',
      backgroundImage: 'url(/public/images/e4.png)', // Image inside the ellipse
      left: '320px', // Adjust position for overlap
      top:'5px',
    }}
  ></div>
  <div
    style={{
      position: 'absolute',
      top: '60px', // Adjust this value to position text below the ellipse
      left: '138px', // Keep the text aligned with the ellipse
      color: 'rgba(255, 255, 255, 1)', // Text color
      fontSize: '6px', // Font size as specified
      fontWeight: '400', // Set font weight to 400
      lineHeight: '7.26px', // Set line height
      textAlign: 'center', // Center the text
      width: '100%', // Ensure text width matches the container's width
    }}
  >
   Check-In & <br />Check-Out QR
  </div>
</div>



    </div>
  </div>
</div>


{/* 2nd Div (Map) */}
<div>
  <Live /> {/* The map component */}

  {/* Checkpoint Information Section */}
  <div
    style={{
      width: "101px",
      height: "28px",
      position: "absolute", // Overlay on top of the map
      top: "650px",
      left: "510px",
      borderRadius: "5px",
      mixBlendMode: "plus-darker", // Blend mode
      backgroundColor: "rgba(71, 98, 117, 1)",
      color: "white", // Ensure text is visible
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000, // Ensures the div appears above the map
      flexDirection: "column",
    }}
  >
    <div style={{ textAlign: "center", fontSize: "12px" }}>
      {dashboardData.mapInfo.coordinates} 🚩
      {dashboardData.mapInfo.checkpoints} Checkpoints
    </div>
  </div>

  {/* Ellipse Navigation Buttons */}
  <div style={{ position: "relative",  }}>
    {/* Ellipse 1 - Previous */}
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "350px",
        left: "0px",
        borderRadius: "50%",
        mixBlendMode: "hard-light", // Blend mode
        backgroundColor: "rgba(54, 64, 74, 1)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => handleNavigation("previous")} // Click handler for previous
    >
      &#8592;
    </div>

    {/* Ellipse 2 - Page 1 */}
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "350px",
        left: "100px",
        borderRadius: "50%",
        mixBlendMode: "hard-light", // Blend mode
        backgroundColor: "rgba(54, 64, 74, 1)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      1
    </div>

    {/* Ellipse 3 - Page 2 */}
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "350px",
        left: "202px",
        borderRadius: "50%",
        mixBlendMode: "hard-light", // Blend mode
        backgroundColor: "rgba(54, 64, 74, 1)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      2
    </div>

    {/* Ellipse 4 - Page 3 */}
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "350px",
        left: "305px",
        borderRadius: "50%",
        mixBlendMode: "hard-light", // Blend mode
        backgroundColor: "rgba(54, 64, 74, 1)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      3
    </div>

    {/* Ellipse 4 - Next */}
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: "350px",
        left: "410px",
        borderRadius: "50%",
        mixBlendMode: "hard-light", // Blend mode
        backgroundColor: "rgba(54, 64, 74, 1)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => handleNavigation("next")} // Click handler for next
    >
      &#8594;
    </div>
  </div>
</div>


        {/* 3rd Div (Delivery Information and Delivery Package Information) */}
        <div className="flex flex-col">
         {/* Delivery Information */}
<div
  className="bg-gray-800 text-white p-4 rounded-lg mb-4"
  style={{
    width: "466px",
    height: "230px",
    top: "205px",
    left: "932px",
    gap: "0px",
    borderRadius: "20px ", 
    background: "rgba(62, 74, 86, 1)", // Background color
     
  }}
>
<div
      style={{
        backgroundColor: 'rgba(42, 54, 68, 1)',
        width: '466px',
        height: '40px',
        bottom: '475px',
        right: '41px',
        gap: '0px',
        borderRadius: '20px 20px 0px 0px',
        opacity: '1',
        position: 'absolute', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: '16px',
        fontStyle: 'italic',
        lineHeight: '19.36px',
        textAlign: 'left',
        textUnderlinePosition: 'from-font',
        textDecorationSkipInk: 'none',
        color: 'white',
        zIndex: 2,
      }}
    >
     Delivery Information
    </div>
  
    <p className="mt-12">📦Parcel ID/Tracking Number: {dashboardData.deliveryInfo.trackingNumber}</p>
<p className="mt-5">⛟  Pickup: {dashboardData.deliveryInfo.pickupLocation}</p>
<p className="mt-5">📞 Driver/ Vehicle Assigned : {dashboardData.deliveryInfo.contactPerson}</p>
<p className="mt-5">📍 Destination: <span>{dashboardData.deliveryInfo.destination}</span></p>

 
</div>


          {/* Delivery Package Information */}
          <div
  className="bg-gray-800 text-white p-4 rounded-lg mb-4"
  style={{
    width: "466px",
    height: "230px",
    top: "20px",
    left: "2px",
    gap: "0px",
    position: 'relative', 
    borderRadius: "20px ",
    background: "rgba(62, 74, 86, 1)", // Background color
     
  }}
>
<div
      style={{
        backgroundColor: 'rgba(42, 54, 68, 1)',
        width: '466px',
        height: '40px',
        bottom: '190px',
        right: '0px',
        gap: '0px',
        borderRadius: '20px 20px 0px 0px',
        opacity: '1',
        position: 'absolute', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: '16px',
        fontStyle: 'italic',
        lineHeight: '19.36px',
        textAlign: 'left',
        textUnderlinePosition: 'from-font',
        textDecorationSkipInk: 'none',
        color: 'white',
        zIndex: 2,
      }}
    >
     Delivery Package Information
    </div>
    <div
  style={{
    display: "flex",
    justifyContent: "space-between", // Ensures spacing between elements
    alignItems: "flex-start", // Align items to the top
    padding: "20px 15px",
    fontSize: "10px",
    fontWeight: "bold",
    lineHeight: "10px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
    color: "white",
    position: "absolute",
    top: "30px", // Positioning below the header
    left: "0px",
    width: "100%",
  }}
>
  {/* First Column */}
  <div>
    <span>Number of Entities:</span>
    <div
      style={{
        fontSize: "8px",
        fontWeight: "normal",
        marginTop: "5px",
      }}
    >
      <p>Total Parcels:</p>
      <p>Individual Items:</p>
    </div>
  </div>

  {/* Second Column */}
  <div>
    <span>Parcel Weight:</span>
    <div
      style={{
        fontSize: "8px",
        fontWeight: "normal",
        marginTop: "5px",
      }}
    >
      <p>Total Weight:</p>
      <p>Weight in Tonn:</p>
    </div>
  </div>

  {/* Third Column */}
  <div>
    <span>Parcel Volume:</span>
    <div
      style={{
        fontSize: "8px",
        fontWeight: "normal",
        marginTop: "5px",
      }}
    >
      <p>Total Volume:</p>
      <p>Average Parcel Volume:</p>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;