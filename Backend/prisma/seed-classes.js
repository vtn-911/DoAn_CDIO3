const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const classes = [
    { maLop: 'LOP-MG-L1', tenLop: 'Mầm 1', siSo: 20 },
    { maLop: 'LOP-MG-L2', tenLop: 'Mầm 2', siSo: 22 },
    { maLop: 'LOP-CH-L1', tenLop: 'Chồi 1', siSo: 18 },
    { maLop: 'LOP-CH-L2', tenLop: 'Chồi 2', siSo: 20 },
    { maLop: 'LOP-LA-L1', tenLop: 'Lá 1',   siSo: 25 },
  ];

  for (const lop of classes) {
    await prisma.lophoc.upsert({
      where: { maLop: lop.maLop },
      update: { tenLop: lop.tenLop, siSo: lop.siSo },
      create: lop
    });
    console.log(`✅ Upserted: ${lop.tenLop} (${lop.maLop})`);
  }

  console.log('\n🎉 Seed xong 5 lớp học!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
