const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  username: String,
  createdOn: Date,
  createdBy: String,
  updatedOn: Date,
  updatedBy: String,
  deleted: Boolean,
  deletedOn: Date,
  deletedBy: String,
});

module.exports = mongoose.model("Favourite", categorySchema);
