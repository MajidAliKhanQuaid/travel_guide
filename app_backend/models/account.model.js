const mongoose = require("mongoose");
const accountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  username: String,
  domain: String,
  roles: [String],
  createdOn: Date,
  createdBy: String,
  updatedOn: Date,
  updatedBy: String,
  deleted: Boolean,
  deletedOn: Date,
  deletedBy: String,
});

module.exports = mongoose.model("Account", accountSchema);
