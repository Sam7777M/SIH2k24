import React, { useContext, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom"; // Import Link for navigation
import QrCodeContext from "../pages/QrCodeContext";

const Qregt = () => {
    const { qrData } = useContext(QrCodeContext);

    useEffect(() => {
        if (qrData) {
            const saveQrToDatabase = async () => {
                try {
                    const response = await fetch("http://localhost:5000/api/saveQr", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ qrData }),
                    });

                    const result = await response.json();
                    if (response.ok) {
                        console.log("QR Code saved to database:", result);
                    } else {
                        console.error("Failed to save QR Code:", result);
                    }
                } catch (error) {
                    console.error("Error saving QR Code to database:", error);
                }
            };

            saveQrToDatabase();
        }
    }, [qrData]);

    const handleDownload = () => {
        const canvas = document.createElement("canvas");
        const svg = document.querySelector("svg");
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "qrcode.png";
            link.click();
        };

        img.src = url;
    };

    return (
        <div
            className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[130vh] bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
        >
            <h1 className="text-white text-center text-4xl font-bold mt-8">
                Your Scheduled Delivery QR Code
            </h1>
            {qrData ? (
                <div className="flex flex-col items-center mt-10">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        {/* Make the QR Code clickable */}
                        <Link to="/choosepartnert"> {/* Replace "/qr-details" with your desired route */}
                            <QRCodeSVG value={qrData} size={200} />
                        </Link>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Download QR Code
                    </button>
                </div>
            ) : (
                <p className="text-white text-center mt-10">No QR Code available.</p>
            )}
        </div>
    );
};

export default Qregt;
