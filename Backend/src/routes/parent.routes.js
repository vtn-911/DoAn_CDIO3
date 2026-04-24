const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

// Search parents by name with phone number
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.hoTen = { contains: q };
    }

    const parents = await prisma.phuhuynh.findMany({
      where,
      take: 10,
      include: {
        nguoidung_rel: {
          select: { soDienThoai: true, email: true }
        }
      }
    });

    const result = parents.map(p => ({
      maPH: p.maPH,
      hoTen: p.hoTen,
      soDienThoai: p.nguoidung_rel?.soDienThoai || '',
      email: p.nguoidung_rel?.email || ''
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
