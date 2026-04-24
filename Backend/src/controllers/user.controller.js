const userService = require("../services/user.service.js");

const getUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const profile = await userService.getProfile(req.params.id);
    if (!profile) return res.status(404).json({ message: "User not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await userService.updateProfile(req.params.id, req.body);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getProfile, updateProfile };