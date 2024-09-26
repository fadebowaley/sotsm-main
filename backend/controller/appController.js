const Statistics = require("../models/statistics");
const User = require("../models/user");
const VitalStatistics  = require("../models/vitalStatistics");

const appController = {
  getData: async (req, res) => {
    try {
      const successMsg = req.flash("success")[0];
      const errorMsg = req.flash("error")[0];
      const currentUser = req.user;
      //count cummulative Tota
      res.render("apps/projects/budget", {
        currentUser,
        successMsg,
        errorMsg,
        pageName: "App Home Page",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Failed to fetch user data");
      res.redirect("/");
    }
  },
}


module.exports = appController;
