const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/db");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring unique emails
  },
  emailVerificationToken: String,
  emailVerificationTokenExpiresAt: Date,
  password: {
    type: String,
    required: true,
  },

  // Personal data fields
  title: String,
  otherName: String,
  phoneNumber: String,
  gender: String,
  dateOfBirth: Date,
  highestQualification: String,
  professional: String,
  maritalStatus: String,
  stateOfOrigin: String,
  lgaOfOrigin: String,
  homeTown: String,
  spouseName: String,
  spousePhoneNumber: String,
  spouseDateOfBirth: Date,
  nextOfKinName: String,
  nextOfKinPhoneNumber: String,
  nextOfKinRelationship: String,
  residentialAddress: String,
  stateOfResidence: String,
  lgaOfResidence: String,
  employmentCategory: String,
  occupation: String,
  employeeId: String,
  userId: String,
});


// Create and export the User model
module.exports = conn.model("User", userSchema);
