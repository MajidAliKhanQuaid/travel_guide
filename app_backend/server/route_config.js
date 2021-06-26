const express = require("express");
app = express();

var indexRouter = require("./../routes/index"),
  categoryRouter = require("./../routes/category"),
  accountRouter = require("./../routes/account"),
  favouritesRouter = require("./../routes/favourites"),
  placesRouter = require("./../routes/places"),
  mosquesRouter = require("./../routes/mosques"),
  parksRouter = require("./../routes/parks"),
  historicalsRouter = require("./../routes/historicals"),
  culturalsRouter = require("./../routes/culturals"),
  meuseumsRouter = require("./../routes/meuseums"),
  gymsRouter = require("./../routes/gyms");

module.exports = function (app) {
  app.use("/", indexRouter);
  app.use("/category", categoryRouter);
  app.use("/account", accountRouter);
  app.use("/places", placesRouter);
  app.use("/culturals", culturalsRouter);
  app.use("/gyms", gymsRouter);
  app.use("/historicals", historicalsRouter);
  app.use("/mosques", mosquesRouter);
  app.use("/parks", parksRouter);
  app.use("/favourites", favouritesRouter);
  app.use("/meuseums", meuseumsRouter);

  return app;
};
