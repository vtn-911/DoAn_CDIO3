const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning up data...');
  // Clear dependent tables first
  await prisma.lichgiangday.deleteMany({});
  await prisma.diemdanh.deleteMany({});
  await prisma.bangdiem.deleteMany({});
  await prisma.danhgia.deleteMany({});
  await prisma.suckhoe.deleteMany({});
  await prisma.hocsinh.deleteMany({});
  await prisma.phuhuynh.deleteMany({});
  await prisma.lophoc.deleteMany({});
  await prisma.giaovien.deleteMany({});
  await prisma.bangiamhieu.deleteMany({});
  await prisma.taichinh.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.thongbao.deleteMany({});
  await prisma.nguoidung.deleteMany({});

  console.log('🌱 Starting seeding...');

  // 1. Static Users (Admin, BGH, TC)
  await prisma.nguoidung.create({
    data: {
      idND: "u_admin", tenDangNhap: "admin", matKhau: "123456", vaiTro: "ADMIN",
      admin: { create: { maAdmin: "ad1", hoTen: "Admin Tổng" } }
    }
  });

  await prisma.nguoidung.create({
    data: {
      idND: "u_bgh", tenDangNhap: "bgh1", matKhau: "123456", vaiTro: "BGH",
      bangiamhieu: { create: { maBGH: "bgh1", hoTen: "Nguyễn Văn Hiệu Trưởng", chucVu: "Hiệu trưởng" } }
    }
  });

  await prisma.nguoidung.create({
    data: {
      idND: "u_tc", tenDangNhap: "tc1", matKhau: "123456", vaiTro: "TAICHINH",
      taichinh: { create: { maTC: "tc1", hoTen: "Lê Thị Tài Chính" } }
    }
  });

  // 2. Classes (L001 - L005)
  const classesData = [
    { maLop: 'LOP-CH-L1', tenLop: 'L001', siSo: 15 },
    { maLop: 'LOP-CH-L2', tenLop: 'L002', siSo: 15 },
    { maLop: 'LOP-LA-L1', tenLop: 'L003', siSo: 20 },
    { maLop: 'LOP-MG-L1', tenLop: 'L004', siSo: 20 },
    { maLop: 'LOP-MG-L2', tenLop: 'L005', siSo: 20 },
  ];
  for (const c of classesData) { await prisma.lophoc.create({ data: c }); }

  // 3. Teachers (GV001 - GV008)
  const teachers = [
    { maGV: 'GV001', hoTen: 'Trần Thị GV', chuyenMon: 'Mầm non', ten: 'gv1', maLopChuNhiem: 'LOP-CH-L1' },
    { maGV: 'GV002', hoTen: 'Nguyễn Thị Mai', chuyenMon: 'Âm nhạc & Múa', ten: 'gv_mai' },
    { maGV: 'GV003', hoTen: 'Lê Văn Hùng', chuyenMon: 'Giáo dục thể chất', ten: 'gv_hung', maLopChuNhiem: 'LOP-CH-L2' },
    { maGV: 'GV004', hoTen: 'Phạm Thanh Hà', chuyenMon: 'Tiếng Anh', ten: 'gv_ha', maLopChuNhiem: 'LOP-LA-L1' },
    { maGV: 'GV005', hoTen: 'Hoàng Văn Nam', chuyenMon: 'Mỹ thuật', ten: 'gv_nam', maLopChuNhiem: 'LOP-MG-L1' },
    { maGV: 'GV006', hoTen: 'Đỗ Thu Thủy', chuyenMon: 'Kỹ năng sống', ten: 'gv_thuy', maLopChuNhiem: 'LOP-MG-L2' },
    { maGV: 'GV007', hoTen: 'Bùi Minh Anh', chuyenMon: 'Tin học', ten: 'gv_anh' },
    { maGV: 'GV008', hoTen: 'Vũ Đức Trọng', chuyenMon: 'Võ thuật', ten: 'gv_trong' },
  ];

  for (const t of teachers) {
    const user = await prisma.nguoidung.create({
      data: {
        idND: 'u_' + t.maGV.toLowerCase(), tenDangNhap: t.ten, matKhau: '123456', vaiTro: 'GIAOVIEN',
        giaovien: {
          create: { maGV: t.maGV, hoTen: t.hoTen, chuyenMon: t.chuyenMon, gioiTinh: t.maGV === 'GV003' || t.maGV === 'GV005' || t.maGV === 'GV008' ? 'Nam' : 'Nữ' }
        }
      }
    });
    if (t.maLopChuNhiem) {
      await prisma.lophoc.update({ where: { maLop: t.maLopChuNhiem }, data: { giaoVienId: t.maGV } });
    }
  }

  // 4. Teaching Schedules (Mai GV002 only teaches L001)
  const schedules = [
    { maGV: 'GV002', thu: 2, caHoc: 'Sáng', monHoc: 'Âm nhạc', maLop: 'LOP-CH-L1' },
    { maGV: 'GV002', thu: 4, caHoc: 'Sáng', monHoc: 'Múa', maLop: 'LOP-CH-L1' },
    { maGV: 'GV003', thu: 3, caHoc: 'Chiều', monHoc: 'Thể dục', maLop: 'LOP-CH-L2' },
    { maGV: 'GV007', thu: 3, caHoc: 'Sáng', monHoc: 'Tin học', maLop: 'LOP-CH-L1' },
    { maGV: 'GV008', thu: 5, caHoc: 'Chiều', monHoc: 'Võ thuật', maLop: 'LOP-CH-L2' },
  ];
  for (const s of schedules) { await prisma.lichgiangday.create({ data: s }); }

  // 5. Students & Parents (1 Parent : 1-2 Students)
  const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
  const middleNames = ['Văn', 'Thị', 'Minh', 'Thanh', 'Đức', 'Quang', 'Hữu', 'Kim'];
  const firstNames = ['An', 'Bình', 'Chi', 'Dũng', 'Em', 'Gia', 'Hoa', 'Hùng', 'Kiên', 'Lan', 'Minh', 'Nam', 'Oanh', 'Phúc', 'Quân', 'Sơn', 'Tâm', 'Uyên', 'Việt', 'Yến'];

  let hsCount = 1;
  let phCount = 1;

  for (const c of classesData) {
    const studentsInClass = 8; // 8 per class = 40 total
    for (let i = 0; i < studentsInClass; i++) {
      // Create a parent for every 2 students (to simulate siblings) or for every student
      let currentPHId;
      if (i % 2 === 0) {
        const phMa = `PH${phCount.toString().padStart(3, '0')}`;
        const phUser = await prisma.nguoidung.create({
          data: {
            idND: `u_ph${phCount}`, tenDangNhap: `phuhuynh${phCount}`, matKhau: '123456', vaiTro: 'PHUHUYNH',
            phuhuynh: { create: { maPH: phMa, hoTen: `${lastNames[phCount % 10]} Phụ Huynh ${phCount}` } }
          }
        });
        currentPHId = phMa;
        phCount++;
      } else {
        currentPHId = `PH${(phCount - 1).toString().padStart(3, '0')}`;
      }

      const hsMa = `HS${hsCount.toString().padStart(3, '0')}`;
      const name = `${lastNames[Math.floor(Math.random() * 10)]} ${middleNames[Math.floor(Math.random() * 8)]} ${firstNames[Math.floor(Math.random() * 20)]}`;
      
      const student = await prisma.hocsinh.create({
        data: {
          maHS: hsMa,
          hoTen: name,
          lopId: c.maLop,
          phuHuynhId: currentPHId,
          gioiTinh: i % 2 === 0 ? 'Nam' : 'Nữ',
          ngaySinh: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        }
      });

      // Add sample data for first 10 students
      if (hsCount <= 10) {
        await prisma.bangdiem.create({
          data: { hocSinhId: hsMa, monHoc: 'Âm nhạc', diemSo: 9, nhanXet: 'Rất năng khiếu', kyHoc: 'HK1', namHoc: '2023-2024' }
        });
        await prisma.bangdiem.create({
          data: { hocSinhId: hsMa, monHoc: 'Vẽ', diemSo: 8, nhanXet: 'Sáng tạo', kyHoc: 'HK1', namHoc: '2023-2024' }
        });
        await prisma.suckhoe.create({
          data: { maSK: `SK${hsCount.toString().padStart(3, '0')}`, hocSinhId: hsMa, ngayKiemTra: new Date(), chieuCao: 105, canNang: 18, tinhTrang: 'Tốt' }
        });
        await prisma.diemdanh.create({
          data: { hocSinhId: hsMa, ngay: new Date(), trangThai: 'Có mặt', ghiChu: 'Bé đi học sớm' }
        });
        await prisma.danhgia.create({
          data: { hocSinhId: hsMa, nhanXetChung: 'Bé ngoan, lễ phép, hòa đồng với bạn bè.', namHoc: '2023-2024', kyHoc: 'HK1' }
        });
      }

      hsCount++;
    }
  }

  console.log(`✅ Seeded ${hsCount - 1} students and ${phCount - 1} parents across ${classesData.length} classes.`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });