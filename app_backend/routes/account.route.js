const express = require("express"),
  mongoose = require("mongoose"),
  jwtHelper = require("../jwtHelper"),
  Account = require("../models/account.model"),
  { OAuth2Client } = require("google-auth-library"),
  client = new OAuth2Client(process.env.CLIENT_ID);

const router = express.Router();

router.get("/", async function (req, res, next) {
  const accounts = await Account.find({ deleted: false }).exec();
  res.status(200).json(accounts);
});

router.get("/delete", async function (req, res, next) {
  const col = "accounts";
  console.log(req.query);
  if (req.query && req.query.id) {
    const result = await Account.findOneAndUpdate(
      { _id: req.query.id },
      { deleted: true }
    ).exec();

    res.status(200).json({ success: true });
  } else {
    res.status(400);
  }
});

router.get("/info", function (req, res, next) {
  res.status(200).json({ name: req.user.name });
});

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const account = await Account.findOne({
      deleted: false,
      username: username,
      password: password,
      domain: "system",
    }).exec();
    if (account) {
      console.log(
        `'${account.name}' under id '${account._id}' was already saved`
      );

      const token = jwtHelper.generateAccessToken({
        _id: account._id,
        name: account.name,
        username: account.username,
        roles: account.roles,
      });
      const refreshToken = jwtHelper.generateRefreshToken({
        _id: account._id,
        name: account.name,
        username: account.username,
        roles: account.roles,
        refresh: "is_refresh_token",
      });
      res.status(200).json({
        name: account.name,
        success: true,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      console.log("Account not found");
      return res.status(200).json({
        success: false,
        message: "Enter valid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/register", async function (req, res, next) {
  let { name, username, roles, password } = req.body;
  console.log(req.body);
  if (!roles || (roles && roles.length == 0)) {
    roles = ["tourist"];
  }

  if (!name || (name && name.length < 4)) {
    res.status(200).json({
      success: false,
      message: "name must have at least 4 letters",
    });
    return;
  }

  if (!username || (username && username.length < 4)) {
    res.status(200).json({
      success: false,
      message: "username must have at least 4 letters",
    });
    return;
  }

  if (!password || (password && password.length < 5)) {
    res.status(200).json({
      success: false,
      message: "password must have at least 5 letters",
    });
    return;
  }

  const accountWithUsername = await Account.findOne({
    username: username,
    deleted: false,
  }).exec();
  if (accountWithUsername) {
    res
      .status(200)
      .json({ success: false, message: "username already exists" });
    return;
  }

  try {
    const account = new Account({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      username: username,
      domain: "system",
      roles: roles,
      password: password,
      createdOn: new Date(),
      deleted: false,
    });
    const result = await account.save();

    const token = jwtHelper.generateAccessToken({
      _id: result._id,
      name: result.name,
      username: result.username,
      roles: roles,
    });

    const refreshToken = jwtHelper.generateRefreshToken({
      _id: result._id,
      name: result.name,
      username: result.username,
      roles: result.roles,
      refresh: "is_refresh_token",
    });

    res.status(201).json({
      success: true,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/auth/facebook", async function (req, res, next) {
  const { name, email, accessToken } = req.body;
  try {
    const result = await Account.findOneAndUpdate(
      { username: email, deleted: false },
      {
        name: name,
        username: email,
        domain: "facebook",
        roles: ["tourist"],
        deleted: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).exec();
    const token = jwtHelper.generateAccessToken({
      _id: result._id,
      name: result.name,
      username: result.username,
      roles: roles,
    });
    console.log("Result ", result);
    res.status(201).json({ success: true, token: token, user: result });
  } catch (err_update) {
    console.log(err_update);
    res.status(500).json(err_update);
  }
});

router.get("/auth/google", async function (req, res, next) {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    const result = await RecentlyViewed.findOneAndUpdate(
      { username: email, deleted: false },
      {
        name: name,
        username: email,
        domain: "google",
        roles: ["tourist"],
        deleted: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).exec();
    const appToken = jwtHelper.generateAccessToken({
      _id: result._id,
      name: result.name,
      username: result.username,
      roles: result.roles,
    });
    res.status(201).json({ success: true, token: appToken, user: result });
  } catch (err_update) {
    res.status(500).json(err_update);
  }
});

router.post("/verifytoken", function (req, res, next) {
  try {
    jwtHelper.authenticateAccessToken(req, res, next);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
