import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path={"/"} element={<div> working </div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
