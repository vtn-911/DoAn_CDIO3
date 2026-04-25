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

  // Teacher restriction: if user is TEACHER, only show students in their assigned class
  if (user && user.vaiTro === 'TEACHER') {
    // We need to fetch the classes this teacher manages
    const teacher = await prisma.giaovien.findUnique({
      where: { nguoiDung: user.idND },
      include: { lopHoc: true }
    });
    
    if (teacher && teacher.lopHoc.length > 0) {
      const classIds = teacher.lopHoc.map(l => l.maLop);
      if (where.lopId && !classIds.includes(where.lopId)) {
        // Requested a class they don't manage
        return [];
      }
      where.lopId = { in: classIds };
    } else {
      return []; // Teacher manages no classes
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
