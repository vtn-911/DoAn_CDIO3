const prisma = require("../config/prisma");

const getAllUsers = async () => {
  return await prisma.nguoidung.findMany();
};

module.exports = { getAllUsers };