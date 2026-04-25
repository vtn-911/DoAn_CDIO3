const healthService = require("../services/health.service");

const getHealthRecords = async (req, res) => {
  try {
    const records = await healthService.getHealthRecords(req.params.studentId);
    console.log(`Fetched ${records.length} records for ${req.params.studentId}. First record:`, records[0]);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHealthRecord = async (req, res) => {
  try {
    const record = await healthService.createHealthRecord(req.body);
    res.status(201).json(record);
  } catch (error) {
    console.error("Controller error creating health record:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateHealthRecord = async (req, res) => {
  try {
    const record = await healthService.updateHealthRecord(req.params.id, req.body);
    res.json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteHealthRecord = async (req, res) => {
  try {
    console.log(`Deleting health record with ID: ${req.params.id}`);
    await healthService.deleteHealthRecord(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord
};
