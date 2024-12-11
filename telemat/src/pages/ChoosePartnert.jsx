import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Navbar from "../Components/Navbar";

const ChoosePartnert = () => {
    const [fleetData, setFleetData] = useState([]);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchFleetData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/schedule");
                if (!response.ok) throw new Error("Failed to fetch fleet data");
                const data = await response.json();
                setFleetData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFleetData();
    }, []);

    const handleChoosePartner = async (fleet) => {
        if (!stripe || !elements) return alert("Stripe is not loaded");

        try {
            // Create payment intent
            const paymentResponse = await fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: fleet.preferredCost || 100 }),
            });

            if (!paymentResponse.ok) throw new Error("Failed to create payment intent");

            const { clientSecret } = await paymentResponse.json();

            // Confirm payment
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (paymentResult.error) {
                alert(`Payment failed: ${paymentResult.error.message}`);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment successful!");

                // Send message after successful payment
                const messageResponse = await fetch("http://localhost:5000/api/sendMessage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        partnerId: fleet._id,
                        message: `We need a truck from ${fleet.preferredFrom} to ${fleet.preferredTo}.`,
                    }),
                });

                if (!messageResponse.ok) throw new Error("Failed to send message");
                alert("Message sent to the partner's dashboard!");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Navbar />
            <h1>Choose Your Fleet Partner</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleetData.map((fleet) => (
                    <div key={fleet._id} className="bg-white rounded-lg shadow-lg w-full max-w-md border p-4">
                        <img
                            src={fleet.image || "./public/images/partner1.jpg"}
                            alt="Fleet"
                            className="w-full h-40 object-cover"
                        />
                        <h3 className="text-lg font-semibold">{fleet.companyName}</h3>
                        <p>Preferred Routes: {fleet.preferredFrom} - {fleet.preferredTo}</p>
                        <p>Cost: {fleet.preferredCost || "N/A"}</p>
                        <CardElement className="border p-2 rounded mt-2" />
                        <button
                            onClick={() => handleChoosePartner(fleet)}
                            className="bg-blue-500 text-white p-2 rounded mt-2"
                        >
                            Choose Partner
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoosePartnert;
