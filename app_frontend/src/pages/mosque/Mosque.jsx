import { useEffect, useState } from "react";
import { Container, Figure, Accordion, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import axios from "./../../interceptor";
const Mosque = () => {
  const { identifier } = useParams();
  const [mosque, setMosque] = useState({ images: [] });
  const [dp, setDp] = useState("");
  // const paths = [
  //   "https://images.unsplash.com/photo-1611580338398-2a63a34c61f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  //   "https://images.unsplash.com/photo-1607455849506-2b56d8d9c2c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80",
  //   "https://images.unsplash.com/photo-1581983055134-6f93a59450ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  // ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "TOGGLE_SPINNER",
      payload: true,
    });
    axios
      .get(`/mosques/get?id=${identifier}`)
      .then(function ({ data }) {
        //handle success
        console.log(data);
        setMosque(data);
        if (data.images && data.images.length > 0) {
          setDp(
            `${process.env.REACT_APP_API_BASE_URL}/uploads/${data.images[0]}`
          );
        }
        console.log(data);

        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TOGGLE_SPINNER",
          payload: false,
        });
      });
  }, []);
  return (
    <>
      <Container>
        <Figure>
          <Figure.Image width={500} height={500} alt="171x180" src={dp} />
          <Figure.Caption>{mosque.name}</Figure.Caption>
        </Figure>

        <div>
          {mosque.images.map((x) => (
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

        <p>{mosque.description}</p>
      </Container>
    </>
  );
};

export default Mosque;
