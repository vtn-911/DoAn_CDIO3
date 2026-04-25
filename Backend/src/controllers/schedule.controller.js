const scheduleService = require("../services/schedule.service");

const getSchedules = async (req, res) => {
  try {
    const { role, userId, maLop } = req.query;
    if (!role || !userId) {
      return res.status(400).json({ error: "Missing role or userId" });
    }
    const schedules = await scheduleService.getSchedules(role, userId, maLop);
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSchedules
};
