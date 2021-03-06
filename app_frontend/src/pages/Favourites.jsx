import { useEffect, useState } from "react";
import { Card, Container, Pagination } from "react-bootstrap";
import favService from "../services/fav.service";
import { Link } from "react-router-dom";
const Favourites = () => {
  useEffect(async () => {
    const favPlaces = await favService.getFavs();
    setFavs(favPlaces);
  }, []);
  const [favs, setFavs] = useState([]);
  return (
    <>
      <h1>Favourites</h1>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          flexFlow: "flex-wrap",
          flexWrap: "wrap",
        }}
      >
        {favs.map((x) => (
          <Card
            className="glass rounded-corners"
            style={{
              flex: "0 1 30%",
              margin: "1.6%",
            }}
          >
            <Card.Img
              variant="top"
              src={
                x.images.length > 0
                  ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${x.images[0]}`
                  : ""
              }
            />
            <Card.Body style={{ textAlign: "center" }}>
              <Link to={`/places/${x._id}`}>
                <Card.Title>{x.name}</Card.Title>
              </Link>
              {/* <Card.Subtitle className="mb-2 text-muted">
                {x.category}
              </Card.Subtitle> */}
              <Card.Link
                onClick={async () => {
                  const result = await favService.removeFromFavs(x._id);
                  if (result.deleted) {
                    const favPlaces = await favService.getFavs();
                    setFavs(favPlaces);
                  }
                }}
              >
                Remove
              </Card.Link>
              <Link className="card-link" to={`/places/${x._id}`}>
                Details
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Favourites;
