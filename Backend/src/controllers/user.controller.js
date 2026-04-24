const userService = require("../services/user.service");

const getUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  res.json(data);
};

module.exports = { getUsers };