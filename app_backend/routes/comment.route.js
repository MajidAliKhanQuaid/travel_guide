const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  Comment = require("../models/comment.model"),
  Review = require("../models/review.model");

router.get("/:place", async function (req, res, next) {
  const comments = Comment.find({
    deleted: false,
    place: req.params.place,
    createdBy: req.user.name,
    createdOn: new Date(),
  }).exec();
  res.status(200).json(comments);
});

router.delete("/:comment", async function (req, res, next) {
  const result = await Comment.updateOne(
    { _id: req.params.comment },
    {
      $set: {
        deleted: true,
        deletedOn: new Date(),
      },
    }
  );
  res.status(200).json(result);
});

router.post("/save1", async function (req, res, next) {
  const { _id, identifier, text, rating } = req.body;
  if (!(identifier && text)) {
    res.status(400);
    return;
  }
  try {
    if (!_id) {
      const review = new Review({
        _id: new mongoose.Types.ObjectId(),
        place: identifier,
        text: text,
        rating: rating,
        deleted: false,
        edited: false,
        createdBy: req.user.name,
        createdOn: new Date(0),
      });
      const result = await review.save();
      res.status(200).json(result);
    } else {
      const result = await Review.updateOne(
        { _id: id },
        {
          $set: {
            place: identifier,
            text: text,
            rating: rating,
            edited: true,
            updatedBy: req.user.name,
            updatedOn: new Date(),
          },
        }
      );
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/save", async function (req, res, next) {
  const { _id, identifier, text } = req.body;
  if (!(identifier && text)) {
    res.status(400);
    return;
  }
  try {
    if (!_id) {
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        place: identifier,
        text: text,
        deleted: false,
        edited: false,
        createdBy: req.user.name,
        createdOn: new Date(0),
      });
      const result = await comment.save();
      res.status(200).json(result);
    } else {
      const result = await Comment.updateOne(
        { _id: id },
        {
          $set: {
            place: identifier,
            text: text,
            edited: true,
            updatedBy: req.user.name,
            updatedOn: new Date(),
          },
        }
      );
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
