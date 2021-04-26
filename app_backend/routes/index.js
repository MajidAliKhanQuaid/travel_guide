var express = require("express");
const cors = require("cors");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");
var accountQuery = require("./../queries/accountQuery");
var seedQuery = require("./../queries/seedQuery");
const { response } = require("express");
var mongoHelper = require("./../mongoHelper");
var path = require("path");

/* GET home page. */
router.get("/"),
  function (req, res, next) {
    const userData = accountQuery
      .findAccountByUsername(req.db, "usernadiakhan@gmail.com")
      .then((success) => {
        console.log("Success ", success);
        // res.body = success;
        res.status(200).json(success);
        // next();
      })
      .catch((masla) => {
        res.status(500).json({
          status: "Request could be processed due to internal server error",
        });
        // next();
      });

    // res.render("index"}, { title: userData });
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

router.post("/login", function (req, res, next) {
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
  const collection = "accounts";
  seedQuery
    .findByKey(req.db, collection, {
      username: loginData.Username,
      password: loginData.Password,
    })
    .then((r1) => {
      console.log("R1 is ", r1);
      if (r1) {
        console.log(`'${r1.name}' under id '${r1._id}' was already saved`);
        var clone = Object.assign({}, r1);
        // delete clone._id;
        console.log("Creating token for ", clone);
        const token = jwtHelper.generateAccessToken(clone);
        const refreshToken = jwtHelper.generateRefreshToken(clone);
        return res.send({
          name: r1.name,
          isValid: true,
          token: token,
          refreshToken: refreshToken,
        });
      } else {
        return res.send({
          isValid: false,
          errorMessage: "Please enter valid credentials 2",
        });
      }
    })
    .catch((er1) => {
      console.log("Failed to due to error ", er1);
      return res.send({
        isValid: false,
        errorMessage: "Failed due to error",
      });
    });

  // let userExists =
  //   loginData.Username == "majid" && loginData.Password == "1234";
  // if (!userExists) {
  //   res.send({
  //     isValid: false,
  //     errorMessage: "Please enter valid credentials",
  //   });
  //   return;
  // }
  // return res.send({ isValid: true });
  // res.render("login");
});

router.get("/seed", function (req, res, next) {
  seedFoodIfNotExists(req, res, next, false);
  seedCitiesIfNotExists(req, res, next, false);
  return res.send({ msg: "/Send is working" });
});

function seedFoodIfNotExists(req, res, next, deleteExisting = false) {
  const collection = "foods";
  const foods = [
    { name: "Aaalo Paratha", cityIds: [] },
    { name: "Pao Bhaji", cityIds: [] },
    { name: "Nihari", cityIds: [] },
    { name: "Paye", cityIds: [] },
    { name: "Lassi", cityIds: [] },
  ];
  for (index in foods) {
    const food = foods[index];
    console.log("Food ", food);
    seedQuery
      .findByKey(req.db, collection, { name: food.name })
      .then((r1) => {
        if (!r1) {
          seedQuery
            .addToCollection(req.db, collection, food)
            .then((r2) => {
              console.log("Food is saved");
            })
            .catch((er2) => {
              console.log("Food could not be saved due to error ", er2);
            });
        } else {
          console.log(`'${r1.name}' under id '${r1._id}' was already saved`);
        }
      })
      .catch((er1) => {
        console.log("Failed to fetch food due to ", er1);
      });
  }
}

function seedCitiesIfNotExists(req, res, next, deleteExisting = false) {
  const collection = "cities";
  const cities = [
    { name: "Lahore", province: "PU" },
    { name: "Faisalabad", province: "PU" },
    { name: "Multan", province: "PU" },
    { name: "Vihari", province: "PU" },
    { name: "Rawalpindi", province: "PU" },
    { name: "Peshawar", province: "KP" },
    { name: "Mardan", province: "KP" },
    { name: "Noshehra", province: "KP" },
    { name: "Swabi", province: "KP" },
    { name: "Swat", province: "KP" },
    { name: "Karachi", province: "SD" },
    { name: "Hyderabad", province: "SD" },
    { name: "Ghotki", province: "SD" },
    { name: "Badeen", province: "SD" },
    { name: "Thatta", province: "SD" },
  ];
  for (index in cities) {
    const city = cities[index];
    console.log("City ", city);
    seedQuery
      .findByKey(req.db, collection, { name: city.name })
      .then((r1) => {
        if (!r1) {
          seedQuery
            .addToCollection(req.db, collection, city)
            .then((r2) => {
              console.log("City is saved");
            })
            .catch((er2) => {
              console.log("City could not be saved due to error ", er2);
            });
        } else {
          console.log(
            `City '${r1.name}' under id '${r1._id}' was already saved`
          );
        }
      })
      .catch((er1) => {
        console.log("Failed to fetch city due to ", er1);
      });
  }
}

module.exports = router;
