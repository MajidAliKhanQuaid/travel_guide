import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import { Link } from "react-router-dom";

import { ReactPhotoCollage } from "react-photo-collage";
export const Kashmir = () => {
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      { source: `/assets/images/kashmir/1.jpg` },
      { source: `/assets/images/kashmir/2.jpg` },
      { source: `/assets/images/kashmir/3.jpg` },
      { source: `/assets/images/kashmir/4.jpg` },
      { source: `/assets/images/kashmir/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    const rPlaces = await placeservice.getPlacesByRegion("kh");
    setPlaces(rPlaces);
  }, []);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
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
