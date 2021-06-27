var express = require("express");
const cors = require("cors");
var router = express.Router();
const { ObjectID } = require("bson");
var path = require("path");

const _collection = "places";

// multer is used for processing file attachements
const multer = require("multer");
var storage = multer.diskStorage({
  // multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") ==
      false
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// loads all places
router.get("/", async function (req, res, next) {
  var test = await await req.db.collection(_collection).find().toArray();
  for (var i = 0; i < test.length; i++) {
    var element = test[i];
    element.placeCategory = await req.db
      .collection("categories")
      .findOne({ _id: ObjectID(element.category) });
  }

  const result = await req.db
    .collection(_collection)
    .find({ deleted: false })
    .limit(20000, function (e, d) {})
    .toArray();
  res.send(result);
});

// loads one place, based on query parameter `id`
router.get("/get", async function (req, res, next) {
  console.log(req.query);
  if (req.query && req.query.id) {
    const result = await req.db
      .collection(_collection)
      .findOne({ _id: ObjectID(req.query.id) });
    if (result) {
      // updating recently viewed
      await req.db.collection("recentlyviewed").updateOne(
        { username: req.user.username, placeId: req.query.id },
        {
          $set: {
            placeId: req.query.id,
            username: req.user.username,
            dated: new Date(),
          },
        },
        { upsert: true }
      );
      // checking if place is favourite or not
      const fav = await req.db
        .collection("favourites")
        .findOne({ placeId: req.query.id, username: req.user.username });
      if (fav) {
        // console.log("FAV found");
        if (req.query.view) {
          // console.log("VIEW found");
          // we'll upsert one record here
        }
        res.send({ ...result, is_fav: true, success: true });
      } else {
        res.send({ ...result, is_fav: false, success: true });
      }
    } else {
      res.send({ message: "not found", success: false });
    }
  } else {
    res.send({ status: "invalid request" });
  }
});

// saves a places and save attachments as well
router.post(
  "/save",
  upload.array("attachments"),
  async function (req, res, next) {
    const { name, description, location, category } = req.body;
    console.log(req.body);
    const formData = req.body;
    let images = [];
    if (req.files) {
      for (var fileIndex in req.files) {
        console.log(req.files[fileIndex].filename);
        images.push(req.files[fileIndex].filename);
      }
    }
    await req.db.collection(_collection).insertOne({
      name: name,
      description: description,
      location: location,
      category: category,
      images: images,
      deleted: false,
      createdBy: req.user.username,
      createdOn: new Date(),
    });
    res.send({ success: true });
  }
);

// deletes one place, based on query parameter `id`
router.post("/delete", async function (req, res, next) {
  console.log(req.query);
  if (req.query && req.query.id) {
    const result = await req.db.collection(_collection).updateOne(
      { _id: ObjectID(req.query.id) },
      {
        $set: {
          deleted: true,
          deletedOn: new Date(),
        },
      }
    );
    // .findOneAndDelete({ _id: ObjectID(req.query.id) });
    res.send({ success: true });
  } else {
    res.send({ success: false, message: "invalid request" });
  }
});

// used for search filter
router.post("/search", async function (req, res, next) {
  console.log("search place", req.body.query);
  const result = await req.db
    .collection(_collection)
    .find({
      deleted: false,
      name: { $regex: `${req.body.query}`, $options: "i" },
    })
    .toArray();
  res.send(result);
});

// used for update
router.post(
  "/update",
  upload.array("attachments"),
  async function (req, res, next) {
    const { _id, name, description, location, category } = req.body;
    console.log(req.body);
    let images = [];
    if (req.files) {
      for (var fileIndex in req.files) {
        console.log(req.files[fileIndex].filename);
        images.push(req.files[fileIndex].filename);
      }
    }
    const result = req.db.collection(_collection).updateOne(
      { _id: ObjectID(_id) },
      {
        $set: {
          name: name,
          description: description,
          location: location,
          category: category,
          updatedBy: req.user.username,
          updatedOn: new Date(),
        },
        $push: {
          images: {
            $each: images,
          },
        },
      },
      { upsert: true }
    );

    if (result.ops) {
      res.send({ ...res.ops[0], success: true });
    } else {
      res.send({ success: false, message: "could not update" });
    }
  }
);

// used for update
router.post("/deletepic", async function (req, res, next) {
  console.log(req.body);
  const result = await req.db.collection(_collection).updateOne(
    { _id: ObjectID(req.body.identifier) },
    {
      $pull: {
        images: req.body.image,
      },
    }
  );
  res.send({ success: true });
});

// exporting the module
module.exports = router;
