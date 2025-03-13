const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Open" },
  cve: { type: String, required: true },
  severity: { type: String, default: "Low" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bug", BugSchema);
