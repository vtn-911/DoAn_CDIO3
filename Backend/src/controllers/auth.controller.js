const authService = require("../services/auth.service");

const login = async (req, res) => {
  const { tenDangNhap, matKhau } = req.body;

  const user = await authService.login(tenDangNhap, matKhau);

  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  res.json(user);
};

module.exports = { login };