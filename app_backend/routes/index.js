var express = require("express");
const cors = require("cors");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");
var path = require("path");

/* GET home page. */
router.get("/"),
  async function (req, res, next) {
    const user = await req.db
      .collection("accounts")
      .findOne({ username: "usernadiakhan@gmail.com" });

    res.send(user);
    // res.render("index", { title: userData });
    // return res.send(res.body);
  };

router.post("/verifytoken", function (req, res, next) {
  console.log("Calling `verifytoken` ");
  try {
    jwtHelper.authenticateAccessToken(req, res, next);
  } catch (err) {
    console.error("Error is ", err);
    return res.sendStatus(500);
  }
  // if (req.user) {
  //   console.log("Calling `verifytoken` - req.user ");
  //   return res.status(200).json({
  //     isValid: true,
  //     msg: `'{req.headers.authorization}' was valid`,
  //   });
  // }
});

router.get("/login", function (req, res, next) {
  res.send("You can't access this page from GET request");
});

router.post("/login", async function (req, res, next) {
  let loginData = req.body;
  console.log(loginData);
  let isValid = loginData.Username && loginData.Password;
  // mongodb search

  if (!isValid) {
    res.send({
      isValid: false,
      memberData: { username: loginData.Username },
      errorMessage: "Please enter valid credentials 1",
    });
    return;
  }
  const account = await req.db.collection("accounts").findOne({
    username: loginData.Username,
    password: loginData.Password,
  });
  if (account) {
    console.log(
      `'${account.name}' under id '${account._id}' was already saved`
    );
    var clone = Object.assign({}, account);
    // delete clone._id;
    console.log("Creating token for ", clone);
    const token = jwtHelper.generateAccessToken(clone);
    const refreshToken = jwtHelper.generateRefreshToken(clone);
    return res.send({
      name: account.name,
      isValid: true,
      token: token,
      refreshToken: refreshToken,
    });
  } else {
    console.log("Failed to due to error ", er1);
    return res.send({
      isValid: false,
      errorMessage: "Failed due to error",
    });
  }
});

module.exports = router;
