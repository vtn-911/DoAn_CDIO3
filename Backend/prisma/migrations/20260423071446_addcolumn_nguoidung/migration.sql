/*
  Warnings:

  - You are about to drop the column `email` on the `bangiamhieu` table. All the data in the column will be lost.
  - You are about to drop the column `soDienThoai` on the `bangiamhieu` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `giaovien` table. All the data in the column will be lost.
  - You are about to drop the column `soDienThoai` on the `giaovien` table. All the data in the column will be lost.
  - You are about to drop the column `diaChi` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `giaoVien` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `lopHocMa` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `nguoiDung` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `phuHuynh` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `sucKhoeMa` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `tinhTrang` on the `hocsinh` table. All the data in the column will be lost.
  - You are about to drop the column `giaoVien` on the `lophoc` table. All the data in the column will be lost.
  - You are about to drop the column `diaChi` on the `phuhuynh` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `phuhuynh` table. All the data in the column will be lost.
  - You are about to drop the column `giaoVien` on the `phuhuynh` table. All the data in the column will be lost.
  - You are about to drop the column `hocSinh` on the `phuhuynh` table. All the data in the column will be lost.
  - You are about to drop the column `soDienThoai` on the `phuhuynh` table. All the data in the column will be lost.
  - You are about to drop the column `giaoVien` on the `suckhoe` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `taichinh` table. All the data in the column will be lost.
  - You are about to drop the column `soDienThoai` on the `taichinh` table. All the data in the column will be lost.
  - You are about to drop the `bangiamhieu_hocsinh` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chiphikhac` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `giaovien_bangiamhieu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hocphi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lophoc_bangiamhieu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taikhoan` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tenDangNhap]` on the table `nguoidung` will be added. If there are existing duplicate values, this will fail.
  - Made the column `vaiTro` on table `nguoidung` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nguoiDung` on table `phuhuynh` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hocSinhId` to the `suckhoe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hocsinh` DROP FOREIGN KEY `hocsinh_lopHocMa_fkey`;

-- DropForeignKey
ALTER TABLE `phuhuynh` DROP FOREIGN KEY `phuhuynh_nguoiDung_fkey`;

-- DropForeignKey
ALTER TABLE `suckhoe` DROP FOREIGN KEY `suckhoe_giaoVien_fkey`;

-- AlterTable
ALTER TABLE `bangiamhieu` DROP COLUMN `email`,
    DROP COLUMN `soDienThoai`;

-- AlterTable
ALTER TABLE `giaovien` DROP COLUMN `email`,
    DROP COLUMN `soDienThoai`;

-- AlterTable
ALTER TABLE `hocsinh` DROP COLUMN `diaChi`,
    DROP COLUMN `giaoVien`,
    DROP COLUMN `lopHocMa`,
    DROP COLUMN `nguoiDung`,
    DROP COLUMN `phuHuynh`,
    DROP COLUMN `sucKhoeMa`,
    DROP COLUMN `tinhTrang`,
    ADD COLUMN `giaoVienId` VARCHAR(191) NULL,
    ADD COLUMN `lopId` VARCHAR(191) NULL,
    ADD COLUMN `phuHuynhId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `lophoc` DROP COLUMN `giaoVien`,
    ADD COLUMN `bghId` VARCHAR(191) NULL,
    ADD COLUMN `giaoVienId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `nguoidung` MODIFY `vaiTro` ENUM('ADMIN', 'BGH', 'GIAOVIEN', 'TAICHINH', 'PHUHUYNH') NOT NULL;

-- AlterTable
ALTER TABLE `phuhuynh` DROP COLUMN `diaChi`,
    DROP COLUMN `email`,
    DROP COLUMN `giaoVien`,
    DROP COLUMN `hocSinh`,
    DROP COLUMN `soDienThoai`,
    MODIFY `nguoiDung` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `suckhoe` DROP COLUMN `giaoVien`,
    ADD COLUMN `hocSinhId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `taichinh` DROP COLUMN `email`,
    DROP COLUMN `soDienThoai`;

-- DropTable
DROP TABLE `bangiamhieu_hocsinh`;

-- DropTable
DROP TABLE `chiphikhac`;

-- DropTable
DROP TABLE `giaovien_bangiamhieu`;

-- DropTable
DROP TABLE `hocphi`;

-- DropTable
DROP TABLE `lophoc_bangiamhieu`;

-- DropTable
DROP TABLE `taikhoan`;

-- CreateTable
CREATE TABLE `thuchi` (
    `maTC` VARCHAR(191) NOT NULL,
    `loai` VARCHAR(191) NOT NULL,
    `soTien` DOUBLE NOT NULL,
    `ngay` DATETIME(3) NOT NULL,
    `taiChinhId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`maTC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thongbao` (
    `maTB` VARCHAR(191) NOT NULL,
    `tieuDe` VARCHAR(191) NOT NULL,
    `noiDung` VARCHAR(191) NOT NULL,
    `ngayGui` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nguoiGuiId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`maTB`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `nguoidung_tenDangNhap_key` ON `nguoidung`(`tenDangNhap`);

-- AddForeignKey
ALTER TABLE `phuhuynh` ADD CONSTRAINT `phuhuynh_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lophoc` ADD CONSTRAINT `lophoc_giaoVienId_fkey` FOREIGN KEY (`giaoVienId`) REFERENCES `giaovien`(`maGV`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lophoc` ADD CONSTRAINT `lophoc_bghId_fkey` FOREIGN KEY (`bghId`) REFERENCES `bangiamhieu`(`maBGH`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_lopId_fkey` FOREIGN KEY (`lopId`) REFERENCES `lophoc`(`maLop`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_giaoVienId_fkey` FOREIGN KEY (`giaoVienId`) REFERENCES `giaovien`(`maGV`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hocsinh` ADD CONSTRAINT `hocsinh_phuHuynhId_fkey` FOREIGN KEY (`phuHuynhId`) REFERENCES `phuhuynh`(`maPH`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suckhoe` ADD CONSTRAINT `suckhoe_hocSinhId_fkey` FOREIGN KEY (`hocSinhId`) REFERENCES `hocsinh`(`maHS`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thuchi` ADD CONSTRAINT `thuchi_taiChinhId_fkey` FOREIGN KEY (`taiChinhId`) REFERENCES `taichinh`(`maTC`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thongbao` ADD CONSTRAINT `thongbao_nguoiGuiId_fkey` FOREIGN KEY (`nguoiGuiId`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;
