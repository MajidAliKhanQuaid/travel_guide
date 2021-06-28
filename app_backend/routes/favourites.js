var express = require("express");
const cors = require("cors");
var router = express.Router();
const { ObjectID } = require("bson");
var path = require("path");

const colName = "favourites";

router.get("/", async function (req, res, next) {
  try {
    const favs = await req.db
      .collection(colName)
      .find({ username: req.user.username })
      .toArray();

    const objectIds = favs
      .filter((x) => x.username.length > 0)
      .map((x) => ObjectID(x.placeId));

    const favPlaces = await req.db
      .collection("places")
      .find({ _id: { $in: objectIds }, deleted: false })
      .toArray();

    res.send(favPlaces);
  } catch (err) {
    res.send({ message: err.message });
  }
  // .toArray()
  // .then((r) => {
  //   const objectIds = r.map((x) => ObjectID(x._id));
  //   // res.send(objectIds);
  //   if (objectIds.length > 0) {
  //     req.db
  //       .collection("places")
  //       .find({ _id: { $in: [ObjectId("6085e46b08d0b121207904ad")] } })
  //       .toArray()
  //       .then((places) => res.send({ a: 1, places }))
  //       .catch((err) => res.send({ error: true, err }));
  //   }
  // })
  // .catch((e) => res.send({ isError: true, e }));
});

// add to favourites
router.get("/add", function (req, res, next) {
  // req.query.identifier
  // req.query.category

  req.db
    .collection(colName)
    .updateOne(
      {
        placeId: req.query.identifier,
        username: req.user.username,
      },
      {
        $set: {
          placeId: req.query.identifier,
          username: req.user.username,
          dated: new Date(),
        },
      },
      { upsert: true }
    )
    .then((result) => res.send({ added: true }))
    .catch((err) => console.error("Something went wrong ", err));
});

router.get("/remove", function (req, res, next) {
  req.db
    .collection(colName)
    .deleteOne({
      placeId: req.query.identifier,
      username: req.user.username,
    })
    .then((result) => res.send({ deleted: true }))
    .catch((err) => res.send({ deleted: false }));
});

// exporting the module
module.exports = router;
