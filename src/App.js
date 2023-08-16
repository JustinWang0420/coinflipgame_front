import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import GameComponent from "./Component/GameComponent";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:hashdata" element={<GameComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
