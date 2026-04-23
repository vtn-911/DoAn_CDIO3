const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {

    await tx.nguoidung.create({
      data: {
        idND: "u_admin",
        tenDangNhap: "admin",
        matKhau: "123456",
        email: "uadmin@gmail.com",
        soDienThoai: "091111111",
        vaiTro: "ADMIN",
        admin: {
          create: {
            maAdmin: "ad1",
            hoTen: "Admin Tong"
          }
        }
      }
    });

    await tx.nguoidung.create({
      data: {
        idND: "u_bgh",
        tenDangNhap: "bgh1",
        matKhau: "123456",
        email: "bgh@gmail.com",
        soDienThoai: "091222222",
        vaiTro: "BGH",
        bangiamhieu: {
          create: {
            maBGH: "bgh1",
            hoTen: "Nguyen Van BGH",
            chucVu: "Hieu truong"
          }
        }
      }
    });

    await tx.nguoidung.create({
      data: {
        idND: "u_gv",
        tenDangNhap: "giaovien1",
        matKhau: "123456",
        email: "gv@gmail.com",
        soDienThoai: "091111133",
        vaiTro: "GIAOVIEN",
        giaovien: {
          create: {
            maGV: "gv1",
            hoTen: "Tran Thi GV"
          }
        }
      }
    });

    await tx.nguoidung.create({
      data: {
        idND: "u_ph",
        tenDangNhap: "phuhuynh1",
        matKhau: "123456",
        email: "ph@gmail.com",
        soDienThoai: "091111144",
        vaiTro: "PHUHUYNH",
        phuhuynh: {
          create: {
            maPH: "ph1",
            hoTen: "Le Van PH"
          }
        }
      }
    });

    await tx.nguoidung.create({
      data: {
        idND: "u_tc",
        tenDangNhap: "taichinh1",
        matKhau: "123456",
        email: "tc@gmail.com",
        soDienThoai: "091111155",
        vaiTro: "TAICHINH",
        taichinh: {
          create: {
            maTC: "tc1",
            hoTen: "Pham Van TC"
          }
        }
      }
    });

    await tx.thongbao.create({
      data: {
        maTB: "tb1",
        tieuDe: "Thong bao chung",
        noiDung: "Ngay mai nghi hoc",
        nguoiGuiId: "u_admin"
      }
    });

  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });