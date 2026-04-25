const express = require("express");
const router = express.Router();
const healthController = require("../controllers/health.controller");

router.get("/:studentId", healthController.getHealthRecords);
router.post("/", healthController.createHealthRecord);
router.put("/:id", healthController.updateHealthRecord);
router.delete("/:id", healthController.deleteHealthRecord);

module.exports = router;
