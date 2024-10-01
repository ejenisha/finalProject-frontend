
import React, { useState } from 'react';

const Login = () => {
  const [role, setRole] = useState('CTO'); // Default role: CTO

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(/images/login.png)`,
        }}
      ></div>

      {/* Modal Form */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 z-10">
        {/* Role Selection (CTO, Trainers) */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-t-lg font-semibold ${
              role === 'CTO'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleRoleChange('CTO')}
          >
            CTO
          </button>
          <button
            className={`py-2 px-4 rounded-t-lg font-semibold ${
              role === 'Trainers'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleRoleChange('Trainers')}
          >
            Trainers
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-center mb-6">LOG IN</h2>

        {/* Login Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
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