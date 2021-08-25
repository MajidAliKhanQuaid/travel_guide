const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  upload = require("./../server/multer_config"),
  Place = require("../models/place.model"),
  Favourite = require("../models/favourite.model"),
  RecentlyViewed = require("../models/recentlyviewed.model"),
  Comment = require("../models/comment.model"),
  Review = require("../models/review.model");

const RADIUS = 50; // km

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

// loads all places
router.get("/", async function (req, res, next) {
  let places;
  if (req.query.category) {
    places = await Place.find({
      category: req.query.category,
      deleted: false,
    }).exec();
  } else if (req.query.region) {
    places = await Place.find({
      region: req.query.region,
      deleted: false,
    }).exec();
  } else {
    places = await Place.find({
      deleted: false,
    }).exec();
  }

  res.status(200).json(places);
});

// loads one place, based on query parameter `id`
router.get("/get", async function (req, res, next) {
  try {
    let nearbyPlaces = [];
    //
    // if (req.query.lon && req.query.lat) {
    //   console.log("Query ", req.query);
    //   let pl = await Place.find({
    //     deleted: false,
    //     _id: { $ne: req.query.id },
    //     longitude: { $ne: undefined },
    //     longitude: { $gt: 0 },
    //     latitude: { $ne: undefined },
    //     latitude: { $gt: 0 },
    //   }).exec();

    //   let inRadius = pl.filter((x) => {
    //     let rad = calcCrow(
    //       req.query.lat,
    //       req.query.lon,
    //       x.latitude,
    //       x.longitude
    //     );
    //     // console.log("RADIUS IS ", rad, " PLACE ", x);
    //     if (rad <= RADIUS) return true;
    //     return false;
    //   });
    //   nearbyPlaces = inRadius;
    // console.log("InRadius ", inRadius);
    // nearbyPlaces = inRadius.map((x) => {
    //   let distance = calcCrow(
    //     req.query.lat,
    //     req.query.lon,
    //     x.latitude,
    //     x.longitude
    //   );
    //   return { ...x, distance };
    // });

    //   console.log("Nearby Places ", nearbyPlaces);
    //   console.log("VALID PLACES ", pl.length, "In Radius ", inRadius.length);
    // }
    //
    let place = await Place.findById(req.query.id).exec();

    if (
      place.longitude &&
      place.longitude > 0 &&
      place.latitude &&
      place.latitude > 0
    ) {
      console.log("PLACE ", place.longitude, place.latitude);
      let pl = await Place.find({
        deleted: false,
        _id: { $ne: req.query.id },
        longitude: { $ne: undefined },
        longitude: { $gt: 0 },
        latitude: { $ne: undefined },
        latitude: { $gt: 0 },
      }).exec();

      let inRadius = pl.filter((x) => {
        let rad = calcCrow(
          place.latitude,
          place.longitude,
          x.latitude,
          x.longitude
        );
        // console.log("RADIUS IS ", rad, " PLACE ", x);
        if (rad <= RADIUS) return true;
        return false;
      });
      nearbyPlaces = inRadius;
    }

    let reviews = await Review.find({
      deleted: false,
      place: place._id,
    }).exec();

    let comments = await Comment.find({
      deleted: false,
      place: place._id,
    }).exec();

    let fav = await Favourite.findOne({
      place: req.query.id,
      username: req.user.username,
    });

    // POINT
    // if you don't use .toJSON(), it'll spread the mongoose object
    place = {
      ...place.toJSON(),
      nearbyPlaces,
      comments: comments,
      reviews: reviews,
      is_fav: fav ? true : false,
    };
    if (req.query.view) {
      try {
        await RecentlyViewed.findOneAndUpdate(
          { username: req.user.username, place: req.query.id },
          { lastViewed: new Date(), deleted: false },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (err_update) {}
    }
    res.status(200).json(place);
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
  return;
});

// saves a places and save attachments as well
router.post(
  "/save",
  upload.array("attachments"),
  async function (req, res, next) {
    const {
      name,
      description,
      location,
      longitude,
      latitude,
      category,
      region,
    } = req.body;

    if (!name) {
      res.status(200).json({
        success: false,
        message: `Please enter valid name, must be at least 3 characters long`,
      });
      return;
    }

    if (!description) {
      res.status(200).json({
        success: false,
        message: `Please enter valid description, must be at least 3 characters long`,
      });
      return;
    }

    if (!longitude) {
      res.status(200).json({
        success: false,
        message: `Please enter valid longitude`,
      });
      return;
    }

    if (!latitude) {
      res.status(200).json({
        success: false,
        message: `Please enter valid latitude`,
      });
      return;
    }

    if (!region) {
      res.status(200).json({
        success: false,
        message: `Please enter valid region`,
      });
      return;
    }

    if (!category) {
      res.status(200).json({
        success: false,
        message: `Please enter valid category`,
      });
      return;
    }

    const ePlace = await Place.findOne({
      name: name,
      deleted: false,
    }).exec();
    if (ePlace) {
      res
        .status(200)
        .json({ success: false, message: `Place '${name}' already exists` });
      return;
    }
    const formData = req.body;
    let images = [];
    if (req.files) {
      for (var fileIndex in req.files) {
        console.log(req.files[fileIndex].filename);
        images.push(req.files[fileIndex].filename);
      }
    }
    var place = new Place({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      description: description,
      location: location,
      longitude: longitude,
      latitude: latitude,
      category: category,
      region: region,
      images: images,
      deleted: false,
      createdBy: req.user.username,
      createdOn: new Date(),
    });
    try {
      var response = await place.save();
      res.status(201).json({ success: true, result: response });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, err });
    }
  }
);

// deletes one place, based on query parameter `id`
router.delete("/delete", async function (req, res, next) {
  if (req.query && req.query.id) {
    try {
      const result = await Place.findOneAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            deleted: true,
            deletedOn: new Date(),
          },
        }
      );
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(400);
  }
});

// used for search filter
router.post("/search", async function (req, res, next) {
  try {
    const places = await Place.find({
      deleted: false,
      name: { $regex: `${req.body.query}`, $options: "i" },
    }).exec();

    console.log("SEARCH | Response", places);
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json(err);
  }
});

// used for update
router.post(
  "/update",
  upload.array("attachments"),
  async function (req, res, next) {
    const {
      _id,
      name,
      description,
      location,
      longitude,
      latitude,
      category,
      region,
    } = req.body;

    if (!name) {
      res.status(200).json({
        success: false,
        message: `Please enter valid name, must be at least 3 characters long`,
      });
      return;
    }

    if (!description) {
      res.status(200).json({
        success: false,
        message: `Please enter valid description, must be at least 3 characters long`,
      });
      return;
    }

    if (!longitude) {
      res.status(200).json({
        success: false,
        message: `Please enter valid longitude`,
      });
      return;
    }

    if (!latitude) {
      res.status(200).json({
        success: false,
        message: `Please enter valid latitude`,
      });
      return;
    }

    if (!region) {
      res.status(200).json({
        success: false,
        message: `Please enter valid region`,
      });
      return;
    }

    const ePlace = await Place.findOne({
      _id: { $ne: _id },
      name: name,
      deleted: false,
    }).exec();

    if (ePlace) {
      res
        .status(200)
        .json({ success: false, message: `Place '${name}' already exists` });
      return;
    }
    let images = [];
    if (req.files) {
      for (var fileIndex in req.files) {
        console.log(req.files[fileIndex].filename);
        images.push(req.files[fileIndex].filename);
      }
    }
    try {
      const result = await Place.updateOne(
        { _id: _id },
        {
          $set: {
            name: name,
            description: description,
            location: location,
            longitude: longitude,
            latitude: latitude,
            category: category,
            region: region,
            updatedBy: req.user.username,
            updatedOn: new Date(),
          },
          $addToSet: {
            images: {
              $each: images,
            },
          },
        }
      );
      res.status(200).json({ success: true, result });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// used for update
router.post("/deletepic", async function (req, res, next) {
  try {
    const result = await Place.findOneAndUpdate(
      { _id: req.body.identifier },
      {
        $pull: {
          images: req.body.image,
        },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/recentlyviewed", async function (req, res, next) {
  const recent = await RecentlyViewed.find({
    username: req.user.username,
  })
    .populate("place")
    .exec();

  const result = recent.filter((x) => x.place && !x.place.deleted);
  res.status(200).json(result);
});

// exporting the module
module.exports = router;
