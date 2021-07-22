import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";

import { Link } from "react-router-dom";

import { ReactPhotoCollage } from "react-photo-collage";
export const Balouchistan = () => {
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      { source: `/assets/images/balouchistan/1.jpg` },
      { source: `/assets/images/balouchistan/2.jpg` },
      { source: `/assets/images/balouchistan/3.jpg` },
      { source: `/assets/images/balouchistan/4.jpg` },
      { source: `/assets/images/balouchistan/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  const [places, setPlaces] = useState([]);
  useEffect(async () => {
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();

    try {
      // const rPlaces = await placeservice.getPlacesByRegion("bl", source);
      const rPlaces = await placeservice.getPlacesByRegion("bl");
      setPlaces(rPlaces);
    } catch (err) {
      console.log(err);
    }

    return () => {
      // source.cancel();
    };
  }, []);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
      </div>

      <h1 style={{ margin: "15px 0px" }}>Balochistan</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        Balochistan( Balochi: بلوچِستان‎; also romanised as Baluchistan) is an
        arid desert and mountainous region in South and Western Asia. It
        comprises the Pakistani province of Balochistan, the Iranian province of
        Sistan and Baluchestan, and the southern areas of Afghanistan, including
        Nimruz, Helmand and Kandahar provinces.Balochistan borders the
        Pashtunistan region to the north, Sindh and Punjab to the east, and
        Persian regions to the west. South of its southern coastline, including
        the Makran Coast, are the Arabian Sea and the Gulf of Oman.
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
