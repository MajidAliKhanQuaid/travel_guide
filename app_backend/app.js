var createError = require("http-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");

var jwtHelper = require("./jwtHelper");

// get config vars
dotenv.config();

const MongoClient = require("mongodb").MongoClient;
const MONGO_DB_NAME = process.env.MONGO_DB;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION;

let db;

MongoClient.connect(
  MONGO_CONNECTION_STRING,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    //   console.log("Connected to Database.");
    db = client.db(MONGO_DB_NAME);
  }
);

var indexRouter = require("./routes/index");
var accountRouter = require("./routes/account");
var favouritesRouter = require("./routes/favourites");

var placesRouter = require("./routes/places");
var mosquesRouter = require("./routes/mosques");
var parksRouter = require("./routes/parks");
var historicalsRouter = require("./routes/historicals");
var culturalsRouter = require("./routes/culturals");
var meuseumsRouter = require("./routes/meuseums");
var gymsRouter = require("./routes/gyms");

var app = express();

// make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(cors());
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(function (req, res, next) {
  res.header("Access-Control-Expose-Headers", "www-authenticate");
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res, next) => {
  var anonymousRoutes = [
    "/login",
    "/verifytoken",
    "/account/register",
    "/uploads",
  ];
  var matchingRoutes = anonymousRoutes.filter((x) => req.path.startsWith(x));
  console.log("-- NEW Http Request ", req.path);
  if (matchingRoutes.length > 0) {
    return next();
  }

  jwtHelper.authenticateAccessToken(req, res, next);
});

app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/places", placesRouter);
app.use("/culturals", culturalsRouter);
app.use("/gyms", gymsRouter);
app.use("/historicals", historicalsRouter);
app.use("/mosques", mosquesRouter);
app.use("/parks", parksRouter);
app.use("/favourites", favouritesRouter);
app.use("/meuseums", meuseumsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
