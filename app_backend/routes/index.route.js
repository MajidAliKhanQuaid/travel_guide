const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  path = require("path"),
  jwtHelper = require("../jwtHelper"),
  Place = require("../models/place.model"),
  Favourite = require("../models/favourite.model"),
  RecentlyViewed = require("../models/recentlyviewed.model"),
  Review = require("../models/review.model");

router.get("/alam"),
  async function (req, res, next) {
    // console.log("TEST");
    // res.status(200).json({ name: "10" });
    let name = "Guest";
    if (req.user) name = req.user.name;
    res.render("<h1>TEST</h1>", { title: name });
  };

module.exports = router;
