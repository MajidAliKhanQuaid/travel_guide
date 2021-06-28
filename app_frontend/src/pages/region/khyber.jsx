import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Khyber = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("kp");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <h1 style={{ margin: "35px" }}>Khyber Pakhtunkhwa</h1>
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
        Khyber Pakhtunkhwa (Pashto: خیبر پښتونخوا‎; Urdu: خیبر پختونخوا‎), often
        abbreviated as KP or KPK and formerly known as the North-West Frontier
        Province, is one of the four provinces of Pakistan. It is located in the
        northwestern region of the country, along the Afghanistan–Pakistan
        border. It was previously known as the North-West Frontier Province
        (NWFP) until 2010, when the name was changed to Khyber Pakhtunkhwa by
        the 18th Amendment to the Constitution of Pakistan, and is known
        colloquially by various other names. Khyber Pakhtunkhwa is the
        third-largest province of Pakistan in terms of both population and
        economy, though it is geographically the smallest of the four provinces.
        Within Pakistan, Khyber Pakhtunkhwa shares a border with the Islamabad
        Capital Territory, Punjab, Balochistan, and the Pakistani-administered
        territories of Gilgit-Baltistan and Azad Jammu and Kashmir.
        <img
          style={{ margin: "10px", width: "30%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/6/67/Bab-e-Khyber.jpg"
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
