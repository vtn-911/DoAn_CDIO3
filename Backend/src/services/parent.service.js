const prisma = require("../config/prisma");

const getChildrenByParentUserId = async (userId) => {
  const phuHuynh = await prisma.phuhuynh.findUnique({
    where: { nguoiDung: userId },
    include: {
      hocSinh: {
        include: {
          lop: {
            include: {
              giaoVien: {
                select: { 
                  hoTen: true, 
                  maGV: true,
                  nguoidung_rel: { select: { soDienThoai: true } }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!phuHuynh) return [];
  return phuHuynh.hocSinh;
};

const getChildAcademic = async (studentId) => {
  const bangDiem = await prisma.bangdiem.findMany({
    where: { hocSinhId: studentId },
    orderBy: { monHoc: 'asc' }
  });

  const diemdanh = await prisma.diemdanh.findMany({
    where: { hocSinhId: studentId },
    orderBy: { ngay: 'desc' },
    take: 30 // Lấy 30 ngày gần nhất
  });

  const danhgia = await prisma.danhgia.findMany({
    where: { hocSinhId: studentId },
    orderBy: { namHoc: 'desc' }
  });

  return { bangDiem, diemdanh, danhgia };
};

const getChildHealth = async (studentId) => {
  return await prisma.suckhoe.findMany({
    where: { hocSinhId: studentId },
    orderBy: [
      { ngayKiemTra: 'desc' },
      { maSK: 'desc' }
    ]
  });
};

module.exports = {
  getChildrenByParentUserId,
  getChildAcademic,
  getChildHealth
};
