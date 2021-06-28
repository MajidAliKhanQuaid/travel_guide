import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/placeservice";
import { Link } from "react-router-dom";

export const Gilgit = () => {
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("gt");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <h1 style={{ margin: "35px" }}>Gilgit</h1>

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
        ilgit-Baltistan (Urdu: گِلگِت بَلتِسْتان‎,Balti: རྒྱལ་སྐྱིད་
        སྦལྟི་ཡུལ།[citation needed]), formerly known as the Northern Areas, is a
        region administered by Pakistan as an administrative territory, and
        constitutes the northern portion of the larger Kashmir region, which has
        been the subject of a dispute between India and Pakistan since 1947, and
        between India and China since somewhat later.It is the northernmost area
        administered by Pakistan.It borders Azad Kashmir to the south, the
        province of Khyber Pakhtunkhwa to the west, the Wakhan Corridor of
        Afghanistan to the north, the Xinjiang region of China, to the east and
        northeast, and the Indian-administered union territories Jammu and
        Kashmir and Ladakh to the southeast.
        <img
          style={{ margin: "10px", width: "30%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Aqua_Ambulance.jpg"
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
