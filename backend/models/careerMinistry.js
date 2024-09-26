 mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const careerMinistrySchema = new Schema({
  // Common fields
  careerType: {
    type: String,
    enum: [
      "Career Officer",
      "Career Officer with Pastoral Responsibility",
      "Full-Time Pastor",
      "Part-Time Pastor",
    ],
    required: true,
  },
  // Career Officer fields
  parishOrPlaceOfAssignment: {
    type: String,
    default: null,
  },
  jobTitle: {
    type: String,
    default: null,
  },
  yearEmployed: {
    type: Date,
    default: null,
  },
  unitName: {
    type: String,
    default: null,
  },
  gradeLevel: {
    type: Number,
    default: null,
  },
  step: {
    type: Number,
    default: null,
  },
  departmentAddress: {
    type: String,
    default: null,
  },
  departmentState: {
    type: String,
    default: null,
  },
  departmentLGA: {
    type: String,
    default: null,
  },
  departmentCountry: {
    type: String,
    default: null,
  },
  // Career Officer with Pastoral Responsibility fields
  pastorInParish: {
    type: Boolean,
    default: false,
  },
  leadershipRole: {
    type: String,
    default: null,
  },
  // Full-Time/Part-Time Pastor fields (church data)
  zoneName: {
    type: String,
    default: null,
  },
  dioceseRegionName: {
    type: String,
    default: null,
  },
  divisionName: {
    type: String,
    default: null,
  },
  churchState: {
    type: String,
    default: null,
  },
  churchLGA: {
    type: String,
    default: null,
  },
  churchAddress: {
    type: String,
    default: null,
  },
  churchCountry: {
    type: String,
    default: null,
  },
  employeeId: {
    type: Number,
    default: null,
  },
  // Relationship with User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create and export the CareerMinistry model
module.exports = conn.model("CareerMinistry", careerMinistrySchema);


