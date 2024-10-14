import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ role, setRole, showNav }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Reset the role in localStorage and state
    // or setRole('')
    localStorage.removeItem("role"); // Clear role from localStorage
    // Redirect to the login page
    navigate("/");
  };

  if (!showNav) return null; // If showNav is false, don't render anything

  return (
    <div>
      <nav className="bg-[#3411a3] text-white p-4 shadow-md h-20 flex items-center justify-center font-bold">
        <div className="container mx-auto flex justify-between items-center">
          {/* Center the portal title */}
          <div className="text-2xl ">Learning Management Portal</div>
          <div className="space-x-12">
            {role === "Trainer" ? (
              <Link to="/trainer" className="hover:text-gray-200 text-xl">
                Home
              </Link>
            ) : (
              <Link to="/Admin" className="hover:text-gray-200 text-xl">
                Home
              </Link>
            )}
            {role === "Trainer" ? (
              <Link
                to="/trainer/scores"
                className="hover:text-gray-200 text-xl"
              >
                Training Scores
              </Link>
            ) : (
              <Link
                to="/Admin/add/trainings"
                className="hover:text-gray-200 text-xl"
              >
                Add Trainings
              </Link>
            )}
            {role === "Admin" && (
              <Link
                to="/Admin/add/employees"
                className="hover:text-gray-200 text-xl"
              >
                Add Employees
              </Link>
            )}
            <Link to="/displayscores" className="hover:text-gray-200 text-xl">
              View Scores
            </Link>
            <Link to="/report" className="hover:text-gray-200 text-xl">
              Individual Report
            </Link>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hover:text-gray-200 text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
