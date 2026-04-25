const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.nguoidung.findMany({
    where: { vaiTro: 'PHUHUYNH' },
    include: { phuhuynh: { include: { hocSinh: true } } }
  });
  
  users.forEach(u => {
    console.log(`User: ${u.tenDangNhap} (idND: ${u.idND})`);
    if (u.phuhuynh) {
      console.log(`  PH Profile: ${u.phuhuynh.maPH}`);
      console.log(`  Children: ${u.phuhuynh.hocSinh.length}`);
      u.phuhuynh.hocSinh.forEach(h => console.log(`    - ${h.hoTen} (${h.maHS})`));
    } else {
      console.log(`  PH Profile: MISSING`);
    }
  });
}

check().then(() => prisma.$disconnect());
