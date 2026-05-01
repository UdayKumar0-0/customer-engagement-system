import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
  
      alert(`Welcome back, ${res.data.user.name}!`);
  
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div className="card">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <input name="email" placeholder="Email" onChange={handleChange} />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} />
    <button type="submit">Login</button>
  </form>
</div>
  );
}

export default Login;