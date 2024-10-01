import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Training from './components/Training'; // Assuming Training.jsx exists

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/trainer" element={<Home />} />
        <Route path="/trainer/scores" element={<Training />} />
      </Routes>
    </Router>
  );
};

export default App;