

import React, { useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useNavigate } from "react-router-dom";

const UploadQRCode = () => {
  const [qrrData, setQrData] = useState("");
  const [fileError, setFileError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("/images/ScheduleReg.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 51, 102, 0.7)", // Overlay effect
      }}
    >
       <div
        className="p-8  shadow-lg"
        style={{
         
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay for inner div
          width: "60%", // Increased size
          padding: "40px", // Comfortable padding
          borderRadius:"30px"
        }}
      >
        {/* Title */}
        <h1
          className="text-4xl font-bold text-white mb-8 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Upload QR Code
        </h1>

        {/* Form */}
        <form>
          <div className="mb-6">
            <label
              htmlFor="qrFile"
              className="block text-lg font-medium text-white mb-4"
            >
              Upload QR Code Image
            </label>
            <input
              type="file"
              id="qrFile"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full p-3 text-sm text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
          </div>

          {isLoading && (
            <p className="text-blue-400 text-center mb-4">Processing... Please wait.</p>
          )}
          {responseMessage && (
            <div
              className={`p-4 rounded shadow text-sm mt-4 ${
                responseMessage.includes("Error")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <h2 className="font-semibold mb-2">Response:</h2>
              <p>{responseMessage}</p>
            </div>
          )}
        </form>
      </div>
     
    </div>
    
  );
};

export default UploadQRCode;
