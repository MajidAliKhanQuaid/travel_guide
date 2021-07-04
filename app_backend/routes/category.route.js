const express = require("express"),
  mongoose = require("mongoose"),
  router = express.Router(),
  Category = require("../models/category.model");

router.get("/", async function (req, res, next) {
  let categories = {};
  try {
    categories = await Category.find({ deleted: false }).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: true, message: err });
  }
});

router.post("/update", async function (req, res, next) {
  const { _id, name } = req.body;
  if (!(_id && name)) {
    res.status(400);
    return;
  }
  try {
    const category = await Category.updateOne(
      { _id: id },
      { $set: { name: name } }
    );
    res.status(200).json({ success: true, result: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.post("/create", async function (req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json();
    return;
  }
  let category = {};
  try {
    category = await Category.findOne({ name: name.toLowerCase() }).exec();
    if (category) {
      res
        .status(200)
        .json({ success: false, message: `Category ${name} already exists` });
      return;
    }
  } catch (err) {
    console.log("failed here ", err);
    res.status(500).json({ success: false, message: err });
    return;
  }

  try {
    category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: name.toLowerCase(),
      deleted: false,
      createdBy: req.user.username,
      createdOn: new Date(),
    });

    let savedCategory = await category.save();
    res.status(201).json({ success: true, created: savedCategory });
    return;
  } catch (err) {
    console.log("failed here ", err);
    res.status(500).json({ success: false, message: err });
    return;
  }
});

router.post("/:catId", async function (req, res, next) {
  const categoryId = req.params.catId;
  try {
    const result = await Category.deleteOne({ _id: categoryId }).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, result: err });
  }
});

module.exports = router;
