import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "./../../interceptor";
import { toggleSearchButton, toggleSpinner } from "./../../helper";

const { useState, useEffect } = require("react");
const { Container, Table } = require("react-bootstrap");

const SearchMosques = (props) => {
  const query = useParams();
  const dispatch = useDispatch();
  const searchText = useSelector((x) => x.commonState.searchText);
  // alert(searchText);
  const [mosques, setMosques] = useState([]);

  const searchMosques = () => {
    if (searchText) {
      toggleSpinner(dispatch, true);
      axios
        .post("/mosques/search", { query: searchText })
        .then(({ data }) => {
          setMosques(data);
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
    searchMosques();
    toggleSearchButton(dispatch, false);
  }, []);

  if (mosques.length == 0) {
    return <h1>No results found for `{searchText}` !</h1>;
  }

  return (
    <>
      <Container>
        <h1>Search results for `{searchText}`</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mosques.map((x, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{x.name}</td>
                <td dangerouslySetInnerHTML={{ __html: x.location }} />
                <td>{x.description}</td>
                <td>
                  <Link to={`/mosques/${x._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
export default SearchMosques;
