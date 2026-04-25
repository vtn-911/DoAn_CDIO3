const prisma = require("../config/prisma");

const getSchedules = async (role, userId, maLop) => {
  console.log(`Fetching schedules for role: ${role}, userId: ${userId}`);
  if (role === 'BGH' || role === 'PRINCIPAL') {
    const data = await prisma.lichgiangday.findMany({
      include: {
        giaoVien: { select: { hoTen: true } },
        lop: { select: { tenLop: true } }
      }
    });
    console.log(`Found ${data.length} schedules for BGH`);
    return data;
  }

  if (role === 'GIAOVIEN' || role === 'TEACHER') {
    const teacher = await prisma.giaovien.findUnique({
      where: { nguoiDung: userId }
    });
    console.log("Teacher lookup result:", teacher);
    if (!teacher) return [];
    const data = await prisma.lichgiangday.findMany({
      where: { maGV: teacher.maGV },
      include: {
        giaoVien: { select: { hoTen: true } },
        lop: { select: { tenLop: true } }
      }
    });
    console.log(`Found ${data.length} schedules for teacher ${teacher.maGV}`);
    return data;
  }

  if (role === 'PHUHUYNH' || role === 'PARENT') {
    const parent = await prisma.phuhuynh.findUnique({
      where: { nguoiDung: userId },
      include: { hocSinh: { select: { lopId: true } } }
    });
    console.log("Parent lookup result:", parent);
    if (!parent || !parent.hocSinh) return [];
    
    const classIds = maLop ? [maLop] : parent.hocSinh.map(h => h.lopId).filter(id => id !== null);
    console.log(`Searching schedules for classIds: ${JSON.stringify(classIds)}`);
    const data = await prisma.lichgiangday.findMany({
      where: { maLop: { in: classIds } },
      include: {
        giaoVien: { select: { hoTen: true } },
        lop: { select: { tenLop: true } }
      }
    });
    console.log(`Found ${data.length} schedules for parent classes`);
    return data;
  }

  return [];
};

module.exports = {
  getSchedules
};
