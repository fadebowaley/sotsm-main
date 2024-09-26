const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const spiritualProfileSchema = new Schema({
  yearBornAgain: { type: Number, required: true },
  yearWaterBaptized: { type: Number, required: true },
  holyGhostBaptism: { type: Number, required: true },
  yearJoinedSOTSM: { type: Number, required: true },
  yearBecameWorker: { type: Number, required: true },
  yearBecameMinister: { type: Number, required: true },
  yearDeaconDns: { type: Number, required: true },
  yearOrdainedPastor: { type: Number, required: true },
  yearSeniorPastor: { type: Number, required: true },
  yearOrdainedElder: { type: Number, required: true },
  yearBishop: { type: Number, required: true },
  lastOrdinationDate: { type: Date, required: true },
  yearGraduatedIBCOMS: { type: Number, required: true },
  yearGraduatedWOOCOME: { type: Number, required: true },
  yearGraduatedILS: { type: Number, required: true },
  yearGraduatedNGBTI: { type: Number, required: true },
  employeeId: { type: String, required: true },

  // Reference to User model
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches your User model name
    required: true,
  },
});

// Create and export the SpiritualProfile model
module.exports = conn.model("SpiritualProfile", spiritualProfileSchema);
