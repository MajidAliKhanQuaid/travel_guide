import { useEffect, useState } from "react";
import {
  Container,
  Figure,
  Accordion,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YourReviews = ({ placeId, reviews, saveCallback, removeCallback }) => {
  const [review, setReview] = useState({ text: "", rating: 0 });
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Rating
            style={{ marginBottom: "15px" }}
            placeholderSymbol={
              <FontAwesomeIcon
                icon={faStar}
                color={"yellow"}
                style={{ fontSize: "30px" }}
              />
            }
            emptySymbol={
              <FontAwesomeIcon icon={faStar} style={{ fontSize: "30px" }} />
            }
            fullSymbol={
              <FontAwesomeIcon
                icon={faStar}
                color={"yellow"}
                style={{ fontSize: "30px" }}
              />
            }
            placeholderRating={review.rating}
            onChange={async (value) => {
              setReview({ ...review, rating: value });
            }}
          />

          <input
            type="text"
            placeholder="Enter Comment .."
            className="form-control"
            value={review.text}
            onChange={(e) => {
              setReview({ ...review, text: e.target.value });
            }}
          />

          <button
            style={{ marginTop: "15px" }}
            className="btn btn-warning float-right"
            onClick={async () => {
              const result = await saveCallback(placeId, review);
              if (result) {
                setReview({ text: "", rating: 0 });
              }
            }}
          >
            Save Review
          </button>
        </div>
      </div>
      <div className="row">
        {reviews.map((x) => (
          <>
            <div className="col-md-12">
              <div>
                <Rating
                  style={{ marginBottom: "15px" }}
                  placeholderSymbol={
                    <FontAwesomeIcon
                      icon={faStar}
                      color={"yellow"}
                      style={{ fontSize: "30px" }}
                    />
                  }
                  emptySymbol={
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ fontSize: "30px" }}
                    />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      icon={faStar}
                      color={"yellow"}
                      style={{ fontSize: "30px" }}
                    />
                  }
                  placeholderRating={x.rating}
                  readonly
                />
              </div>
              <Alert
                variant="info"
                onClose={async () => {
                  await removeCallback(x._id);
                }}
                dismissible
              >
                "{x.text}", {x.createdBy}
              </Alert>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default YourReviews;
