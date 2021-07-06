import "./App.scss";
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
import { useLocation } from "react-router";
// react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import history from "./History";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import NavbarComponent from "./components/NavbarComponent";
import SearchComponent from "./components/Modals/SearchComponent";
import SpinnerComponent from "./components/Modals/SpinnerComponent";

// Pages -> Home Pages
import AnonymousHome from "./pages/homepages/AnonymousHome";
import AdminHome from "./pages/homepages/AdminHome";
import TouristHome from "./pages/homepages/TouristHome";

// Pages -> *
import Login from "./pages/accounts/Login";
import Logout from "./pages/accounts/Logout";
import Favourites from "./pages/Favourites";
import Place from "./pages/place/Place";
import NewPlace from "./pages/place/New";
import ListPlaces from "./pages/place/List";
import ListAccout from "./pages/accounts/List";
import EditPlace from "./pages/place/Edit";
import GoogleLogin from "react-google-login";
import { Balouchistan } from "./pages/region/baloushistan";
import { Sindh } from "./pages/region/sindh";
import { Punjab } from "./pages/region/punjab";
import { Gilgit } from "./pages/region/gilgit";
import { Kashmir } from "./pages/region/kashmir";
import { Khyber } from "./pages/region/khyber";
import SearchPlaces from "./pages/place/Search";
import NewAccount from "./pages/accounts/New";
import Profile from "./pages/accounts/Profile";
import SignUp from "./pages/accounts/SignUp";

import ListCategory from "./pages/category/List";
import NewCategory from "./pages/category/New";
import EditCategory from "./pages/category/Edit";

import categoryService from "./services/category.service";

import {
  toggleNav,
  toggleSearchButton,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
  addCategories,
} from "./helper";

import style from "./style";

function App() {
  // location
  let location = useLocation();
  // dispatch
  const dispatch = useDispatch();
  // selector -> user-state
  const user = useSelector((x) => x.userState.user);
  // selector -> common-state
  const busy = useSelector((x) => x.commonState.showSpinner);
  const showNav = useSelector((x) => x.commonState.showNav);
  const toggleBreadcrumb = useSelector((x) => x.commonState.toggleBreadcrumb);
  const breadcrumbItems = useSelector((x) => x.commonState.breadcrumbItems);
  const toggleSearchBtn = useSelector((x) => x.commonState.toggleSearchBtn);
  const searchText = useSelector((x) => x.commonState.searchText);
  // services

  // const searchCategory = useSelector((x) => x.commonState.searchCategory);
  // state
  const [query, setQuery] = useState(searchText);
  const categories = useSelector((x) => x.commonState.categories);
  const [searchModalOptions, setSearchModalOptions] = useState({
    show: false,
  });

  useEffect(async () => {
    // hide nav-bar on login and signup
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/signup")
    ) {
      toggleNav(dispatch, false);
    } else {
      toggleNav(dispatch, true);
    }

    // hide search button on search page
    if (location.pathname.startsWith("/places/search")) {
      toggleSearchButton(dispatch, false);
    } else {
      toggleSearchButton(dispatch, true);
    }

    // loading categories on main-component load
    if (location.pathname == "/") {
      if (categories.length == 0) {
        const lCats = await categoryService.getCategories();
        addCategories(dispatch, lCats);
      }
    }
  }, [location.pathname]);

  const searchPlaces = () => {
    setSearchModalOptions({ ...searchModalOptions, show: false });
    history.push({
      pathname: "/places/search",
      // search: "?query=abc",
      state: { query: query },
    });
  };

  return (
    <>
      <NavbarComponent
        user={user}
        showNav={showNav}
        searchClick={() => {
          setSearchModalOptions({ ...searchModalOptions, show: true });
        }}
        toggleSearchBtn={toggleSearchBtn}
        categories={categories}
      />
      {toggleBreadcrumb && (
        <Breadcrumb style={{ margin: "10px", backgroundColor: "red" }}>
          {breadcrumbItems && breadcrumbItems.length > 0 ? (
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
        </Breadcrumb>
      )}

      <Container>
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            user={user}
            rolesAllowed={[]}
            successComponent={TouristHome}
            failureComponent={AnonymousHome}
          />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />

          <Route path="/region/balouchistan" component={Balouchistan} />
          <Route path="/region/sindh" component={Sindh} />
          <Route path="/region/punjab" component={Punjab} />
          <Route path="/region/gilgit" component={Gilgit} />
          <Route path="/region/kashmir" component={Kashmir} />
          <Route path="/region/khyber" component={Khyber} />

          <Route path="/categories/edit/:identifier" component={EditCategory} />
          <Route path="/categories/new" exact component={NewCategory} />
          <Route path="/categories" exact component={ListCategory} />

          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/search" component={SearchPlaces} />
          <Route path="/places/edit/:identifier" component={EditPlace} />
          <Route path="/places/category/:identifier" component={ListPlaces} />
          <Route path="/places/:identifier" component={Place} />
          <Route path="/places" component={ListPlaces} />

          <Route path="/accounts/new" component={NewAccount} />
          <Route path="/accounts" component={ListAccout} />
          <Route path="/test" component={Place} />
          <Route path="/Favs" component={Favourites} />
        </Switch>
      </Container>

      <SearchComponent
        display={searchModalOptions.show}
        dismissClick={() => {
          setSearchModalOptions({ ...searchModalOptions, show: false });
        }}
        searchClick={searchPlaces}
      />

      {/* <SearchComponent
          display={searchModalOptions.show}
          dismissClick={() => {
            setSearchModalOptions({ ...searchModalOptions, show: false });
          }}
          searchClick={searchMosques}
         /> */}
      <SpinnerComponent busy={busy} />
    </>
  );
}

export default App;
