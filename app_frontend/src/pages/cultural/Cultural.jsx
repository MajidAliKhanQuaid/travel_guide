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

const Cultural = () => {
  const { identifier } = useParams();
  const [cultural, setCultural] = useState({ images: [] });
  const [dp, setDp] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    toggleSpinner(dispatch, true);
    axios
      .get(`/culturals/get?id=${identifier}`)
      .then(function ({ data }) {
        setCultural(data);
        if (data.images && data.images.length > 0) {
          setDp(
            `${process.env.REACT_APP_API_BASE_URL}/uploads/${data.images[0]}`
          );
        }
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
              <Figure.Caption>{cultural.name}</Figure.Caption>
            </Figure>
          </div>
          <div className="col-sm-6 map-container">
            <div
              style={{ height: "100%", width: "100%" }}
              dangerouslySetInnerHTML={{ __html: cultural.location }}
            />
          </div>
        </div>

        <div>
          {cultural.images.map((x) => (
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

        <p>{cultural.description}</p>
      </Container>
    </>
  );
};

export default Cultural;
