import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Engagement System</h1>

      <Signup />
      <hr />

      <Login />
      <hr />

      <Dashboard />
    </div>
  );
}

export default App;