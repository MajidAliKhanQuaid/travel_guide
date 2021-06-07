import { useEffect, useState } from "react";
import { Container, Figure, Accordion, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axios from "./../../interceptor";
import {
  toggleNav,
  toggleSpinner,
  toggleBreadcrumb,
  addBreadcrumbItems,
} from "./../../helper";
const Park = () => {
  const { identifier } = useParams();
  const [park, setPark] = useState({ images: [] });
  const [dp, setDp] = useState("");
  // const paths = [
  //   "https://images.unsplash.com/photo-1611580338398-2a63a34c61f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  //   "https://images.unsplash.com/photo-1607455849506-2b56d8d9c2c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80",
  //   "https://images.unsplash.com/photo-1581983055134-6f93a59450ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    toggleSpinner(dispatch, true);
    axios
      .get(`/parks/get?id=${identifier}`)
      .then(function ({ data }) {
        //handle success
        console.log(data);
        setPark(data);
        if (data.images && data.images.length > 0) {
          setDp(
            `${process.env.REACT_APP_API_BASE_URL}/uploads/${data.images[0]}`
          );
        }
        console.log(data);

        toggleSpinner(dispatch, false);
      })
      .catch((err) => {
        toggleSpinner(dispatch, false);
      });
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-sm-6">
            <Figure>
              <Figure.Image width={500} height={500} alt="171x180" src={dp} />
              <Figure.Caption>{park.name}</Figure.Caption>
            </Figure>
          </div>
          <div className="col-sm-6 map-container">
            <div
              style={{ height: "100%", width: "100%" }}
              dangerouslySetInnerHTML={{ __html: park.location }}
            />
          </div>
        </div>

        <div>
          {park.images.map((x) => (
            <Figure
              style={{ marginRight: "5px" }}
              onClick={(ev) => {
                console.log(ev.target.src);
                setDp(ev.target.src);
              }}
            >
              <Figure.Image
                width={100}
                height={100}
                alt="171x180"
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${x}`}
              />
            </Figure>
          ))}
        </div>

        <p>{park.description}</p>
      </Container>
    </>
  );
};

export default Park;
