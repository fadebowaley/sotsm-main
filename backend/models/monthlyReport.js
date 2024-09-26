const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const monthlyReportSchema = new Schema({
  week: { type: String, required: true },
  day: {
    type: String,
    enum: [
      "Sunday Service",
      "Tuesday/Wednesday",
      "Thursday Service",
      "Sunday Outreach Service",
      "Sunday School",
      "House Fellowship",
      "Youth Mid Week Service",
    ],
    required: true,
  },
  Men: { type: Number, default: 0 },
  Women: { type: Number, default: 0 },
  Children: { type: Number, default: 0 },
  Total: { type: Number, default: 0 },

  // Reference to Church model
  parishCode: {
    type: String,
    required: true,
  },
});

// Create and export the MonthlyReport model
module.exports = conn.model("MonthlyReport", monthlyReportSchema);
