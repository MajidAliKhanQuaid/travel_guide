const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  path = require("path"),
  jwtHelper = require("../jwtHelper"),
  Place = require("../models/place.model"),
  Favourite = require("../models/favourite.model"),
  RecentlyViewed = require("../models/recentlyviewed.model");

/* GET home page. */
router.get("/"),
  async function (req, res, next) {
    let name = "Guest";
    if (req.user) name = req.user.name;
    res.render("index", { title: name });
  };

module.exports = router;
