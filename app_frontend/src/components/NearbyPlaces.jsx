import "./RecentlyViewedPlaces.style.scss";
import history from "./../History";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

const NearbyPlaces = ({ places }) => {
  return (
    <>
      {places && places.length > 0 && (
        <>
          <div className="row">
            <h1 className="col-md-6" style={{ marginTop: "35px" }}>
              Nearby Places
            </h1>
            <Link to="" className="col-md-6 text-right"></Link>
          </div>
          <div
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "row",
              flexFlow: "flex-wrap",
              flexWrap: "wrap",
              alignContent: "left",
              justifyContent: "left",
            }}
          >
            {places.slice(0, 3).map((x, i) => (
              <Link
                style={{ flex: "0 1 30%", margin: "1.6%" }}
                to={`/places/${x._id}`}
                className="card-region-link"
                key={"region-cards" + i}
                onClick={() => {
                  history.push(`/places/${x._id}`);
                  window.location.reload();
                }}
              >
                <Animated
                  animationIn="jello"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <Card className="glass card-region" x={x.text}>
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
                      <Card.Title className="mb-2 text-center">
                        {x.name}
                      </Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted text-center">
                        Card Subtitle
                      </Card.Subtitle> */}
                    </Card.Body>
                  </Card>
                </Animated>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default NearbyPlaces;
