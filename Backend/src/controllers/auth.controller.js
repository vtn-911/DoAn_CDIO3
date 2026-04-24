const authService = require("../services/auth.service");
const userService = require("../services/user.service");

const roleMap = {
  ADMIN: 'ADMIN',
  BGH: 'PRINCIPAL',
  GIAOVIEN: 'TEACHER',
  TAICHINH: 'FINANCE',
  PHUHUYNH: 'PARENT'
};

const login = async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;

  if (!tenDangNhap || !matKhau) {
    return res.status(400).json({ message: "Tên đăng nhập/Email và mật khẩu là bắt buộc" });
  }

  const user = await authService.login(tenDangNhap, matKhau);

  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  const profile = await userService.getProfile(user.idND);

  res.json({
    idND: user.idND,
    tenDangNhap: user.tenDangNhap,
    email: user.email,
    soDienThoai: user.soDienThoai,
    vaiTro: roleMap[user.vaiTro] || user.vaiTro,
    hoTen: profile ? profile.hoTen : null
  });
};

module.exports = { login };