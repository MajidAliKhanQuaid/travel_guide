import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Sindh = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("sd");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <h1 style={{ margin: "35px" }}>Sindh</h1>

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
        Sindh (Sindhi: سنڌ‎; Urdu: سندھ‎, pronounced [sɪnd̪ʰ];historically
        romanised as Sind) is one of the four provinces of Pakistan. Located in
        the southeast of the country, it is the home of the Sindhi people.[5][6]
        Sindh is the third largest province of Pakistan by area and second
        largest province by population after Punjab. Sindh is bordered by
        Balochistan province to the west and Punjab province to the north. Sindh
        also borders the Indian states of Gujarat and Rajasthan to the east and
        Arabian Sea to the south. Sindh's landscape consists mostly of alluvial
        plains flanking the Indus River, the Thar desert in the eastern portion
        of the province closest to the border with India and the Kirthar
        Mountains in the western part of Sindh.
        <img
          style={{ margin: "10px", width: "30%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Jinnah_Mausoleum.JPG"
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
