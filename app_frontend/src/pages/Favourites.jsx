import { useEffect, useState } from "react";
import { Card, Pagination } from "react-bootstrap";
import axios from "./../interceptor";
const Favouries = () => {
  useEffect(async () => {
    const lstFavs = await axios.get(`/favourites`);
    setFavs(lstFavs.data);
  }, []);
  const [favs, setFavs] = useState([]);
  return (
    <>
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
          <Card style={{ width: "22rem", flexGrow: "1" }}>
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
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
};

export default Favouries;
