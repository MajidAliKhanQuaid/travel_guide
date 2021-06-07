import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import history from "./../History";

const TravelPackages = ({ isLoggedIn }) => {
  const [packages, setPackages] = useState([
    { company: "Chaly Ao", tagline: "tm chaly ao paharo'n ki qasam" },
    { company: "Asian Travels", tagline: "best service" },
    { company: "PIA Travels", tagline: "best air travel service" },
  ]);
  return (
    <>
      {packages.map((x) => (
        <Card style={{ marginTop: "10px" }}>
          <Card.Body>
            <div className="row">
              <h1 className="col-md-6 col-xs-6">{x.company}</h1>
              <h1 className="col-md-6 col-xs-6">
                <Button
                  className="float-right"
                  onClick={() => {
                    if (isLoggedIn) {
                      history.push({
                        pathname: "/ticket",
                        search: "?query=abc",
                        state: { place: 9494 },
                      });
                      alert("USER is logged INN");
                      return;
                    }
                    alert("USER is NOT logged INN");
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

export default TravelPackages;
