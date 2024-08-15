import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import Search from "./components/Search/Search";

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
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
