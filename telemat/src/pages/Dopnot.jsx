import React, { useState, useEffect } from "react";

const Dopnot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        // Keep only the latest message (assuming messages are sorted by time)
        if (data.length > 0) {
          setMessages([data[data.length - 1]]);
        } else {
          setMessages([]); // Clear messages if no data is received
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMessages();

    // Poll every 5 seconds to fetch updates
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-xl font-bold">DOP Admin Dashboard</h1>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="bg-white p-4 rounded shadow mb-4">
            <p>{message.message}</p>
          </div>
        ))
      ) : (
        <p>No new messages</p>
      )}
    </div>
  );
};

export default Dopnot;
