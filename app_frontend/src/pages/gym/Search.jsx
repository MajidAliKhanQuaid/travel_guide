import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "./../../interceptor";
import { toggleSearchButton, toggleSpinner } from "./../../helper";

const { useState, useEffect } = require("react");
const { Container, Table } = require("react-bootstrap");

constSearchParks = (props) => {
  const query = useParams();
  const dispatch = useDispatch();
  const searchText = useSelector((x) => x.commonState.searchText);
  // alert(searchText);
  const [gyms,setgyms] = useState([]);

  const SearchGyms = () => {
    if (searchText) {
      toggleSpinner(dispatch, true);
      axios
        .post("/gyms/search", { query: searchText })
        .then(({ data }) => {
            setgyms(data);
          toggleSpinner(dispatch, false);
        })
        .catch((err) => {
          toggleSpinner(dispatch, false);
        });
    } else {
      console.error("Search Text ", searchText);
    }
  };

  useEffect(() => {
  SearchGyms();
    toggleSearchButton(dispatch, false);
  }, []);

  if (parks.length == 0) {
    return <h1>No results found for `{searchText}` !</h1>;
  }

  return (
    <>
      <Container>
        <h1>Search results for `{searchText}`</h1>
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Name</th>
              <th className="text-center">Map</th>
              <th className="text-center">Information</th>
            </tr>
          </thead>
          <tbody>
            {parks.map((x, i) => (
              <tr className="searchResults">
                <td>
                  <Link to={`/gyms/${x._id}`}>
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${x.images[0]}`}
                    />
                  </Link>
                </td>
                <td>{x.name}</td>
                <td
                  className="map-container"
                  dangerouslySetInnerHTML={{ __html: x.location }}
                />
                <td>{x.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default SearchGyms;
