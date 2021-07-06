import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [bookings, setBookings] = useState([{ id: 1, name: "Tour de Naran" }]);
  useEffect(() => {
    addBreadcrumbItems(dispatch, [
      { text: "Home", url: "/" },
      { text: "Profile", url: location.pathname },
    ]);
    toggleBreadcrumb(dispatch, true);
    //toggleNav(dispatch, true);
  }, []);
  return (
    <div>
      <h1>John Doe</h1>
      <div>
        <ul>
          {bookings.map((x) => (
            <li>{x.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Profile;
