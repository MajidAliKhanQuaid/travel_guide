import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Balouchistan = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("bl");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <h1 style={{ margin: "35px" }}>Balochistan</h1>

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
        Balochistan( Balochi: بلوچِستان‎; also romanised as Baluchistan) is an
        arid desert and mountainous region in South and Western Asia. It
        comprises the Pakistani province of Balochistan, the Iranian province of
        Sistan and Baluchestan, and the southern areas of Afghanistan, including
        Nimruz, Helmand and Kandahar provinces.Balochistan borders the
        Pashtunistan region to the north, Sindh and Punjab to the east, and
        Persian regions to the west. South of its southern coastline, including
        the Makran Coast, are the Arabian Sea and the Gulf of Oman.
        <img
          style={{ margin: "10px", width: "30%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/8/88/Quaid-e-Azam_Residancy_Ziarat_Balochistan_by_Balochlens.jpg"
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
