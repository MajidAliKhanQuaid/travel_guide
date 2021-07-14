var express = require("express"),
  createError = require("http-errors"),
  cors = require("cors"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  dotenv = require("dotenv"),
  mongo = require("mongodb"),
  mongoose = require("mongoose"),
  jwtHelper = require("./jwtHelper");

// get config vars
dotenv.config();
let connection;

const MongoClient = mongo.MongoClient;
const MONGO_DB_NAME = process.env.MONGO_DB;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION;

mongoose.connect(process.env.MONGOOSE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

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

var app = express();

// make our db accessible to our router
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(cors());
app.options("*", cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(function (req, res, next) {
  res.header("Access-Control-Expose-Headers", "www-authenticate");
  next();
});
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res, next) => {
  var anonymousRoutes = [
    "/account/login",
    "/account/register",
    "/account/verifytoken",
    "/account/auth/facebook",
    "/uploads",
  ];

  console.log("req.path ", req.path);
  var matchingRoutes = anonymousRoutes.filter((x) => req.path.startsWith(x));
  if (
    matchingRoutes.length > 0 ||
    req.path == "/" ||
    req.path == "/alam" ||
    req.path == "/favicon.ico" ||
    req.path == "/stylesheets/style.css"
  ) {
    return next();
  }

  jwtHelper.authenticateAccessToken(req, res, next);
});

const routes = require("./server/route_config");
app = routes(app);

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
