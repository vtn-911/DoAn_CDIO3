const prisma = require("../config/prisma");

const getAllStudents = async (filters = {}, user = null) => {
  const { search, lopId } = filters;
  const where = {};
  
  if (lopId) {
    where.lopId = lopId;
  }
  
  if (search) {
    where.hoTen = { contains: search };
  }

  // Teacher restriction: if user is TEACHER (or GIAOVIEN), only show students in their assigned or teaching classes
  if (user && (user.vaiTro === 'TEACHER' || user.vaiTro === 'GIAOVIEN')) {
    const teacher = await prisma.giaovien.findUnique({
      where: { nguoiDung: user.idND }
    });
    
    if (teacher) {
      // Get classes where they are homeroom teacher
      const homeroomClasses = await prisma.lophoc.findMany({
        where: { giaoVienId: teacher.maGV },
        select: { maLop: true }
      });
      const homeroomClassIds = homeroomClasses.map(l => l.maLop);

      // Get classes where they have teaching schedules
      const teachingScheduleClasses = await prisma.lichgiangday.findMany({
        where: { maGV: teacher.maGV },
        select: { maLop: true }
      });
      const teachingClassIds = teachingScheduleClasses.map(s => s.maLop);

      const allAssignedClassIds = [...new Set([...homeroomClassIds, ...teachingClassIds])];

      if (allAssignedClassIds.length > 0) {
        if (where.lopId) {
          if (!allAssignedClassIds.includes(where.lopId)) {
            // Requested a class they don't manage/teach
            return [];
          }
        } else {
          where.lopId = { in: allAssignedClassIds };
        }
      } else {
        return []; // Teacher has no assigned/teaching classes
      }
    } else {
      return [];
    }
  }

  return await prisma.hocsinh.findMany({
    where,
    include: {
      lop: { select: { tenLop: true } },
      phuHuynh: { select: { hoTen: true } }
    }
  });
};

const getStudentById = async (id) => {
  const student = await prisma.hocsinh.findUnique({
    where: { maHS: id },
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
      },
      giaoVien: {
        select: {
          hoTen: true,
          maGV: true,
          nguoidung_rel: { select: { soDienThoai: true } }
        }
      },
      diemDanh: { orderBy: { ngay: 'desc' } },
      bangDiem: { orderBy: [{ namHoc: 'desc' }, { kyHoc: 'desc' }] },
      danhGia: { orderBy: [{ namHoc: 'desc' }, { kyHoc: 'desc' }] }
    }
  });
  console.log(`FETCHED STUDENT ${id} DETAILS:`, JSON.stringify(student, null, 2));
  return student;
};

const createStudent = async (data) => {
  const studentData = {
    maHS: data.maHS || 'HS' + Date.now().toString(),
    hoTen: data.hoTen,
    ngaySinh: data.ngaySinh ? new Date(data.ngaySinh) : null,
    gioiTinh: data.gioiTinh || null
  };
  if (data.lopId) studentData.lopId = data.lopId;
  if (data.giaoVienId) studentData.giaoVienId = data.giaoVienId;
  if (data.phuHuynhId) studentData.phuHuynhId = data.phuHuynhId;

  return await prisma.hocsinh.create({ data: studentData });
};

const updateStudent = async (id, data) => {
  const updateData = {};
  if (data.hoTen !== undefined) updateData.hoTen = data.hoTen;
  if (data.ngaySinh !== undefined) updateData.ngaySinh = data.ngaySinh ? new Date(data.ngaySinh) : null;
  if (data.gioiTinh !== undefined) updateData.gioiTinh = data.gioiTinh;
  if (data.lopId !== undefined) updateData.lopId = data.lopId || null;
  if (data.giaoVienId !== undefined) updateData.giaoVienId = data.giaoVienId || null;
  if (data.phuHuynhId !== undefined) updateData.phuHuynhId = data.phuHuynhId || null;

  return await prisma.hocsinh.update({
    where: { maHS: id },
    data: updateData
  });
};

const deleteStudent = async (id) => {
  return await prisma.hocsinh.delete({
    where: { maHS: id }
  });
};

const getTeacherId = async (userId) => {
  const teacher = await prisma.giaovien.findUnique({
    where: { nguoiDung: userId }
  });
  return teacher;
};

const addAttendance = async (studentId, data) => {
  return await prisma.diemdanh.create({
    data: {
      ngay: new Date(data.ngay),
      trangThai: data.trangThai,
      ghiChu: data.ghiChu || null,
      hocSinhId: studentId,
      giaoVienId: (data.giaoVienId && data.giaoVienId !== 'GV_UNKNOWN') ? data.giaoVienId : null
    }
  });
};

const addGrade = async (studentId, data) => {
  return await prisma.bangdiem.create({
    data: {
      monHoc: data.monHoc,
      diemSo: data.diemSo !== null && data.diemSo !== undefined ? parseFloat(data.diemSo) : null,
      nhanXet: data.nhanXet || null,
      kyHoc: data.kyHoc,
      namHoc: data.namHoc,
      hocSinhId: studentId,
      giaoVienId: (data.giaoVienId && data.giaoVienId !== 'GV_UNKNOWN') ? data.giaoVienId : null
    }
  });
};

const addEvaluation = async (studentId, data) => {
  return await prisma.danhgia.create({
    data: {
      kyHoc: data.kyHoc,
      namHoc: data.namHoc,
      nhanXetChung: data.nhanXetChung,
      xepLoai: data.xepLoai || null,
      hocSinhId: studentId,
      giaoVienId: (data.giaoVienId && data.giaoVienId !== 'GV_UNKNOWN') ? data.giaoVienId : null
    }
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeacherId,
  addAttendance,
  addGrade,
  addEvaluation
};
