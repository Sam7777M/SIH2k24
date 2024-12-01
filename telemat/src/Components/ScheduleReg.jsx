import React, { useState, useContext } from "react";
import QrCodeContext from "../pages/QrCodeContext";

const ScheduleReg = () => {
    const { setQrData } = useContext(QrCodeContext); // Destructure setQrData from the context
    const [formData, setFormData] = useState({
        name: "",
        entities: "",
        weight: "",
        destination: "",
        pickupDate: "",
        dropDate: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const qrCodeValue = JSON.stringify(formData);
        setQrData(qrCodeValue); // Set the QR code data in the context

        try {
            // Send the form data to the backend (database)
            const response = await fetch("http://localhost:5000/api/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send the form data as JSON
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Data submitted successfully:", result);
                // Optionally, handle success (e.g., show a message or redirect)
            } else {
                console.error("Error submitting data:", result);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div
            className="mt-16 h-[60vh] w-[80vw] sm:h-[60vh] md:h-[70vh] lg:h-[120vh] xl:h-[190vh] bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Truck_map_concept.png/800px-Truck_map_concept.png")',
                backgroundBlendMode: "darken",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
        >
            <h1 className="text-black text-center text-7xl font-bold mb-4 mt-[150px]">
                <span className="text-blue-500">Schedule a new Delivery</span>
            </h1>
            <form
                className="w-full max-w-4xl bg-transparent p-6 rounded-md space-y-8"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-20">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Name
                            </label>
                            <select
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>
                                    Pickup Location
                                </option>
                                <option value="John">John</option>
                                <option value="Jane">Jane</option>
                                <option value="Doe">Doe</option>
                                <option value="Alice">Alice</option>
                                <option value="Bob">Bob</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="entities"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Number Of Entities
                            </label>
                            <input
                                type="text"
                                id="entities"
                                value={formData.entities}
                                onChange={handleChange}
                                placeholder="Enter number of entities"
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="weight"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Weight Of Total Parcel
                            </label>
                            <input
                                type="text"
                                id="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="Enter weight of parcel"
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-20">
                        <div className="space-y-2">
                            <label
                                htmlFor="destination"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Destination Location
                            </label>
                            <select
                                id="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>
                                    Select your Destination Location
                                </option>
                                <option value="New York">New York</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="Chicago">Chicago</option>
                                <option value="Houston">Houston</option>
                                <option value="San Francisco">San Francisco</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="pickupDate"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Delivery Pickup Date
                            </label>
                            <input
                                type="date"
                                id="pickupDate"
                                value={formData.pickupDate}
                                onChange={handleChange}
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="dropDate"
                                className="block text-white text-lg font-semibold mb-2 text-left"
                            >
                                Delivery Drop Date
                            </label>
                            <input
                                type="date"
                                id="dropDate"
                                value={formData.dropDate}
                                onChange={handleChange}
                                className="w-full p-3 text-black rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3 rounded-md w-full max-w-xs"
                    >
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleReg;
