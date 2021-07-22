import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { Link } from "react-router-dom";

import { ReactPhotoCollage } from "react-photo-collage";
export const Gilgit = () => {
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      { source: `/assets/images/gilgit/1.jpg` },
      { source: `/assets/images/gilgit/2.jpg` },
      { source: `/assets/images/gilgit/3.jpg` },
      { source: `/assets/images/gilgit/4.jpg` },
      { source: `/assets/images/gilgit/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("gt");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
      </div>

      <h1 style={{ margin: "15px 0px" }}>Gilgit</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Gilgit-Baltistan (Urdu: گِلگِت بَلتِسْتان‎,Balti: རྒྱལ་སྐྱིད་
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
