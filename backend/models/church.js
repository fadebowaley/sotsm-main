const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const churchSchema = new Schema({
  parishOrPlaceOfAssignment: { type: String, default: null },
  zoneName: { type: String, default: null },
  dioceseRegionName: { type: String, default: null },
  divisionName: { type: String, default: null },
  churchState: { type: String, default: null },
  churchLGA: { type: String, default: null },
  churchAddress: { type: String, default: null },
  churchCountry: { type: String, default: null },

  // Additional info
  dateOfEstablishment: { type: Date, default: null },
  propertyStatus: { type: String, default: null },
  estimatedValue: { type: mongoose.Types.Decimal128, default: null },
  building: { type: String, default: null },
  paymentFrequency: { type: String, default: null },
  status: { type: String, default: null },

  // Alias, assistant, and office details
  alias: { type: String, default: null },
  assistantId: { type: String, default: null },
  pastorOffice: { type: String, default: null },

  // Parish, zone, diocese, and national codes
  parishCode: { type: String, default: null },
  zonalCode: { type: String, default: null },
  dioceseCode: { type: String, default: null },
  divisionCode: { type: String, default: null },
  nationalCode: { type: String, default: null },

  // Employee and HQ Status
  employeeId: { type: String, default: null },
  hqStatus: {
    type: String,
    enum: ["parish", "zone", "diocese", "region", "division", "national"],
    default: null,
  },

  // Faith Codes and Folds
  faithCode0: { type: String, default: null },
  faithCode1: { type: String, default: null },
  faithCode2: { type: String, default: null },
  faithCode3: { type: String, default: null },
  faithCode4: { type: String, default: null },
  faithCode5: { type: String, default: null },
  faithCode6: { type: String, default: null },
  faithCode7: { type: String, default: null },
  faithCode8: { type: String, default: null },
  faithCode9: { type: String, default: null },

  faithFold0: { type: String, default: null },
  faithFold1: { type: String, default: null },
  faithFold2: { type: String, default: null },
  faithFold3: { type: String, default: null },
  faithFold4: { type: String, default: null },
  faithFold5: { type: String, default: null },
  faithFold6: { type: String, default: null },
  faithFold7: { type: String, default: null },
  faithFold8: { type: String, default: null },
  faithFold9: { type: String, default: null },

  // Relationship with User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// Defining relationships to MonthlyReport, VitalStatistics, and Statistics
churchSchema.virtual("monthlyReports", {
  ref: "MonthlyReport",
  localField: "parishCode",
  foreignField: "parishCode",
});

churchSchema.virtual("vitalStatistics", {
  ref: "VitalStatistics",
  localField: "parishCode",
  foreignField: "parishCode",
});

churchSchema.virtual("statistics", {
  ref: "Statistics",
  localField: "parishCode",
  foreignField: "parishCode",
});

// Create and export the Church model
module.exports = conn.model("Church", churchSchema);

