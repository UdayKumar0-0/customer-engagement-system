import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="container">
      <h1>Customer Engagement</h1>

      <div className="grid">
        <Signup />
        <Login />
      </div>

      <Dashboard />
    </div>
  );
}
export default App;