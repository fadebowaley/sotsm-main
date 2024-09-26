const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const faithTableSchema = new Schema({
  levelRank: { type: Number, required: true },
  labelRank: { type: String, required: true },
  code: { type: String, required: true },
  count: { type: Number, default: null },
  lastCode: { type: String, default: null },
  fkStr: { type: String, default: null },

  // Reference to Household model
  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Household",
    unique: true,
    default: null,
  },
});

// Create and export the FaithTable model
module.exports = conn.model("FaithTable", faithTableSchema);

