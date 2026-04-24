const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

router.get('/', async (req, res) => {
  try {
    const classes = await prisma.lophoc.findMany({
      orderBy: { tenLop: 'asc' }
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
