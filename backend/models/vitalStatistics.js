const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const vitalStatisticsSchema = new Schema({
  numberOfAdult: {
    type: Number,
    required: true,
  },
  numberOfYouth: {
    type: Number,
    required: true,
  },
  numberOfChildren: {
    type: Number,
    required: true,
  },
  totalMembers: {
    type: Number,
    required: true,
  },
  numberOfWorkers: {
    type: Number,
    required: true,
  },
  totalWorkers: {
    type: Number,
    required: true,
  },
  workersInTraining: {
    type: Number,
    required: true,
  },
  totalUnordainedLeaders: {
    type: Number,
    required: true,
  },
  numberOfMinisters: {
    type: Number,
    required: true,
  },
  numberOfDeaconsDeaconesses: {
    type: Number,
    required: true,
  },
  numberOfPastors: {
    type: Number,
    required: true,
  },
  numberOfSeniorPastors: {
    type: Number,
    required: true,
  },
  numberOfElders: {
    type: Number,
    required: true,
  },
  numberOfBishops: {
    type: Number,
    required: true,
  },

  // Reference to Church model
  parishCode: {
    type: String,
    required: true,
  },
});

// Create and export the VitalStatistics model
module.exports = conn.model("VitalStatistics", vitalStatisticsSchema);
