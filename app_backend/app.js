var express = require("express"),
  createError = require("http-errors"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
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

mongoose.connect(process.env.MONGOOSE_CONNECTION);

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
    "/account/auth/facebook",
    "/uploads",
  ];
  var matchingRoutes = anonymousRoutes.filter((x) => req.path.startsWith(x));
  // console.log("-- NEW Http Request ", req.path);
  if (matchingRoutes.length > 0) {
    // console.log("-- MATCHED ", req.path);
    return next();
  }

  jwtHelper.authenticateAccessToken(req, res, next);
});

const routes = require("./server/route_config");
app = routes(app);

// var indexRouter = require("./routes/index");
// var categoryRouter = require("./routes/category");
// var accountRouter = require("./routes/account");
// var favouritesRouter = require("./routes/favourites");

// var placesRouter = require("./routes/places");
// var mosquesRouter = require("./routes/mosques");
// var parksRouter = require("./routes/parks");
// var historicalsRouter = require("./routes/historicals");
// var culturalsRouter = require("./routes/culturals");
// var meuseumsRouter = require("./routes/meuseums");
// var gymsRouter = require("./routes/gyms");

// app.use("/", indexRouter);
// app.use("/category", categoryRouter);
// app.use("/account", accountRouter);
// app.use("/places", placesRouter);
// app.use("/culturals", culturalsRouter);
// app.use("/gyms", gymsRouter);
// app.use("/historicals", historicalsRouter);
// app.use("/mosques", mosquesRouter);
// app.use("/parks", parksRouter);
// app.use("/favourites", favouritesRouter);
// app.use("/meuseums", meuseumsRouter);

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
