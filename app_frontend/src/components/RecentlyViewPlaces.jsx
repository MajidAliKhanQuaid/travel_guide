import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import history from "./../History";
import axios from "./../interceptor";

const RecentlyViewedPlaces = () => {
  useEffect(async () => {
    // recentlyviewed
    const lstFavs = await axios.post(`/recentlyviewed`);
    setPlaces(lstFavs.data);
  }, []);

  const [places, setPlaces] = useState([]);

  if (places.length == 0) return <></>;

  return (
    <>
      <h1>Recently Viewed Places</h1>
      {places.map((x) => (
        <Card style={{ marginTop: "10px" }}>
          <Card.Body>
            <div className="row">
              <h1 className="col-md-6 col-xs-6">{x.place.name}</h1>
              <h1 className="col-md-6 col-xs-6">
                <Button
                  className="float-right"
                  onClick={() => {
                    alert("Working");
                  }}
                >
                  Buy Tickets
                </Button>
              </h1>
            </div>
            <h5 className="text-muted">{x.tagline}</h5>
            <div></div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default RecentlyViewedPlaces;
