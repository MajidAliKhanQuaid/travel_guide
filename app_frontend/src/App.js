import logo from "./logo.svg";
import "./App.css";
// import Button from 'react-bootstrap/Button';
import { Breadcrumb, Button, Container } from "react-bootstrap";
import {
  Router,
  Switch,
  Route,
  useParams,
  Redirect,
  Link,
} from "react-router-dom";
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
} from "react-bootstrap";
import history from "./History";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/accounts/Login";
import Logout from "./pages/accounts/Logout";
import AnonymousHome from "./pages/homepages/AnonymousHome";
import AdminHome from "./pages/homepages/AdminHome";
import Favouries from "./pages/Favourites";
import { useDispatch, useSelector } from "react-redux";
import Place from "./pages/place/Place";
import NewPlace from "./pages/place/New";
import ListPlaces from "./pages/place/List";
import ListAccout from "./pages/accounts/List";
import EditPlace from "./pages/place/Edit";
import GoogleLogin from "react-google-login";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { Balouchistan } from "./pages/region/baloushistan";
import { Sindh } from "./pages/region/sindh";
import { Punjab } from "./pages/region/punjab";
import { Gilgit } from "./pages/region/gilgit";
import { Kashmir } from "./pages/region/kashmir";
import { Khyber } from "./pages/region/khyber";
import SearchPlaces from "./pages/place/Search";
import NewAccount from "./pages/accounts/New";
import axios from "./interceptor";
import { toggleSpinner } from "./helper";
import ListMosques from "./pages/mosque/List";
import EditMosque from "./pages/mosque/Edit";
import Mosque from "./pages/mosque/Mosque";
import NewMosque from "./pages/mosque/New";
import SearchMosques from "./pages/mosque/Mosque";
import Park from "./pages/park/Park";
import NewPark from "./pages/park/New";
import ListParks from "./pages/park/List";
import SearchParks from "./pages/mosque/Mosque";
//import ListAccout from "./pages/accounts/List";
import EditPark from "./pages/park/Edit";
import Gym from "./pages/gym/Gym";
import NewGym from "./pages/gym/New";
import ListGyms from "./pages/gym/List";
import SearchGyms from "./pages/mosque/Mosque";
//import ListAccout from "./pages/accounts/List";
import EditGym from "./pages/gym/Edit";
import Cultural from "./pages/cultural/Cultural";
import NewCultural from "./pages/cultural/New";
import ListCulturals from "./pages/cultural/List";
//import ListAccout from "./pages/accounts/List";
import EditCultural from "./pages/cultural/Edit";
import SearchCulturalS from "./pages/mosque/Mosque";
import Historical from "./pages/historical/Historical";
import NewHistorical from "./pages/historical/New";
import ListHistoricals from "./pages/historical/List";
//import ListAccout from "./pages/accounts/List";
import SearchHistoricals from "./pages/mosque/Mosque";
import EditHistorical from "./pages/historical/Edit";
import SignUp from "./pages/accounts/SignUp";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((x) => x.userState.user);
  const displayNav = useSelector((x) => x.commonState.displayNav);
  // const breadcrumbItems = useSelector((x) => x.commonState.breadcrumbItems);
  const breadcrumbItems = [
    { url: "/", text: "First" },
    { url: "/second", text: "Second" },
  ];
  const displaySearchBtn = useSelector((x) => x.commonState.showSearchBtn);
  const searchText = useSelector((x) => x.commonState.searchText);
  const searchCategory = useSelector((x) => x.commonState.searchCategory);
  const [query, setQuery] = useState(searchText);
  const busy = useSelector((x) => x.commonState.showSpinner);
  const [searchModalOptions, setSearchModalOptions] = useState({
    show: false,
  });

  const search = () => {
    if (searchCategory == "10") {
      return searchPlaces();
    } else if (searchCategory == "20") {
      return searchMosques();
    } else if (searchCategory == "30") {
      return searchParks();
    } else if (searchCategory == "40") {
      return SearchHistoricals();
    } else if (searchCategory == "50") {
      return searchCulturals();
    } else if (searchCategory == "60") {
      return searchGyms();
    } else {
      return searchPlaces();
    }
  };

  const searchPlaces = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/places/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  const searchMosques = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/mosques/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  const searchParks = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/parks/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  const SearchHistoricals = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/historicals/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  const searchCulturals = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/culturals/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  const searchGyms = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/gyms/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  return (
    <>
      <Router history={history}>
        <NavbarComponent
          user={user}
          displayNav={displayNav}
          searchClick={() => {
            setSearchModalOptions({ ...searchModalOptions, show: true });
          }}
          displaySearchBtn={displaySearchBtn}
        />
        {/* <Breadcrumb>
          {breadcrumbItems ? (
            breadcrumbItems.map((x, i) => (
              <li
                className={`breadcrumb-item ${
                  i == breadcrumbItems.length - 1 ? "active" : ""
                }`}
              >
                {i == breadcrumbItems.length - 1 ? (
                  <span>{x.text}</span>
                ) : (
                  <Link to={x.url}>{x.text}</Link>
                )}
              </li>
            ))
          ) : (
            <li className="breadcrumb-item">
              <Link to={"/"}>{"Home"}</Link>
            </li>
          )}
        </Breadcrumb>*/}
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            user={user}
            rolesAllowed={[]}
            successComponent={AdminHome}
            failureComponent={AnonymousHome}
          />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />

          <Route path="/region/balouchistan" component={Balouchistan} />
          <Route path="/region/sindh" component={Sindh} />
          <Route path="/region/punjab" component={Punjab} />
          <Route path="/region/gilgit" component={Gilgit} />
          <Route path="/region/kashmir" component={Kashmir} />
          <Route path="/region/khyber" component={Khyber} />

          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/search" component={SearchPlaces} />
          <Route path="/places/edit/:identifier" component={EditPlace} />
          <Route path="/places/:identifier" component={Place} />
          <Route path="/places" component={ListPlaces} />

          <Route path="/mosques/new" exact component={NewMosque} />
          <Route path="/mosques/search" component={SearchMosques} />
          <Route path="/mosques/edit/:identifier" component={EditMosque} />
          <Route path="/mosques/:identifier" component={Mosque} />
          <Route path="/mosques" component={ListMosques} />

          <Route path="/parks/new" exact component={NewPark} />
          <Route path="/parks/search" component={SearchParks} />
          <Route path="/parks/edit/:identifier" component={EditPark} />
          <Route path="/parks/:identifier" component={Park} />
          <Route path="/parks" component={ListParks} />

          <Route path="/gyms/new" exact component={NewGym} />
          <Route path="/gyms/search" component={SearchGyms} />
          <Route path="/gyms/edit/:identifier" component={EditGym} />
          <Route path="/gyms/:identifier" component={Gym} />
          <Route path="/gyms" component={ListGyms} />

          <Route path="/culturals/new" exact component={NewCultural} />
          <Route path="/culturals/search" component={SearchCulturalS} />
          <Route path="/culturals/edit/:identifier" component={EditCultural} />
          <Route path="/culturals/:identifier" component={Cultural} />
          <Route path="/culturals" component={ListCulturals} />

          <Route path="/historicals/new" exact component={NewHistorical} />
          <Route path="/historicals/search" component={SearchHistoricals} />
          <Route
            path="/historicals/edit/:identifier"
            component={EditHistorical}
          />
          <Route path="/historicals/:identifier" component={Historical} />
          <Route path="/historicals" component={ListHistoricals} />

          <Route path="/accounts/new" component={NewAccount} />
          <Route path="/accounts" component={ListAccout} />
          <Route path="/test" component={Place} />
          <Route path="/Favouries" component={Favouries} />
        </Switch>

        <SearchComponent
          display={searchModalOptions.show}
          dismissClick={() => {
            setSearchModalOptions({ ...searchModalOptions, show: false });
          }}
          searchClick={search}
        />

        {/* <SearchComponent
          display={searchModalOptions.show}
          dismissClick={() => {
            setSearchModalOptions({ ...searchModalOptions, show: false });
          }}
          searchClick={searchMosques}
         /> */}
        <SpinnerComponent busy={busy} />
      </Router>
    </>
  );
}

const SearchComponent = ({ display, searchClick, dismissClick }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  return (
    <Modal className="searchModal" show={display}>
      {/* <Modal.Header closeButton>
    <Modal.Title>Delete</Modal.Title>
  </Modal.Header> */}
      <Modal.Body>
        <Container>
          <h1>Search</h1>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Search</Form.Label>
              <Form.Control
                name="searchTerm"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter Search Term ..."
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                custom
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_SEARCH_CATEGORY",
                    payload: e.target.value,
                  });
                }}
              >
                <option value="10">Places</option>
                <option value="20">Mosques</option>
                <option value="30">Parks</option>
                <option value="40">Historicals</option>
                <option value="50">Culturals</option>
                <option value="60">Gyms</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={dismissClick}>
          Dismiss
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch({ type: "SEARCH_TEXT", payload: searchText });
            searchClick();
          }}
        >
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const SpinnerComponent = ({ busy }) => {
  return (
    <Modal className="busySpinner" show={busy}>
      {/* <Modal.Header closeButton>
    <Modal.Title>Delete</Modal.Title>
  </Modal.Header> */}
      <Modal.Body
        style={{
          border: "none",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          style={
            !busy
              ? {
                  display: "none",
                  color: "white",
                  background: "transparent",
                }
              : { color: "white", background: "transparent" }
          }
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body>
      {/* <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      No
    </Button>
    <Button variant="primary" onClick={handleClose}>
      Yes
    </Button>
  </Modal.Footer> */}
    </Modal>
  );
};

const NavbarComponent = ({
  user,
  displayNav,
  searchClick,
  displaySearchBtn,
}) => {
  let userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    userInfo = {};
  } else {
    userInfo = JSON.parse(userInfo);
  }

  const searchButton = (_displaySearchBtn, _searchClick) => {
    if (!_displaySearchBtn) return <></>;
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
        <Link to="#action/3.1" className="dropdown-item">
          Profile
        </Link>
        <NavDropdown.Divider />
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </NavDropdown>
    );
  };

  if (displayNav === false) {
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

          <NavDropdown title={"ABC "} id="user-nav-dropdown">
            <Link to="/mosques" className="dropdown-item">
              Mosques
            </Link>
            <Link to="/parks" className="dropdown-item">
              Parks
            </Link>
            <Link to="/historicals" className="dropdown-item">
              Historical
            </Link>
            <Link to="/culturals" className="dropdown-item">
              Cultural
            </Link>
            <Link to="/meuseums" className="dropdown-item">
              Meuseums
            </Link>
            <Link to="/gyms" className="dropdown-item">
              Gyms
            </Link>
          </NavDropdown>

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
          <Link to="/Favouries" className="nav-link">
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
        {searchButton(displaySearchBtn, searchClick)}
        {userAvatar(user)}
        {userLoginOption(user)}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default App;
