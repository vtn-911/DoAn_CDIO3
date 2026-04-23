const prisma = require("../config/prisma");

const login = async (tenDangNhap, matKhau) => {
  const user = await prisma.nguoidung.findUnique({
    where: { tenDangNhap }
  });

  if (!user || user.matKhau !== matKhau) {
    return null;
  }

  return user;
};

module.exports = { login };