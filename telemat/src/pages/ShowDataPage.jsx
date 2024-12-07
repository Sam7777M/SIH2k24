import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDataPage = () => {
  const { id } = useParams();  // Get the ID from the URL
  const [userData, setUserData] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to store error message

  // Fetch user data when the component mounts or the `id` changes
  useEffect(() => {
    // Check if `id` is valid before making the request
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/partner/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data); // Update the state with the fetched data
      } catch (error) {
        setError("Error fetching user data"); // Set error message if fetch fails
      }
    };

    if (id) {
      fetchUserData(); // Call fetch only if ID is present
    } else {
      setError("Invalid ID");
    }
  }, [id]); // Re-run effect whenever `id` changes

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  if (!userData) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div>
      <h1>User Data</h1>
      <p><strong>Company Name:</strong> {userData.companyName}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>City:</strong> {userData.city}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Truck:</strong> {userData.truck}</p>
      <p><strong>Preferred From:</strong> {userData.preferredFrom}</p>
      <p><strong>Preferred To:</strong> {userData.preferredTo}</p>
      <p><strong>Preferred Cost:</strong> {userData.preferredCost}</p>
    </div>
  );
};

export default ShowDataPage;
