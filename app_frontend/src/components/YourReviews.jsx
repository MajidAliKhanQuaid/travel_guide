import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import history from "./../History";

const YourReviews = () => {
  const [reviews, setReviews] = useState([
    { name: "Chaly Ao", tagline: "tm chaly ao paharo'n ki qasam" },
  ]);
  return (
    <>
      {reviews.map((x) => (
        <Card style={{ marginTop: "10px" }}>
          <Card.Body>
            <div className="row">
              <h1 className="col-md-6 col-xs-6">{x.name}</h1>
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

export default YourReviews;
