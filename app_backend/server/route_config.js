const express = require("express");
app = express();

var indexRouter = require("./../routes/index.route"),
  categoryRouter = require("./../routes/category.route"),
  accountRouter = require("./../routes/account.route"),
  favouritesRouter = require("./../routes/favourites.route"),
  placesRouter = require("./../routes/places.route"),
  commentsRouter = require("./../routes/comment.route"),
  reviewsRouter = require("./../routes/review.route");

module.exports = function (app) {
  // app.use("/", indexRouter);
  app.use("/category", categoryRouter);
  app.use("/account", accountRouter);
  app.use("/places", placesRouter);
  app.use("/favourites", favouritesRouter);
  app.use("/comments", commentsRouter);
  app.use("/reviews", reviewsRouter);

  app.use("/", async function (req, res, next) {
    // console.log("TEST");
    // res.status(200).json({ name: "10" });
    let name = "Guest";
    if (req.user) name = req.user.name;
    res.render("index", { title: name });
  });
  return app;
};
