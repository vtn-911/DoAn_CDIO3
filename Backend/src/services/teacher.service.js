const prisma = require("../config/prisma");

const getAllTeachers = async (filters = {}) => {
  const { search } = filters;
  const where = {};

  if (search) {
    where.hoTen = { contains: search };
  }

  return await prisma.giaovien.findMany({
    where,
    include: {
      lopHoc: { select: { maLop: true, tenLop: true } },
      nguoidung_rel: { select: { tenDangNhap: true, email: true, soDienThoai: true } }
    }
  });
};

const getTeacherById = async (id) => {
  return await prisma.giaovien.findUnique({
    where: { maGV: id },
    include: {
      lopHoc: true,
      nguoidung_rel: true,
      lichGiangDay: {
        include: { lop: { select: { tenLop: true } } },
        orderBy: [{ thu: 'asc' }, { caHoc: 'asc' }]
      }
    }
  });
};

const createTeacher = async (data) => {
  // 1. Create NguoiDung first
  const newUser = await prisma.nguoidung.create({
    data: {
      idND: 'ND' + Date.now().toString(),
      tenDangNhap: data.tenDangNhap,
      matKhau: data.matKhau || '123456', // Default password
      email: data.email,
      soDienThoai: data.soDienThoai,
      vaiTro: 'GIAOVIEN'
    }
  });

  // 2. Create GiaoVien linked to NguoiDung
  return await prisma.giaovien.create({
    data: {
      maGV: data.maGV || 'GV' + Date.now().toString(),
      hoTen: data.hoTen,
      ngaySinh: data.ngaySinh ? new Date(data.ngaySinh) : null,
      gioiTinh: data.gioiTinh,
      diaChi: data.diaChi,
      chuyenMon: data.chuyenMon,
      nguoiDung: newUser.idND
    }
  });
};

const updateTeacher = async (id, data) => {
  const updateData = {};
  if (data.hoTen !== undefined) updateData.hoTen = data.hoTen;
  if (data.ngaySinh !== undefined) updateData.ngaySinh = data.ngaySinh ? new Date(data.ngaySinh) : null;
  if (data.gioiTinh !== undefined) updateData.gioiTinh = data.gioiTinh;
  if (data.diaChi !== undefined) updateData.diaChi = data.diaChi;
  if (data.chuyenMon !== undefined) updateData.chuyenMon = data.chuyenMon;

  // Also update NguoiDung if info provided
  if (data.email !== undefined || data.soDienThoai !== undefined) {
    const teacher = await prisma.giaovien.findUnique({ where: { maGV: id } });
    if (teacher) {
      await prisma.nguoidung.update({
        where: { idND: teacher.nguoiDung },
        data: {
          email: data.email,
          soDienThoai: data.soDienThoai
        }
      });
    }
  }

  return await prisma.giaovien.update({
    where: { maGV: id },
    data: updateData
  });
};

const deleteTeacher = async (id) => {
  const teacher = await prisma.giaovien.findUnique({ where: { maGV: id } });
  if (!teacher) throw new Error("Teacher not found");

  return await prisma.$transaction(async (tx) => {
    // 1. Cleanup references
    await tx.lophoc.updateMany({
      where: { giaoVienId: id },
      data: { giaoVienId: null }
    });
    await tx.hocsinh.updateMany({
      where: { giaoVienId: id },
      data: { giaoVienId: null }
    });

    // 2. Delete dependencies
    await tx.lichgiangday.deleteMany({ where: { maGV: id } });
    await tx.diemdanh.deleteMany({ where: { giaoVienId: id } });
    await tx.bangdiem.deleteMany({ where: { giaoVienId: id } });
    await tx.danhgia.deleteMany({ where: { giaoVienId: id } });

    // 3. Delete profile and user
    await tx.giaovien.delete({ where: { maGV: id } });
    return await tx.nguoidung.delete({ where: { idND: teacher.nguoiDung } });
  });
};

const assignClass = async (maGV, maLop) => {
  return await prisma.lophoc.update({
    where: { maLop: maLop },
    data: { giaoVienId: maGV }
  });
};

const updateSchedule = async (maGV, scheduleItems) => {
  // Simple approach: delete old and insert new
  await prisma.lichgiangday.deleteMany({ where: { maGV: maGV } });
  
  if (scheduleItems && scheduleItems.length > 0) {
    const items = scheduleItems.map(item => ({
      thu: parseInt(item.thu),
      caHoc: item.caHoc,
      monHoc: item.monHoc,
      maLop: item.maLop,
      maGV: maGV,
      ngayHieuLuc: item.ngayHieuLuc ? new Date(item.ngayHieuLuc) : null
    }));
    
    return await prisma.lichgiangday.createMany({ data: items });
  }
  return { message: "Schedule cleared" };
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignClass,
  updateSchedule
};
