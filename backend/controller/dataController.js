
  const User =  require("../models/user");
  const CareerMinistry =  require("../models/careerMinistry");
  const Church = require("../models/church");
  const Department = require("../models/department");
  const FaithTable = require("../models/faithTable");
  const Household = require("../models/houseHold");
  const MonthlyReport = require("../models/monthlyReport");
  const SpiritualProfile = require("../models/spiritualProfile");
  const Statistics = require("../models/statistics");
  const UserData = require("../models/user");
  const VitalStatistics = require("../models/vitalStatistics");





const complexDataController = {
  getAllData: async (req, res) => {
    try {
      const data = await User.findAll({
        // Ensure only users with associated data in all tables are fetched
        where: { "$Church.id$": { [Sequelize.Op.ne]: null } },
        include: [
          { model: CareerMinistry },
          { model: SpiritualProfile },
          { model: UserData },
          {
            model: Household,
            include: [{ model: FaithTable }],
          },
          {
            model: Church,
            include: [
              { model: MonthlyReport },
              { model: VitalStatistics },
              { model: Statistics },
            ],
          },
          { model: Department },
        ],
      });

      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching comprehensive user data:", error);
      res.status(500).send("Server Error");
    }
  },
};





module.exports = complexDataController;

