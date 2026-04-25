const prisma = require("../config/prisma");

const getAllUsers = async (filters = {}) => {
  const { search, role } = filters;
  const where = {};

  if (role && role !== 'All Roles') {
    where.vaiTro = role;
  }

  if (search) {
    where.OR = [
      { tenDangNhap: { contains: search } },
      { email: { contains: search } }
    ];
  }

  return await prisma.nguoidung.findMany({ where });
};

const createUser = async (data) => {
  if (!data.idND) {
    data.idND = Date.now().toString();
  }
  return await prisma.nguoidung.create({ data });
};

const updateUser = async (id, data) => {
  return await prisma.nguoidung.update({
    where: { idND: id },
    data
  });
};

const deleteUser = async (id) => {
  const user = await prisma.nguoidung.findUnique({
    where: { idND: id },
    include: {
      admin: true,
      bangiamhieu: true,
      giaovien: true,
      taichinh: true,
      phuhuynh: true,
    }
  });

  if (!user) throw new Error("User not found");

  return await prisma.$transaction(async (tx) => {
    // 1. Cleanup specific role dependencies
    if (user.giaovien) {
      const maGV = user.giaovien.maGV;
      await tx.lophoc.updateMany({
        where: { giaoVienId: maGV },
        data: { giaoVienId: null }
      });
      await tx.hocsinh.updateMany({
        where: { giaoVienId: maGV },
        data: { giaoVienId: null }
      });
      await tx.lichgiangday.deleteMany({ where: { maGV: maGV } });
      await tx.diemdanh.deleteMany({ where: { giaoVienId: maGV } });
      await tx.bangdiem.deleteMany({ where: { giaoVienId: maGV } });
      await tx.danhgia.deleteMany({ where: { giaoVienId: maGV } });
      await tx.giaovien.delete({ where: { maGV: maGV } });
    }

    if (user.phuhuynh) {
      const maPH = user.phuhuynh.maPH;
      await tx.hocsinh.updateMany({
        where: { phuHuynhId: maPH },
        data: { phuHuynhId: null }
      });
      await tx.phuhuynh.delete({ where: { maPH: maPH } });
    }

    if (user.bangiamhieu) {
      const maBGH = user.bangiamhieu.maBGH;
      await tx.lophoc.updateMany({
        where: { bghId: maBGH },
        data: { bghId: null }
      });
      await tx.bangiamhieu.delete({ where: { maBGH: maBGH } });
    }

    if (user.admin) {
      await tx.admin.delete({ where: { maAdmin: user.admin.maAdmin } });
    }

    if (user.taichinh) {
      const maTC = user.taichinh.maTC;
      await tx.thuchi.deleteMany({ where: { taiChinhId: maTC } });
      await tx.taichinh.delete({ where: { maTC: maTC } });
    }

    // 2. Cleanup shared dependencies
    await tx.thongbao.deleteMany({ where: { nguoiGuiId: id } });

    // 3. Delete the user itself
    return await tx.nguoidung.delete({
      where: { idND: id }
    });
  });
};

const getProfile = async (idND) => {
  const user = await prisma.nguoidung.findUnique({
    where: { idND },
    include: {
      admin: true,
      bangiamhieu: true,
      giaovien: true,
      taichinh: true,
      phuhuynh: true,
    }
  });

  if (!user) return null;

  let hoTen = '';
  let chucVu = '';
  switch (user.vaiTro) {
    case 'ADMIN': hoTen = user.admin?.hoTen || ''; break;
    case 'BGH': 
      hoTen = user.bangiamhieu?.hoTen || ''; 
      chucVu = user.bangiamhieu?.chucVu || '';
      break;
    case 'GIAOVIEN': hoTen = user.giaovien?.hoTen || ''; break;
    case 'TAICHINH': hoTen = user.taichinh?.hoTen || ''; break;
    case 'PHUHUYNH': hoTen = user.phuhuynh?.hoTen || ''; break;
  }

  delete user.admin;
  delete user.bangiamhieu;
  delete user.giaovien;
  delete user.taichinh;
  delete user.phuhuynh;
  delete user.matKhau;

  return { ...user, hoTen, chucVu };
};

const updateProfile = async (idND, data) => {
  const { hoTen, email, chucVu, soDienThoai, matKhau } = data;

  const updateData = {};
  if (email !== undefined) updateData.email = email;
  if (soDienThoai !== undefined) updateData.soDienThoai = soDienThoai;
  if (matKhau) updateData.matKhau = matKhau;

  const user = await prisma.nguoidung.update({
    where: { idND },
    data: updateData
  });

  if (hoTen !== undefined) {
    switch (user.vaiTro) {
      case 'ADMIN':
        await prisma.admin.upsert({
          where: { nguoiDung: idND },
          create: { maAdmin: 'AD' + Date.now(), hoTen, nguoiDung: idND },
          update: { hoTen }
        });
        break;
      case 'BGH':
        await prisma.bangiamhieu.upsert({
          where: { nguoiDung: idND },
          create: { maBGH: 'BGH' + Date.now(), hoTen, chucVu, nguoiDung: idND },
          update: { hoTen, chucVu }
        });
        break;
      case 'GIAOVIEN':
        await prisma.giaovien.upsert({
          where: { nguoiDung: idND },
          create: { maGV: 'GV' + Date.now(), hoTen, nguoiDung: idND },
          update: { hoTen }
        });
        break;
      case 'TAICHINH':
        await prisma.taichinh.upsert({
          where: { nguoiDung: idND },
          create: { maTC: 'TC' + Date.now(), hoTen, nguoiDung: idND },
          update: { hoTen }
        });
        break;
      case 'PHUHUYNH':
        await prisma.phuhuynh.upsert({
          where: { nguoiDung: idND },
          create: { maPH: 'PH' + Date.now(), hoTen, nguoiDung: idND },
          update: { hoTen }
        });
        break;
    }
  }

  return { ...user, hoTen };
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getProfile, updateProfile };