const prisma = require("../config/prisma");

const login = async (identifier, matKhau) => {
  const user = await prisma.nguoidung.findFirst({
    where: {
      OR: [
        { tenDangNhap: identifier },
        { email: identifier }
      ]
    }
  });

  if (!user || user.matKhau !== matKhau) {
    return null;
  }

  return user;
};

module.exports = { login };