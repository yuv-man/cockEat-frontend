import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/NavigationBar.css";
import {
  Navbar,
  Nav,
} from "react-bootstrap";
import cookEatLogo from "../img/logo/cookEatLogo.png";
import { useAuth } from "../Conteaxts/autoConteaxt";

const NavigationBar = () => {
  const { logOut } = useAuth();
  const [user, setUser] = useState();
  const getUser = () => {
    const userId = localStorage.getItem("user");
    if (userId) {
      setUser(userId);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="nav-container">
      <Navbar className="main-navbar" expand="lg">
        <Navbar.Brand>
          <Link id="main-link" to="/">
            <span id="cook">Cook</span>
            <span id="eat">Eat</span>
            <img
              alt="logo"
              src={cookEatLogo}
              width="47"
              height="47"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/profile-settings" id="links">
                My Account
              </Nav.Link>
              <Nav.Link as={Link} to="/my-recipes" id="links">
                My Recipes
              </Nav.Link>
              <Nav.Link as={Link} to="/saved-recipes" id="links">
                Saved Recipes
              </Nav.Link>
              <Nav.Link as={Link} to="/add-recipe" id="links">
                Add Recipe
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {!user ? (
          <div>
            <Nav.Link
              as={Link}
              to="/sign-up"
              variant="outline-success"
              className="links"
            >
              Sign Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/login"
              variant="outline-success"
              className="links"
            >
              Log In
            </Nav.Link>
          </div>
        ) : (
          <Nav.Link
            as={Link}
            to = '/'
            variant="outline-success"
            className="links"
            onClick={logOut}
          >
            Sign Out
          </Nav.Link>
        )}
      </Navbar>
    </div>
  );
};

export default NavigationBar;
