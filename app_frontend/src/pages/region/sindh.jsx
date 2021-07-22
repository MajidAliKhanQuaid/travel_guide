import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { ReactPhotoCollage } from "react-photo-collage";
import { Link } from "react-router-dom";

export const Sindh = () => {
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      { source: `/assets/images/sindh/1.jpg` },
      { source: `/assets/images/sindh/2.jpg` },
      { source: `/assets/images/sindh/3.jpg` },
      { source: `/assets/images/sindh/4.jpg` },
      { source: `/assets/images/sindh/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("sd");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
      </div>

      <h1 style={{ margin: "15px 0px" }}>Sindh</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
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
        oiuyt
      >
        {places.map((x, y) => (
          // <Card style={{ width: "20rem", flexGrow: "1" }}>
          <Card
            className="glass rounded-corners"
            style={{
              flex: "0 1 30%",
              margin: "1.6%",
            }}
            key={x._id}
          >
            <Link to={`/places/${x._id}`}>
              <Card.Img
                variant="top"
                src={
                  x.images && x.images.length > 0
                    ? `${process.env.REACT_APP_API_BASE_URL}
/uploads/${x.images[0]}`
                    : ""
                }
              />
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};
