const mongoose = require("mongoose");
const placeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  location: String,
  longitude: Number,
  latitude: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  region: String,
  images: [String],
  createdOn: Date,
  createdBy: String,
  updatedOn: Date,
  updatedBy: String,
  deleted: Boolean,
  deletedOn: Date,
  deletedBy: String,
});

module.exports = mongoose.model("Place", placeSchema);
