-- Copies both legacy profile tables into the unified model without dropping them.
-- Requires the preflight checks documented alongside this migration to pass.
CREATE TABLE `phongdaotao` (
    `maPDT` VARCHAR(191) NOT NULL,
    `hoTen` VARCHAR(191) NOT NULL,
    `chucVu` VARCHAR(191) NULL,
    `nguoiDung` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `phongdaotao_nguoiDung_key`(`nguoiDung`),
    PRIMARY KEY (`maPDT`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `phongdaotao` (`maPDT`, `hoTen`, `chucVu`, `nguoiDung`)
SELECT CONCAT('PDT-ADM-', SHA2(`maAdmin`, 256)), `hoTen`, NULL, `nguoiDung`
FROM `admin`
UNION ALL
SELECT CONCAT('PDT-BGH-', SHA2(`maBGH`, 256)), `hoTen`, `chucVu`, `nguoiDung`
FROM `bangiamhieu`;

ALTER TABLE `phongdaotao`
    ADD CONSTRAINT `phongdaotao_nguoiDung_fkey`
    FOREIGN KEY (`nguoiDung`) REFERENCES `nguoidung`(`idND`)
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `lophoc` DROP FOREIGN KEY `lophoc_bghId_fkey`;

UPDATE `lophoc` AS l
INNER JOIN `bangiamhieu` AS b ON l.`bghId` = b.`maBGH`
SET l.`bghId` = CONCAT('PDT-BGH-', SHA2(b.`maBGH`, 256));

ALTER TABLE `lophoc`
    ADD CONSTRAINT `lophoc_bghId_fkey`
    FOREIGN KEY (`bghId`) REFERENCES `phongdaotao`(`maPDT`)
    ON DELETE SET NULL ON UPDATE CASCADE;