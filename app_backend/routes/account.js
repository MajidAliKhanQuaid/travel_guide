const { response } = require("express");
var express = require("express");
var accountQuery = require("./../queries/accountQuery");
var jwtHelper = require("./../jwtHelper");
const { ObjectID } = require("bson");

var router = express.Router();

/* GET account listing. */
router.get("/", function (req, res, next) {
  req.db
    .collection("accounts")
    .find()
    .toArray()
    .then((x) => {
      res.send(x);
    })
    .catch((x) => {
      res.send(x);
    });
});


/* GET account listing. */
router.get("/delete", function (req, res, next) {
  const col = "accounts";
  console.log(req.query);
  if (req.query && req.query.id) {
    req.db
      .collection(col)
      .findOneAndDelete({ _id: ObjectID(req.query.id) })
      .then((x) => {
        if (x) {
          res.send(x);
        } else {
          res.send({ status: "not found" });
        }
      });
  } else {
    res.sendStatus(400);
  }
});


/* GET account listing. */
router.get(
  "/info",
  jwtHelper.authenticateAccessToken,
  function (req, res, next) {
    res.send({ firstname: req.user.firstname, lastname: req.user.lastname });
  }
);

/* GET account listing. */
router.post("/create", function (req, res, next) {
  console.log(req.body);
  // if `req.username` is not valid
  if (!req.body.username)
    return res.status(400).json({ msg: "Bad request" }).send();
  // check if there's already user with `req.username`
  accountQuery
    .findAccountByUsername(req.db, req.body.username)
    .then((uSuccess) => {
      console.log("findAccountByUsername - Success", uSuccess);
      if (!uSuccess) {
        // if there's no user with `req.username` then create one
        accountQuery
          .addAccount(req.db, req.body)
          .then((aSuccess) => {
            var clone = Object.assign({}, aSuccess.ops[0]);
            // delete clone._id;
            console.log("Creating token for ", clone);
            const token = jwtHelper.generateAccessToken(clone);
            return res
              .status(200)
              .json({
                msg: "New account was registered",
                token: token,
                user: clone,
              })
              .send();
          })
          .catch((aErr) => {
            // if there's an error creating a user, send 500 reponse
            return res
              .status(500)
              .json({ msg: "New account could not be registered" })
              .send();
          });
      } else {
        // if there's already a user with `req.username` then tell user
        return res.status(200).json({ msg: "Username already exists" }).send();
      }
    })
    .catch((yErr) => {
      // if there's an error find user by `req.username`, send 500 reponse
      return res.status(500).json({ msg: "Internal server error" }).send();
    });
});

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

/* GET account listing. */
router.get("/auth/google", async function (req, res, next) {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  const user = await db.accounts.upsert({
    where: { email: email },
    update: { name, picture },
    create: { name, email, picture },
  });
  res.status(201);
  res.json(user);
});

module.exports = router;
