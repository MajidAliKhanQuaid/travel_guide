import { useEffect, useState } from "react";
import { Col, Figure, Row, Card, Container } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { Link } from "react-router-dom";

import { ReactPhotoCollage } from "react-photo-collage";
export const Punjab = () => {
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      { source: `/assets/images/punjab/1.jpg` },
      { source: `/assets/images/punjab/2.jpg` },
      { source: `/assets/images/punjab/3.jpg` },
      { source: `/assets/images/punjab/4.jpg` },
      { source: `/assets/images/punjab/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("pu");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
      </div>

      <h1 style={{ margin: "15px 0px" }}>Punjab</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Punjab (Urdu & Punjabi: پنجاب, romanized: Panjāb (pronounced
        [pənˈdʒaːb]), About this soundlisten (help·info); lit. ' "Five waters"')
        is Pakistan's most populous province, with a population of about
        110,012,442 as of 2017.Forming the bulk of the transnational Punjab
        region of Pakistan and India, it is bordered by the Pakistani provinces
        of Sindh, Balochistan, and Khyber Pakhtunkhwa, the enclave of Islamabad,
        and Pakistan administered Azad Kashmir. It also shares borders with the
        Indian states of Punjab, Rajasthan, and the Indian-administered
        territory of Jammu and Kashmir. The capital is Lahore, a cultural,
        historical, economic and cosmopolitan centre of Pakistan where the
        country's cinema industry, and much of its fashion industry, are based.
        Punjab is also the world's fifth-most populous subnational entity, and
        the most populous outside China or India.
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
