import React, { useContext, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import QrCodeContext from "../pages/QrCodeContext";

const Qreg = () => {
    const { qrData } = useContext(QrCodeContext);

    useEffect(() => {
        if (qrData) {
            // Save the QR data to the database
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
                <div className="flex justify-center mt-10">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <QRCodeSVG value={qrData} size={200} />
                    </div>
                </div>
            ) : (
                <p className="text-white text-center mt-10">No QR Code available.</p>
            )}
        </div>
    );
};

export default Qreg;
