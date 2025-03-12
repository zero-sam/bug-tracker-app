const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Open" }, // New status field
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;
