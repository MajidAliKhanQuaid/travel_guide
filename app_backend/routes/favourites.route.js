const express = require("express"),
  router = express.Router(),
  Favourite = require("../models/favourite.model"),
  Place = require("../models/place.model");

router.get("/", async function (req, res, next) {
  try {
    const favs = await Favourite.find({
      username: req.user.username,
    }).exec();

    if (!Array.isArray(favs)) {
      res.status(200).json([]);
      return;
    }

    const favPlaceIds = favs.map((x) => x.place);

    const favPlaces = await Place.find({
      _id: { $in: favPlaceIds },
      deleted: false,
    }).exec();

    if (!Array.isArray(favPlaces)) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(favPlaces);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add to favourites
router.get("/add", async function (req, res, next) {
  // req.query.identifier
  // req.query.category
  try {
    const fav = await Favourite.findOneAndUpdate(
      { place: req.query.identifier, username: req.user.username },
      {
        place: req.query.identifier,
        username: req.user.username,
        dated: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ added: true, fav });
  } catch (err_update) {
    res.status(500).json(err_update);
  }
});

router.get("/remove", async function (req, res, next) {
  try {
    const result = await Favourite.findOneAndDelete({
      place: req.query.identifier,
      username: req.user.username,
    });
    res.status(200).json({ deleted: true, result });
  } catch (err) {
    res.status(500);
  }
});

// exporting the module
module.exports = router;
