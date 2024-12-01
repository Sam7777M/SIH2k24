import React, { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import QrCodeContext from "../pages/QrCodeContext";

const Qreg = () => {
    //const { qrData } = useContext(QrCodeContext);
    const qrData = useContext(QrCodeContext);

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
