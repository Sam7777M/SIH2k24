import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

const FleetCard = ({ fleet }) => {
    const handleChoosePartner = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    partnerId: fleet._id,
                    message: `We need a truck from ${fleet.preferredFrom} to ${fleet.preferredTo}.`,
                }),
            });

            if (!response.ok) throw new Error("Failed to send message");
            alert("Message sent to the partner's dashboard!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md border p-4">
            <img
                src={fleet.image || "./public/images/partner1.jpg"}
                alt="Fleet"
                className="w-full h-40 object-cover"
            />
            <h3 className="text-lg font-semibold">{fleet.companyName}</h3>
            <p>Preferred Routes: {fleet.preferredFrom} - {fleet.preferredTo}</p>
            <p>Cost: {fleet.preferredCost || "N/A"}</p>
            <button
                onClick={handleChoosePartner}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Choose Partner
            </button>
        </div>
    );
};

const ChoosePartner = () => {
    const [fleetData, setFleetData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFleetData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/partner");
                if (!response.ok) throw new Error("Failed to fetch fleet data");
                const data = await response.json();
                setFleetData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFleetData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Navbar />
            <h1>Choose Your Fleet Partner</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleetData.map((fleet) => (
                    <FleetCard key={fleet._id} fleet={fleet} />
                ))}
            </div>
        </div>
    );
};

export default ChoosePartner;
