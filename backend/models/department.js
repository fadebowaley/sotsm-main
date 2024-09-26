const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const departmentSchema = new Schema({
  placeOfAssignment: { type: String, default: null },
  departmentAddress: { type: String, default: null },
  departmentState: { type: String, default: null },
  departmentLGA: { type: String, default: null },
  departmentCountry: { type: String, default: null },
  employeeId: { type: String, default: null },
  yearEmployed: { type: Date, default: null },
  gradeLevel: { type: Number, default: null },
  stepLevel: { type: Number, default: null },
  jobTitle: { type: String, default: null },

  // Reference to User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// Defining relationship with User model
departmentSchema.virtual("userDetails", {
  ref: "User",
  localField: "employeeId",
  foreignField: "employeeId",
  justOne: true, // One-to-one relationship
});

// Create and export the Department model
module.exports = conn.model("Department", departmentSchema);


