import {
  Carousel,
  CarouselItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  Form,
  FormControl,
  Spinner,
  Modal,
  Breadcrumb,
  Button,
  Container,
} from "react-bootstrap";
import {
  Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = ({
  user,
  showNav,
  searchClick,
  toggleSearchBtn,
  categories,
}) => {
  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    userInfo = {};
  } else {
    userInfo = JSON.parse(userInfo);
  }

  const searchButton = (_toggleSearchBtn, _searchClick) => {
    if (!_toggleSearchBtn) return <></>;
    return (
      <Form inline>
        <Button onClick={_searchClick} variant="default">
          <FontAwesomeIcon icon={faSearchLocation} /> &nbsp; Search
        </Button>
      </Form>
    );
  };

  const userLoginOption = (_user) => {
    if (!_user) {
      return (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </>
      );
    }
    return <></>;
  };

  const userAvatar = (_user) => {
    if (!_user) {
      return <></>;
    }
    return (
      <NavDropdown title={userInfo.firstname} id="user-nav-dropdown">
        <Link to="/profile" className="dropdown-item">
          Profile
        </Link>
        <NavDropdown.Divider />
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </NavDropdown>
    );
  };

  if (showNav === false) {
    return <></>;
  }
  return (
    <Navbar bg="light" expand="lg">
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

          {categories && categories.length > 0 ? (
            <>
              <NavDropdown title={"Types "} id="user-nav-dropdown">
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
          ) : (
            <></>
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

          <Link to="/accounts" className="nav-link">
            Accounts
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
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
        {searchButton(toggleSearchBtn, searchClick)}
        {userAvatar(user)}
        {userLoginOption(user)}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
