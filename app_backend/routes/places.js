var express = require("express");
const cors = require("cors");
var router = express.Router();
var jwtHelper = require("./../jwtHelper");
const { response } = require("express");
var mongoHelper = require("./../mongoHelper");
const { ObjectID } = require("bson");
var path = require("path");

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
  const col = "places";

  req.db
    .collection("places")
    .find()
    .toArray()
    .then((x) => res.send(x));
});

// loads one place, based on query parameter `id`
router.get("/get", function (req, res, next) {
  const col = "places";
  console.log(req.query);
  if (req.query && req.query.id) {
    req.db
      .collection("places")
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
  console.log(req.body);
  
  const col = "places";
  const formData = req.body;
  let images = [];
  for (var fileIndex in req.files) {
    console.log(req.files[fileIndex].filename);
    images.push(req.files[fileIndex].filename);
  }
  req.db.collection(col).insertOne({
    name: formData.txtName,
    description: formData.txtDescription,
    location: formData.txtLocation,
    images: images,
  });
  res.sendStatus(200);
});

// deletes one place, based on query parameter `id`
router.post("/delete", function (req, res, next) {
  const col = "places";
  console.log(req.query);
  if (req.query && req.query.id) {
    req.db
      .collection("places")
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
  console.log("serch place", req.body.query);
  req.db.collection("places").find({name:{'$regex' : `${req.body.query}`, '$options' : 'i'}})
  .toArray()
  .then((places) =>  res.send(places))
  .catch((err) => res.send([]))
  //res.send([{name: "place one",}, {name: "place two"}, {name: req.body.query}]);
});


// exporting the module
module.exports = router;