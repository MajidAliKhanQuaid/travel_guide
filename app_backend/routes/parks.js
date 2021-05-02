var express = require("express");
const cors = require("cors");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");
const { response } = require("express");
var mongoHelper = require("./../mongoHelper");
const { ObjectID } = require("bson");
var path = require("path");

const colName = "parks";

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
router.get("/", function (req, res, next) {
  req.db
    .collection(colName)
    .find()
    .toArray()
    .then((x) => res.send(x));
});

// loads one place, based on query parameter `id`
router.get("/get", function (req, res, next) {
  console.log(req.query);
  if (req.query && req.query.id) {
    req.db
      .collection(colName)
      .findOne({ _id: ObjectID(req.query.id) })
      .then((x) => {
        if (x) {
          res.send(x);
        } else {
          res.send({ status: "not found" });
        }
      });
  } else {
    res.send({ status: "wow" });
  }
});

// saves a places and save attachments as well
router.post("/save", upload.array("imagesField"), function (req, res, next) {
  const formData = req.body;
  let images = [];
  for (var fileIndex in req.files) {
    console.log(req.files[fileIndex].filename);
    images.push(req.files[fileIndex].filename);
  }
  req.db.collection(colName).insertOne({
    name: formData.txtName,
    description: formData.txtDescription,
    location: formData.txtLocation,
    images: images,
  });
  res.sendStatus(200);
});

// deletes one place, based on query parameter `id`
router.post("/delete", function (req, res, next) {
  console.log(req.query);
  if (req.query && req.query.id) {
    req.db
      .collection(colName)
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

// used for search filter
router.post("/search", function (req, res, next) {
  console.log("serch park place", req.body.query);
  req.db
    .collection(colName)
    .find({ name: { $regex: `${req.body.query}`, $options: "i" } })
    .toArray()
    .then((parks) => res.send(parks))
    .catch((err) => res.send([]));
  //res.send([{name: "place one",}, {name: "place two"}, {name: req.body.query}]);
});

// used for update
router.post("/update", function (req, res, next) {
  console.error(req.body);
  req.db
    .collection(colName)
    .updateOne(
      { _id: ObjectID(req.body._id) },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          location: req.body.location,
        },
      },
      { upsert: true }
    )
    .then((result) => res.send(result.ops))
    .catch((err) => console.error("Something went wrong ", err));
});

// exporting the module
module.exports = router;
