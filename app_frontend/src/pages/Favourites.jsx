import { useState } from "react";
import { Card, Pagination } from "react-bootstrap";

const Favouries = () => {
  const [favs, setFavs] = useState([
    {
      identifier: "1",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "One",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      identifier: "2",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "two",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      identifier: "3",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "three",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      identifier: "4",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "four",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      identifier: "5",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "five",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
    {
      identifier: "6",
      imageUrl: "/slider_images/uch-sharif.jpg",
      title: "six",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
    },
  ]);
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
            <Card.Img variant="top" src={x.imageUrl} />
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
