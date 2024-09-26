const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const householdSchema = new Schema({
  // Mongoose automatically creates an _id field
  levelRank: { type: Number, required: true },
  labelName: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, default: null },
  statusCode: { type: String, default: null },
  codeFormat: { type: String, default: null },
  idFke: { type: String, default: null },

  // Reference to User model
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// Create and export the Household model
module.exports = conn.model("Household", householdSchema);



