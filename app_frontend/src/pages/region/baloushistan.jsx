import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import placeservice from "./../../services/place.service";
import axios from "axios";

export const Balouchistan = () => {
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
