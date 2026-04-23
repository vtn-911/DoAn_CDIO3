/*
  Warnings:

  - A unique constraint covering the columns `[nguoiDung]` on the table `bangiamhieu` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nguoiDung` on table `bangiamhieu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bangiamhieu` MODIFY `nguoiDung` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `taichinh` (
    `maTC` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `soDienThoai` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `taichinh_nguoiDung_key`(`nguoiDung`),
    PRIMARY KEY (`maTC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `bangiamhieu_nguoiDung_key` ON `bangiamhieu`(`nguoiDung`);

-- AddForeignKey
ALTER TABLE `taichinh` ADD CONSTRAINT `taichinh_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bangiamhieu` ADD CONSTRAINT `bangiamhieu_nguoiDung_fkey` FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`) ON DELETE RESTRICT ON UPDATE CASCADE;
