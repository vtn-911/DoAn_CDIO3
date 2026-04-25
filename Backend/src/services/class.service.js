const prisma = require("../config/prisma");

const getAllClasses = async (role, userId) => {
  // If BGH, return all classes
  if (role === 'BGH' || role === 'PRINCIPAL') {
    return await prisma.lophoc.findMany({
      include: {
        giaoVien: { select: { hoTen: true, maGV: true } },
        _count: { select: { hocSinh: true } }
      },
      orderBy: { tenLop: 'asc' }
    });
  }

  // If Teacher, return assigned or teaching classes
  if (role === 'GIAOVIEN' || role === 'TEACHER') {
    const teacher = await prisma.giaovien.findUnique({
      where: { nguoiDung: userId }
    });
    if (!teacher) return [];

    // Get classes where they are homeroom teacher
    const homeroomClasses = await prisma.lophoc.findMany({
      where: { giaoVienId: teacher.maGV },
      include: {
        giaoVien: { select: { hoTen: true, maGV: true } },
        _count: { select: { hocSinh: true } }
      }
    });

    // Get classes where they have teaching schedules
    const teachingScheduleClasses = await prisma.lichgiangday.findMany({
      where: { maGV: teacher.maGV },
      select: { maLop: true }
    });
    const teachingClassIds = [...new Set(teachingScheduleClasses.map(s => s.maLop))];

    const teachingClasses = await prisma.lophoc.findMany({
      where: { 
        maLop: { in: teachingClassIds },
        NOT: { giaoVienId: teacher.maGV } // Avoid duplicates
      },
      include: {
        giaoVien: { select: { hoTen: true, maGV: true } },
        _count: { select: { hocSinh: true } }
      }
    });

    return [...homeroomClasses, ...teachingClasses];
  }

  return [];
};

const createClass = async (data) => {
  return await prisma.lophoc.create({ data });
};

const updateClass = async (maLop, data) => {
  return await prisma.lophoc.update({
    where: { maLop },
    data
  });
};

const deleteClass = async (maLop) => {
  return await prisma.lophoc.delete({
    where: { maLop }
  });
};

const assignHomeroomTeacher = async (maLop, maGV) => {
  return await prisma.lophoc.update({
    where: { maLop },
    data: { giaoVienId: maGV }
  });
};

const getClassStudents = async (maLop) => {
  return await prisma.hocsinh.findMany({
    where: { lopId: maLop },
    include: { phuHuynh: true },
    orderBy: { hoTen: 'asc' }
  });
};

const addStudentToClass = async (maLop, maHS) => {
  return await prisma.hocsinh.update({
    where: { maHS },
    data: { lopId: maLop }
  });
};

module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  assignHomeroomTeacher,
  getClassStudents,
  addStudentToClass
};
