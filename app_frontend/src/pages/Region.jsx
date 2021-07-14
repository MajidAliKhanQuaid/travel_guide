import { useEffect, useState } from "react";
import { Col, Figure, Row, Card } from "react-bootstrap";
import { useParams } from "react-router";
import placeservice from "./../services/place.service";
import { regions } from "../conts";
import { ReactPhotoCollage } from "react-photo-collage";
import history from "./../History";
export const Region = () => {
  const { region } = useParams();
  const [places, setPlaces] = useState([]);
  const [reg, setReg] = useState({});
  const [setting, setCollagSetting] = useState({
    width: "100%",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: [
      // { source: `/assets/images/federal/1.jpg` },
      // { source: `/assets/images/federal/2.jpg` },
      // { source: `/assets/images/federal/3.jpg` },
      // { source: `/assets/images/federal/4.jpg` },
      // { source: `/assets/images/federal/5.jpg` },
    ],
    showNumOfRemainingPhotos: true,
  });
  useEffect(async () => {
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    const rg = regions.find((x) => x.key == region);
    if (!rg) {
      history.push("/");
    }

    setReg(rg);
    const images = [1, 2, 3, 4, 5].map((x) => {
      return {
        source: `/assets/images/${rg.dir}/${1}.jpg`,
        // source: `/assets/images/balouchistan/1.jpg`,
      };
    });
    console.log("IMAGES", images);
    setCollagSetting({
      ...setting,
      photos: [...images],
    });
    console.log("SETTING ", setting);

    try {
      // const rPlaces = await placeservice.getPlacesByRegion("bl", source);
      const rPlaces = await placeservice.getPlacesByRegion(rg.key);
      setPlaces(rPlaces);
    } catch (err) {
      console.log(err);
    }

    return () => {
      // source.cancel();
    };
  }, [region]);

  return (
    <>
      <div className="row">
        <ReactPhotoCollage {...setting} />
      </div>

      <h1 style={{ margin: "15px 0px" }}>{reg.text}</h1>

      <div style={{ textAlign: "justify", textJustify: "inter-word" }}>
        {reg.info}
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
                  ? `${process.env.REACT_APP_API_BASE_URL}
/uploads/${x.images[0]}`
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
