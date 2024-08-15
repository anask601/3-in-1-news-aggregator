import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <News key={"general"} newscategory={"general"} country={"us"} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
