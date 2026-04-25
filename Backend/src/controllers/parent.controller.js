const parentService = require("../services/parent.service");

const getChildren = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    console.log(`GET /parents/children - userId: ${userId}`);
    const children = await parentService.getChildrenByParentUserId(userId);
    console.log(`Found ${children.length} children`);
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChildAcademic = async (req, res) => {
  try {
    const { studentId } = req.params;
    const academic = await parentService.getChildAcademic(studentId);
    res.json(academic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChildHealth = async (req, res) => {
  try {
    const { studentId } = req.params;
    const health = await parentService.getChildHealth(studentId);
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getChildren,
  getChildAcademic,
  getChildHealth
};
