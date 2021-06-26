var express = require("express");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");
const { ObjectID } = require("mongodb");

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
    console.log("Account not found");
    return res.send({
      isValid: false,
      errorMessage: "Failed due to error",
    });
  }
});

router.post("/recentlyviewed", async function (req, res, next) {
  const rvPlaces = await req.db
    .collection("recentlyviewed")
    .find({ username: req.user.username })
    .limit(20000, function (e, d) {})
    .toArray();

  for (var i = 0; i < rvPlaces.length; i++) {
    var element = rvPlaces[i];
    var place = await req.db
      .collection("places")
      .findOne({ _id: ObjectID(element.placeId) });
    if (place) {
      element.place = place;
    }
  }
  const result = rvPlaces.filter((x) => x.place);
  res.send(result);
});

module.exports = router;
