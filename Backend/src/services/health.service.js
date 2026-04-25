const prisma = require("../config/prisma");

const getHealthRecords = async (studentId) => {
  return await prisma.suckhoe.findMany({
    where: { hocSinhId: studentId },
    orderBy: [
      { ngayKiemTra: 'desc' },
      { maSK: 'desc' }
    ]
  });
};

const createHealthRecord = async (data) => {
  try {
    const chieuCao = data.chieuCao ? parseFloat(data.chieuCao) : null;
    const canNang = data.canNang ? parseFloat(data.canNang) : null;

    if (isNaN(chieuCao) || isNaN(canNang)) {
      throw new Error("Chiều cao và cân nặng phải là số hợp lệ");
    }

    const maSK = 'SK' + Date.now() + Math.floor(Math.random() * 1000);
    
    return await prisma.suckhoe.create({
      data: {
        maSK: maSK,
        chieuCao: chieuCao,
        canNang: canNang,
        tinhTrang: data.tinhTrang || '',
        ngayKiemTra: data.ngayKiemTra ? new Date(data.ngayKiemTra) : new Date(),
        hocSinhId: data.hocSinhId
      }
    });
  } catch (error) {
    console.error("Error in createHealthRecord service:", error);
    throw error;
  }
};

const updateHealthRecord = async (id, data) => {
  try {
    const updateData = {};
    if (data.chieuCao !== undefined) updateData.chieuCao = parseFloat(data.chieuCao);
    if (data.canNang !== undefined) updateData.canNang = parseFloat(data.canNang);
    if (data.tinhTrang !== undefined) updateData.tinhTrang = data.tinhTrang;
    if (data.ngayKiemTra !== undefined) updateData.ngayKiemTra = new Date(data.ngayKiemTra);

    return await prisma.suckhoe.update({
      where: { maSK: id },
      data: updateData
    });
  } catch (error) {
    console.error("Error in updateHealthRecord service:", error);
    throw error;
  }
};

const deleteHealthRecord = async (id) => {
  return await prisma.suckhoe.delete({
    where: { maSK: id }
  });
};

module.exports = {
  getHealthRecords,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord
};
