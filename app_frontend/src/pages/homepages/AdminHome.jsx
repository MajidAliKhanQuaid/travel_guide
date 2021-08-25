import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearchLocation,
  faInfoCircle,
  faEgg,
  faMosque,
  faChartPie,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
const AdminHome = () => {
  const menus = [
    { title: "Accounts", url: "/accounts", icon: faUser },
    { title: "Places", url: "/places", icon: faSearchLocation },
    { title: "Categories", url: "/categories", icon: faEgg },
    // { title: "Culture", url: "/culture", icon: faEgg },
    // { title: "Mosque", url: "/mosque", icon: faMosque },
    // { title: "Gallery", url: "/gallery", icon: faImages },
    // { title: "Suggestion", url: "/suggestion", icon: faImages },
    // { title: "In Sights", url: "/insights", icon: faInfoCircle },
    // { title: "Logs", url: "/logs", icon: faChartPie },
    // { title: "test", url: "/test", icon: faSearchLocation },
  ];
  return (
    <>
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
        {menus.map((x) => (
          <Link
            to={x.url}
            style={{
              flex: "0 1 30%",
              margin: "1.6%",
            }}
          >
            <Card className="glass" style={{ borderRadius: "25% 0" }}>
              <Card.Body>
                <FontAwesomeIcon icon={x.icon} style={{ fontSize: "50px" }} />
                <Card.Title>{x.title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                Card Subtitle
              </Card.Subtitle>
              <Card.Text>{x.description}</Card.Text>
              <Card.Link href="#">Remove</Card.Link>
              <Card.Link href="#">Details</Card.Link> */}
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AdminHome;
