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
      <div className="row">
        <div className="col-md-8">
          <Figure>
            <Figure.Image
              style={{ width: "100%" }}
              alt={`lepa-valley.jpg`}
              src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
            />
          </Figure>
        </div>
        <div className="col-md-4 d-none d-lg-block d-md-block">
          <div className="row">
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
            <div className="col-md-6">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Figure>
                <Figure.Image
                  style={{ width: "100%" }}
                  alt={`lepa-valley.jpg`}
                  src={`${process.env.PUBLIC_URL}/lepa-valley.jpg`}
                />
              </Figure>
            </div>
          </div>
        </div>
      </div>

      <h1 style={{ margin: "15px 0px" }}>Kashmir</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
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
