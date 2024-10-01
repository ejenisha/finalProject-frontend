import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Training from './components/Training'; // Assuming Training.jsx exists
import Displayscore from './components/Displayscore';
import Login from './components/Login';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path='/' element={<Login/>}/>
        <Route path='/Admin' element={<Home/>}/>
        <Route path="/trainer" element={<Home />} />
        <Route path="/trainer/scores" element={<Training />} />
        <Route path="/trainer/displayscores" element={<Displayscore />} />
      </Routes>
    </Router>
  );
};

export default App;