import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ role, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole); // Store role in localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const data = response.data; // Access the response data

      if (response.status === 200) {
        localStorage.setItem("token", data.token); // Store token
        localStorage.setItem("role", data.role); // Store role in localStorage

        if (data.role === role) {
          if (data.role === "Admin") {
            navigate("/Admin");
          } else if (data.role === "Trainer") {
            navigate("/trainer");
          }
        } else {
          alert("Selected role does not match the role in the database.");
        }
      }
    } catch (error) {
      // Handle errors based on the error response
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        // The request was made but no response was received
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(/images/login.png)`,
        }}
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 z-10">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-t-lg font-semibold ${
              role === "Admin"
                ? "bg-[#3411a3] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleChange("Admin")}
          >
            Admin
          </button>
          <button
            className={`py-2 px-4 rounded-t-lg font-semibold ${
              role === "Trainer"
                ? "bg-[#3411a3] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleRoleChange("Trainer")}
          >
            Trainer
          </button>
        </div>

        <h2 className="text-2xl text-[#3411a3] font-extrabold text-center mb-6">
          LOG IN
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email Address"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#3411a3] hover:bg-blue-700 text-white font-medium rounded-md"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
