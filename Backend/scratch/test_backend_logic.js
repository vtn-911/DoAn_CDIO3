const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const userId = 'u_ph2';
  const phuHuynh = await prisma.phuhuynh.findUnique({
    where: { nguoiDung: userId },
    include: {
      hocSinh: {
        include: {
          lop: {
            include: {
              giaoVien: {
                select: { hoTen: true, soDienThoai: true, maGV: true }
              }
            }
          }
        }
      }
    }
  });

  console.log("Parent found:", phuHuynh ? "Yes" : "No");
  if (phuHuynh) {
    console.log("Children count:", phuHuynh.hocSinh.length);
    phuHuynh.hocSinh.forEach(h => console.log(`- ${h.hoTen} (Lớp: ${h.lop?.tenLop})`));
  }
}

test().then(() => prisma.$disconnect());
