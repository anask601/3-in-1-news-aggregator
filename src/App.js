import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path={"/"} element={<div>work</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
