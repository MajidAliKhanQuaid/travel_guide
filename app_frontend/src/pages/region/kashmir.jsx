import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Kashmir = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("kh");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <h1 style={{ margin: "35px" }}>Kashmir</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "calc(100% - (2 * 35px))",
          height: "70vh",
          margin: "35px",
          padding: "35px",
          fontSize: "20px",
          textAlign: "justify",
          backgroundColor: "#fce354",
          borderRadius: "10px",
        }}
      >
        Kashmiris the northernmost geographical region of the Indian
        subcontinent. Until the mid-19th century, the term "Kashmir" denoted
        only the Kashmir Valley between the Great Himalayas and the Pir Panjal
        Range. Today, the term encompasses a larger area that includes the
        Indian-administered territories of Jammu and Kashmir and Ladakh, the
        Pakistani-administered territories of Azad Kashmir and Gilgit-Baltistan,
        and the Chinese-administered territories of Aksai Chin and the
        Trans-Karakoram Tract . In the first half of the first millennium, the
        Kashmir region became an important centre of Hinduism and later of
        Buddhism; later still, in the ninth century, Kashmir Shaivism arose. In
        1339, Shah Mir became the first Muslim ruler of Kashmir, inaugurating
        the Salatin-i-Kashmir or Shah Mir dynasty. The region was part of the
        Mughal Empire from 1586 to 1751 ,and thereafter, until 1820, of the
        Afghan Durrani Empire. That year, the Sikh Empire, under Ranjit Singh,
        annexed Kashmir.
        <img
          style={{ margin: "10px", width: "30%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Pahalgam_Valley.jpg"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexFlow: "flex-wrap",
          flexWrap: "wrap",
          justifyContent: "left",
          marginTop: "50px",
        }}
      >
        {places.map((x, y) => (
          // <Card style={{ width: "20rem", flexGrow: "1" }}>
          <Card
            style={{
              flex: "0 1 30%",
              margin: "1.6%",
            }}
            key={x._id}
          >
            <Card.Img
              variant="top"
              src={
                x.images && x.images.length > 0
                  ? `http://localhost:4000/uploads/${x.images[0]}`
                  : ""
              }
            />
            <Card.Body>
              <Card.Title>{x.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{x.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};
