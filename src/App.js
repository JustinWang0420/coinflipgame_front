import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './assets/images/logo.png';
// import GameComponent from "./Component/GameComponent";
import RainBow from "./Component/RainBow";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:userId" element={<RainBow />} />
        {/* <Route path="/rainbow" element={<RainBow />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
