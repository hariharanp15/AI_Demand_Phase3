import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert("Registration Failed");
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join the AI Demand Forecasting platform
        </p>

        <form
          onSubmit={handleRegister}
          className="auth-form"
        >

          <div className="auth-input-group">

            <label className="auth-label">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="auth-input"
              onChange={handleChange}
              required
            />

          </div>

          <div className="auth-input-group">

            <label className="auth-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="auth-input"
              onChange={handleChange}
              required
            />

          </div>

          <div className="auth-input-group">

            <label className="auth-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              className="auth-input"
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Register
          </button>

        </form>

        <div className="auth-footer">

          Already have an account?{" "}

          <Link
            to="/"
            className="auth-link"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;