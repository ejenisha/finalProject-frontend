import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Training from './components/Training'; 
import Displayscore from './components/Displayscore';
import Login from './components/Login';
import AddTraining from './components/AddTrainings';
import EmployeeReport from './components/EmployeeReport';
const App = () => {
  // Use localStorage to retrieve the role when the component mounts
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || 'Admin'; // Default to 'Admin' if no role is found
  });

  useEffect(() => {
    // Listen for changes in role and update localStorage
    localStorage.setItem('role', role);
  }, [role]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login role={role} setRole={setRole} />} />
        <Route path='/Admin' element={<Home role={role} />} />
        <Route path='/trainer' element={<Home role={role} />} />
        <Route path='/Admin/add' element={<AddTraining role={role} />} />
        <Route path="/trainer/scores" element={<Training role={role} />} />
        <Route path="/displayscores" element={<Displayscore role={role} />} />
        <Route path="/report" element={<EmployeeReport role={role} />} />
      </Routes>
    </Router>
  );
};

export default App;
