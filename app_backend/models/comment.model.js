const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  text: String,
  edited: Boolean,
  createdOn: Date,
  createdBy: String,
  updatedOn: Date,
  updatedBy: String,
  deleted: Boolean,
  deletedOn: Date,
  deletedBy: String,
});

module.exports = mongoose.model("Comment", commentSchema);
