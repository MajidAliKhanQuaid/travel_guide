const express = require("express");
const jwtHelper = require("./../jwtHelper");
const { ObjectID } = require("bson");

var router = express.Router();

/* GET account listing. */
router.get("/", async function (req, res, next) {
  const accounts = await req.db
    .collection("accounts")
    .find({ deleted: false })
    .toArray();
  res.send(accounts);
});

/* GET account listing. */
router.get("/delete", async function (req, res, next) {
  const col = "accounts";
  console.log(req.query);
  if (req.query && req.query.id) {
    const result = await req.db.collection(col).updateOne(
      { _id: ObjectID(req.query.id) },
      {
        $set: {
          deleted: true,
          deletedOn: new Date(),
        },
      }
    );
    res.send({ success: true });
  } else {
    res.sendStatus(400);
  }
});

/* GET account listing. */
router.get("/info", function (req, res, next) {
  res.send({ name: req.user.name });
});

/* GET account listing. */
router.post("/create", async function (req, res, next) {
  console.log(req.body);
  let { roles } = req.body;
  if (!roles || (roles && roles.length == 0)) {
    roles = ["tourist"];
  }

  const payload = { ...req.body, roles };
  // if `req.username` is not valid
  if (!payload.username)
    return res.status(400).json({ msg: "Bad request" }).send();
  // check if there's already user with `req.username`
  const user = await req.db
    .collection("accounts")
    .findOne({ username: payload.username });
  if (!user) {
    const response = await req.db.collection("accounts").insertOne(payload);
    var clone = Object.assign({}, response.ops[0]);
    // delete clone._id;
    console.log("Creating token for ", clone);
    const token = jwtHelper.generateAccessToken(clone);
    return res
      .status(200)
      .json({
        success: true,
        msg: "New account was registered",
        token: token,
        user: clone,
      })
      .send();
  } else {
    return res
      .status(200)
      .json({
        success: false,
        msg: "Username already exists",
      })
      .send();
  }
});

router.post("/register", async function (req, res, next) {
  // console.log(req.body);
  // if `req.username` is not valid
  if (!req.body.username)
    return res.status(400).json({ msg: "Bad request" }).send();
  // check if there's already user with `req.username`
  const user = await req.db
    .collection("accounts")
    .findOne({ username: req.body.username });
  if (!user) {
    const response = await req.db.collection("accounts").insertOne({
      ...req.body,
      domain: "system",
      roles: ["tourist"],
      deleted: false,
      createdOn: new Date(),
    });
    var clone = Object.assign({}, response.ops[0]);
    // delete clone._id;
    // console.log("Creating token for ", clone);
    const token = jwtHelper.generateAccessToken(clone);
    return res
      .status(200)
      .json({
        success: true,
        msg: "New account was registered",
        token: token,
        user: clone,
      })
      .send();
  } else {
    return res
      .status(200)
      .json({
        success: false,
        msg: "Username already exists",
      })
      .send();
  }
});

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

/* GET account listing. */
router.post("/auth/facebook", async function (req, res, next) {
  const { name, email, accessToken } = req.body;
  if (name && email && accessToken) {
    await req.db.collection("accounts").updateOne(
      { username: email },
      {
        $set: {
          name: name,
          username: email,
          domain: "facebook",
          roles: ["tourist"],
          deleted: false,
          createdOn: new Date(),
        },
      }
    );
    const user = await req.db
      .collection("accounts")
      .findOne({ username: email });
    // console.log("User ", user);
    if (user) {
      const token = jwtHelper.generateAccessToken(user);
      return res
        .status(201)
        .json({
          success: true,
          msg: "New account was registered",
          token: token,
          name: user.name,
        })
        .send();
    } else {
      return res
        .status(200)
        .json({
          success: false,
          message: "User could not be updated",
        })
        .send();
    }
  } else {
    // console.log("Fields are not valid");
    return res
      .status(200)
      .json({
        success: false,
        message: "Fields are not valid",
      })
      .send();
  }
});

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
