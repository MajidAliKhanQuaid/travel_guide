import { useEffect, useState } from "react";
import {
  Container,
  Figure,
  Accordion,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

import Rating from "react-rating";

const YourReviews = ({ placeId, reviews, saveCallback, removeCallback }) => {
  const [review, setReview] = useState({ text: "", rating: 0 });
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Rating
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
                <Rating placeholderRating={x.rating} readonly />
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
