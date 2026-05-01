import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Event Dashboard</h2>

      {/* 🔍 Search Input */}
      <input
        placeholder="Search by event type (e.g. login)"
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Event List */}
      {events
        .filter((e) =>
          e.eventType?.toLowerCase().includes(search.toLowerCase())
        )
        .map((event, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#f9f9f9"
            }}
          >
            <p><strong>Name:</strong> {event.userId?.name || "N/A"}</p>
            <p><strong>Email:</strong> {event.userId?.email || "N/A"}</p>
            <p><strong>Event:</strong> {event.eventType}</p>
            <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;