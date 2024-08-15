import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Button, Form, FormControl, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { navbarBrand } from "../../utils/util";
import logoImage from "../Images/logoImage.jpg";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const navRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
    setIsCollapsed(true);
  };

  const isSearchButtonDisabled = searchQuery.trim() === "";

  return (
    <>
      <Navbar
        ref={navRef}
        className="navbar"
        variant="dark"
        expand="lg"
        fixed="top"
        expanded={!isCollapsed}
      >
        <Navbar.Brand className="nav-brand" href="/">
          <img src={logoImage} alt="Logo" className="logo" />
          {navbarBrand}
        </Navbar.Brand>
        {isCollapsed && (
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        {!isCollapsed && (
          <IoCloseOutline
            size={40}
            className="close-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-search">
          <Form className="search-form" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Explore news..."
              className="form-input form-control-lg mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              className="search-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0"
              onClick={handleSubmit}
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
