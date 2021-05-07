import { useEffect, useState } from "react";
import { Card, Container, Pagination } from "react-bootstrap";
import axios from "./../interceptor";
const Favouries = () => {
  useEffect(async () => {
    const lstFavs = await axios.get(`/favourites`);
    setFavs(lstFavs.data);
  }, []);
  const [favs, setFavs] = useState([]);
  return (
    <>
      <Container>
        <h1>Favourites</h1>
        <div
          className="padded"
          style={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "flex-wrap",
            flexWrap: "wrap",
          }}
        >
          {favs.map((x) => (
            <Card
              style={{
                flex: "0 1 30%",
                margin: "1.6%",
              }}
            >
              <Card.Img
                variant="top"
                src={
                  x.images.length > 0
                    ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${x.images[0]}`
                    : ""
                }
              />
              <Card.Body>
                <Card.Title>{x.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>{x.description}</Card.Text>
                <Card.Link href="#">Remove</Card.Link>
                <Card.Link href="#">Details</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Favouries;
