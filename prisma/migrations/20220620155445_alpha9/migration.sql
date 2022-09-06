/*
  Warnings:

  - You are about to drop the column `description` on the `coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coupon` DROP COLUMN `description`,
    ADD COLUMN `budget` INTEGER NULL,
    ADD COLUMN `code` VARCHAR(255) NULL,
    ADD COLUMN `descriptionEn` VARCHAR(255) NULL,
    ADD COLUMN `descriptionTh` VARCHAR(255) NULL,
    ADD COLUMN `usesPerCustomerPerDay` INTEGER NULL,
    ADD COLUMN `usesPerDay` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `relDistance` VARCHAR(255) NULL;
