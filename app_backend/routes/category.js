const { response } = require("express");
var express = require("express");
var jwtHelper = require("./../jwtHelper");
const { ObjectID } = require("bson");

var router = express.Router();

/* GET account listing. */
router.get("/", async function (req, res, next) {
  const categories = await req.db
    .collection("categories")
    .find()
    .limit(20000, function (e, d) {})
    .toArray();

  res.status(200);
  res.json(categories);
});

router.post("/update", async function (req, res, next) {
  const { _id, name } = req.body;
  if (!(_id && name)) {
    res.status(400).send();
    return;
  }
  const category = await req.db
    .collection("categories")
    .findOne({ name: name.toLowerCase() });
  if (category) {
    // if category already exists with such name
    if (category._id != ObjectID(_id)) {
      res.status(200).send({
        success: false,
        message: `category ${category.name} already exists`,
      });
    }
  } else {
    await req.db.collection("categories").updateOne(
      { _id: ObjectID(_id) },
      {
        $set: {
          name: name.toLowerCase(),
          updatedBy: req.user.username,
          updatedOn: new Date(),
        },
      },
      { upsert: true }
    );
    res.status(200).send({
      success: true,
      message: `category has been updated`,
    });
  }
});

router.post("/create", async function (req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).send();
    return;
  }
  const category = await req.db
    .collection("categories")
    .findOne({ name: name.toLowerCase() });
  console.log("CATEGORY IS ", category);
  if (category) {
    res.status(200).send({
      success: false,
      message: `category ${category.name} already exists`,
    });
  } else {
    await req.db.collection("categories").insertOne({
      name: name.toLowerCase(),
      deleted: false,
      createdBy: req.user.username,
      createdOn: new Date(),
    });
    return res
      .status(201)
      .json({
        success: true,
        message: `category ${name} has been created`,
      })
      .send();
  }
});

module.exports = router;
