import React, { useState, useEffect } from "react";

const Fleetnot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        // Keep only the latest message (assuming messages are sorted by date)
        if (data.length > 0) {
          setMessages([data[data.length - 1]]);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMessages();

    // Optionally, add a polling mechanism or WebSocket for real-time updates
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const handleResponse = async (messageId, status) => {
    try {
      // Update the message status in the fleet owner's dashboard
      const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update message status");

      // Send "We are Ready" to the DOP admin
      const dopResponse = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "We are Ready", // Forwarded message to DOP admin
          recipient: "DOP Admin",  // You may have a specific field to identify recipients
        }),
      });

      if (!dopResponse.ok) throw new Error("Failed to forward message to DOP admin");

      // Clear messages after responding to the latest message
      setMessages([]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-xl font-bold">Partner Dashboard</h1>
      {messages.map((message) => (
        <div key={message._id} className="bg-white p-4 rounded shadow mb-4">
          <p>{message.message}</p>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={() => handleResponse(message._id, "Accepted")}
              className="bg-green-500 text-white p-2 rounded"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fleetnot;
