var express = require("express");
var mongoHelper = require("./../mongohelper");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");

/* GET users listing. */
router.get(
  "/list",
  jwtHelper.authenticateAccessToken,
  function (req, res, next) {
    // const users = mongoHelper.getUsersList();
    const users = mongoHelper.getUsers();
    res.send(users);
  }
);

module.exports = router;
