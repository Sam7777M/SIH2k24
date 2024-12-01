import React, { useState } from "react"; // Ensure useState is imported only once
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader"; // Import QR reader component
import axios from "axios"; // Import Axios for API calls

const ParcelQRGenerator = () => {
  const [parcelData, setParcelData] = useState({
    parcelId: "",
    pickupPoint: "",
    destinationPoint: "",
    driverVehicle: "",
    numberOfEntities: "",
    parcelWeight: "",
    parcelVolume: "",
  });

  const [qrData, setQrData] = useState("");
  const [scannedData, setScannedData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelData({ ...parcelData, [name]: value });
  };

  // Generate QR Code data and save to MongoDB
  const handleGenerateQRCode = async () => {
    const qrString = JSON.stringify(parcelData);
    setQrData(qrString);

    // Save data to MongoDB
    try {
      await axios.post("http://localhost:5000/api/save-parcel", parcelData);
      alert("Parcel data saved to database!");
    } catch (error) {
      console.error("Error saving parcel data:", error);
      alert("Failed to save parcel data.");
    }
  };

  // Handle QR code scan result
  const handleScan = (data) => {
    if (data) {
      const parsedData = JSON.parse(data); // Parse the scanned JSON string
      setScannedData(parsedData); // Set the scanned data in state
    }
  };

  // Handle error during QR scan
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Parcel QR Code Generator</h2>

      {/* Form for generating QR code */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          name="parcelId"
          placeholder="Parcel ID or Tracking Number"
          value={parcelData.parcelId}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="pickupPoint"
          placeholder="Pickup Point"
          value={parcelData.pickupPoint}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="destinationPoint"
          placeholder="Destination Point"
          value={parcelData.destinationPoint}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="driverVehicle"
          placeholder="Driver/Vehicle Assigned"
          value={parcelData.driverVehicle}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          name="numberOfEntities"
          placeholder="Number of Entities"
          value={parcelData.numberOfEntities}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="parcelWeight"
          placeholder="Parcel Weight"
          value={parcelData.parcelWeight}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="parcelVolume"
          placeholder="Parcel Volume"
          value={parcelData.parcelVolume}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleGenerateQRCode}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Generate QR Code
        </button>
      </div>

      {qrData && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>QR Code:</h3>
          <QRCodeSVG value={qrData} size={200} />
        </div>
      )}

      {/* QR Reader for scanning the QR code */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>Scan the QR Code:</h3>
        <QrReader
          delay={300}
          style={{ width: "100%" }}
          onScan={handleScan}
          onError={handleError}
        />
      </div>

      {/* Display scanned data */}
      {scannedData && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Scanned Parcel Information:</h3>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ParcelQRGenerator;
