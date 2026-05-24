import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (
        response.data.user.role === "Super Admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Invalid Credentials"
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-overlay"></div>

      <div className="auth-card">

        <h1 className="auth-title">
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to your AI Forecast dashboard
        </p>

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

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
              placeholder="Enter your password"
              className="auth-input"
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <div className="auth-footer">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="auth-link"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;