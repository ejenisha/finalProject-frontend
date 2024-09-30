import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#3411a3] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side - Title */}
          <div className="text-xl font-semibold">
            Learning Management Portal
          </div>
          {/* Right Side - Links */}
          <div className="space-x-6">
            <a href="#training" className="hover:text-gray-200">Training Scores</a>
            <a href="#feedback" className="hover:text-gray-200">Feedback</a>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto mt-10 p-5 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the Learning Management Portal
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Track your training, view scores, and receive feedback.
        </p>
      </div>
    </div>
  );
};

export default Home;
