import "./NavbarComponent.style.scss";
import { Nav, Navbar, NavDropdown, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

import { regions } from "../conts";

import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const NavbarComponent = ({
  user,
  showNav,
  searchClick,
  toggleSearchBtn,
  categories,
}) => {
  useEffect(() => {}, []);

  const [roles, setRoles] = useState([]);
  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    userInfo = {};
  } else {
    userInfo = JSON.parse(userInfo);
  }

  useEffect(() => {
    try {
      const tokenInfo = jwt_decode(user.token);
      console.log(tokenInfo);
      const userRoles = tokenInfo.roles;
      setRoles(userRoles);
    } catch (err) {}
  }, [user]);

  return (
    showNav && (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Travel Guide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/places" className="nav-link">
              Places
            </Link>
            {/*<Link to="/mosques" className="nav-link">
              Mosques
             </Link>*/}

            {categories && (
              <>
                <NavDropdown title={"Categories "} id="user-nav-dropdown">
                  {categories.map((x) => (
                    <Link
                      to={`/places/category/${x._id}`}
                      className="dropdown-item"
                    >
                      {x.name}
                    </Link>
                  ))}
                </NavDropdown>
              </>
            )}

            {regions && regions.length > 0 && (
              <>
                <NavDropdown title={"Regions "} id="user-nav-dropdown">
                  {regions.map((x) => (
                    <Link to={`/region/${x.key}`} className="dropdown-item">
                      {x.text}
                    </Link>
                  ))}
                </NavDropdown>
              </>
            )}

            {/* <div class="dropdown">
              <button class="dropbtn">Interests</button>
              <div class="dropdown-content">
                <Link to="/mosques" className="nav-link">
                  <span style={{ color: "rgba(0,0,0,.5)" }}>Mosque </span>
                </Link>
                <Link to="/parks" className="nav-link">
                  {" "}
                  <span style={{ color: "rgba(0,0,0,.5)" }}>Park</span>
                </Link>
                <Link to="/meuseums" className="nav-link">
                  {" "}
                  <span style={{ color: "rgba(0,0,0,.5)" }}>Meuseum </span>
                </Link>
                <Link to="/historicals" className="nav-link">
                  {" "}
                  <span style={{ color: "rgba(0,0,0,.5)" }}>Historical</span>
                </Link>
                <Link to="/culturals" className="nav-link">
                  {" "}
                  <span style={{ color: "rgba(0,0,0,.5)" }}>Cultural</span>
                </Link>
                <Link to="/gyms" className="nav-link">
                  {" "}
                  <span style={{ color: "rgba(0,0,0,.5)" }}>gym</span>
                </Link>
              </div>
            </div> */}

            {roles.indexOf("admin") > -1 && (
              <Link to="/accounts" className="nav-link">
                Accounts
              </Link>
            )}
            <Link to="/Favs" className="nav-link">
              Favourites
            </Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {toggleSearchBtn && (
            <>
              <Form inline>
                <Button
                  onClick={searchClick}
                  className="btn-search"
                  variant="none"
                >
                  <FontAwesomeIcon icon={faSearchLocation} /> &nbsp; Search
                </Button>
              </Form>
            </>
          )}
          {/* {searchButton(toggleSearchBtn, searchClick)} */}
          {user && (
            <NavDropdown title={userInfo.name} id="user-nav-dropdown">
              {/* <Link to="/profile" className="dropdown-item">
                Profile
              </Link> */}
              {/* <NavDropdown.Divider /> */}
              <Link to="/logout" className="dropdown-item">
                Logout
              </Link>
            </NavDropdown>
          )}
          {!user && (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  );
};

export default NavbarComponent;
