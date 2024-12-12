import React, { useState, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";

const UploadQRCode = () => {
  const [qrrData, setQrData] = useState("");
  const [fileError, setFileError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // Store the user details
  const [totalWeight, setTotalWeight] = useState(0); // Track the total weight
  const [capacity, setCapacity] = useState(20); // Max truck capacity (20kg)
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setFileError("Please upload a file.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFileError("Invalid file type. Please upload an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size too large. Please upload a file smaller than 5MB.");
      return;
    }

    setFileError("");
    decodeQRCode(file);
  };

  const decodeQRCode = async (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imgSrc = event.target.result;

      setIsLoading(true);
      try {
        const codeReader = new BrowserQRCodeReader();
        const result = await codeReader.decodeFromImageUrl(imgSrc);

        setQrData(result.text);
        localStorage.setItem("qrrData", result.text);
    
        const response = await fetch("http://localhost:5000/api/handleQrData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrrData: result.text }),
        });

        const data = await response.json();
        if (response.ok) {
          setResponseMessage(data.message);
          // Save user details
          setUserData({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            vehicleNumber: data.vehicleNumber,
            truckCapacity: data.truckCapacity,
          });

          // Check if the truck capacity is full
          if (totalWeight + data.weight > capacity) {
            setResponseMessage("Truck capacity is full. Cannot add more weight.");
          } else {
            // Update total weight if not full
            setTotalWeight((prevWeight) => prevWeight + data.weight);
            setResponseMessage(`Added weight: ${data.weight}kg. Current total: ${totalWeight + data.weight}kg.`);
          }

          navigate("/aopt");
        } else {
          setResponseMessage(`Error: ${data.message || "Unexpected server error."}`);
        }
      } catch (error) {
        console.error("Error decoding QR Code:", error);
        setFileError("Could not decode the QR code. Ensure it's valid.");
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload QR Code</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="qrFile" className="block text-lg font-medium mb-2">
            Upload QR Code Image
          </label>
          <input
            type="file"
            id="qrFile"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700"
          />
          {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
        </div>

        {isLoading && <p className="text-blue-500">Loading...</p>}
        {responseMessage && (
          <div
            className={`p-4 rounded shadow ${
              responseMessage.includes("Error") ? "bg-red-100" : "bg-green-100"
            }`}
          >
            <h2 className="font-semibold">Response:</h2>
            <p className="text-sm">{responseMessage}</p>
          </div>
        )}

        {userData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">User Details:</h2>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Vehicle Number: {userData.vehicleNumber}</p>
            <p>Truck Capacity: {userData.truckCapacity} kg</p>
            <p>Total Weight: {totalWeight} kg</p>
            {totalWeight >= capacity && <p className="text-red-500">Truck is full!</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadQRCode;