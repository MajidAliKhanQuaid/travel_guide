const express = require("express");
app = express();

var indexRouter = require("./../routes/index"),
  categoryRouter = require("./../routes/category"),
  accountRouter = require("./../routes/account"),
  favouritesRouter = require("./../routes/favourites"),
  placesRouter = require("./../routes/places");

module.exports = function (app) {
  app.use("/", indexRouter);
  app.use("/category", categoryRouter);
  app.use("/account", accountRouter);
  app.use("/places", placesRouter);
  app.use("/favourites", favouritesRouter);

  return app;
};
