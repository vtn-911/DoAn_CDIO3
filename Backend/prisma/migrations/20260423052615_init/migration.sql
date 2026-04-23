-- CreateTable
CREATE TABLE `nguoidung` (
    `idND` VARCHAR(191) NOT NULL,
    `tenDangNhap` VARCHAR(191) NOT NULL,
    `matKhau` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `soDienThoai` VARCHAR(191) NULL,
    `vaiTro` VARCHAR(191) NULL,

    PRIMARY KEY (`idND`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taikhoan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` VARCHAR(191) NULL,
    `nguoiDungGV` VARCHAR(191) NULL,
    `adminMaAdmin` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `maAdmin` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `nguoiDung` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_nguoiDung_key`(`nguoiDung`),
    PRIMARY KEY (`maAdmin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giaovien` (
    `maGV` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `soDienThoai` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `giaovien_nguoiDung_key`(`nguoiDung`),
    PRIMARY KEY (`maGV`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phuhuynh` (
    `maPH` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `soDienThoai` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `diaChi` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NULL,
    `giaoVien` VARCHAR(191) NULL,
    `hocSinh` VARCHAR(191) NULL,

    UNIQUE INDEX `phuhuynh_nguoiDung_key`(`nguoiDung`),
    PRIMARY KEY (`maPH`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hocsinh` (
    `maHS` VARCHAR(191) NOT NULL,
    `sucKhoeMa` VARCHAR(191) NULL,
    `lopHocMa` VARCHAR(191) NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `ngaySinh` DATETIME(3) NULL,
    `gioiTinh` VARCHAR(191) NULL,
    `diaChi` VARCHAR(191) NULL,
    `tinhTrang` VARCHAR(191) NULL,
    `giaoVien` VARCHAR(191) NULL,
    `phuHuynh` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NULL,

    PRIMARY KEY (`maHS`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lophoc` (
    `maLop` VARCHAR(191) NOT NULL,
    `tenLop` VARCHAR(191) NOT NULL,
    `siSo` INTEGER NULL,
    `giaoVien` VARCHAR(191) NULL,

    PRIMARY KEY (`maLop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suckhoe` (
    `maSK` VARCHAR(191) NOT NULL,
    `chieuCao` DOUBLE NULL,
    `canNang` DOUBLE NULL,
    `tinhTrang` VARCHAR(191) NULL,
    `ngayKiemTra` DATETIME(3) NULL,
    `giaoVien` VARCHAR(191) NULL,

    PRIMARY KEY (`maSK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bangiamhieu` (
    `maBGH` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `chucVu` VARCHAR(191) NULL,
    `soDienThoai` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NULL,

    PRIMARY KEY (`maBGH`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hocphi` (
    `maHP` VARCHAR(191) NOT NULL,
    `thang` INTEGER NULL,
    `soTien` DOUBLE NULL,
    `tinhTrang` VARCHAR(191) NULL,
    `ngayDong` DATETIME(3) NULL,
    `bangiamhieu` VARCHAR(191) NULL,

    PRIMARY KEY (`maHP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chiphikhac` (
    `maCP` VARCHAR(191) NOT NULL,
    `loai` VARCHAR(191) NULL,
    `soTien` DOUBLE NULL,
    `ngayChi` DATETIME(3) NULL,
    `ghiChu` VARCHAR(191) NULL,
    `bangiamhieu` VARCHAR(191) NULL,

    PRIMARY KEY (`maCP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giaovien_bangiamhieu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `giaoVien` VARCHAR(191) NOT NULL,
    `bangiamhieu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bangiamhieu_hocsinh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bangiamhieu` VARCHAR(191) NOT NULL,
    `hocSinh` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lophoc_bangiamhieu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lopHoc` VARCHAR(191) NOT NULL,
    `bangiamhieu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `giaovien` ADD CONSTRAINT `giaovien_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phuhuynh` ADD CONSTRAINT `phuhuynh_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_lopHocMa_fkey` FOREIGN KEY (`lopHocMa`) REFERENCES `lophoc`(`maLop`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suckhoe` ADD CONSTRAINT `suckhoe_giaoVien_fkey` FOREIGN KEY (`giaoVien`) REFERENCES `giaovien`(`maGV`) ON DELETE SET NULL ON UPDATE CASCADE;
