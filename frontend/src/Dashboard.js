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
    <div className="card">
  <h2 style={{ marginTop: "30px" }}>Event Dashboard</h2>

  <input
    placeholder="Search by event type (e.g. login)"
    onChange={(e) => setSearch(e.target.value)}
  />

  {events
    .filter(e => e.eventType.includes(search))
    .map((event, index) => (
      <div key={index} className="event-card">
        <p><strong>Name:</strong> {event.userId?.name}</p>
        <p><strong>Email:</strong> {event.userId?.email}</p>
        <p><strong>Event:</strong> {event.eventType}</p>
        <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
      </div>
    ))}
</div>
  );
}

export default Dashboard;