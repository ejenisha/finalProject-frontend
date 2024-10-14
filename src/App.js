import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/AdminVisualization/Home";
import Training from "./components/EnterTrainingScore/Training";
import Displayscore from "./components/ViewScore/Displayscore";
import Login from "./components/Login/Login";
import AddTraining from "./components/AddTraining/AddTrainings";
import EmployeeReport from "./components/IndividualReport/EmployeeReport";
import AddEmployee from "./components/AddEmployee/AddEmployee";
const App = () => {
  // Use localStorage to retrieve the role when the component mounts
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Admin"; // Default to 'Admin' if no role is found
  });

  useEffect(() => {
    // Listen for changes in role and update localStorage
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login role={role} setRole={setRole} />} />
        <Route path="/Admin" element={<Home role={role} />} />
        <Route path="/trainer" element={<Home role={role} />} />
        <Route
          path="/Admin/add/trainings"
          element={<AddTraining role={role} />}
        />
        <Route
          path="/Admin/add/employees"
          element={<AddEmployee role={role} />}
        />
        <Route path="/report" element={<EmployeeReport role={role} />} />
        <Route path="/trainer/scores" element={<Training role={role} />} />
        <Route path="/displayscores" element={<Displayscore role={role} />} />
        <Route path="/report" element={<EmployeeReport role={role} />} />
      </Routes>
    </Router>
  );
};

export default App;
