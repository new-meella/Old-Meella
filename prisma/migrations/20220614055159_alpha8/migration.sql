-- CreateTable
CREATE TABLE `FavTable` (
    `storeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`storeId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `productNote` VARCHAR(255) NULL,

    PRIMARY KEY (`orderId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTag` (
    `productId` INTEGER NOT NULL,
    `tagNameEn` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`productId`, `tagNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreTag` (
    `storeId` INTEGER NOT NULL,
    `tagNameEn` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`storeId`, `tagNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCoupon` (
    `couponId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`couponId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentType` (
    `paymentName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`paymentName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PickUpTimeTag` (
    `pickUpTimeNameEn` VARCHAR(255) NOT NULL,
    `pickUpTime` TIME(0) NOT NULL,

    UNIQUE INDEX `PickUpTimeTag_pickUpTimeNameEn_key`(`pickUpTimeNameEn`),
    UNIQUE INDEX `PickUpTimeTag_pickUpTime_key`(`pickUpTime`),
    PRIMARY KEY (`pickUpTimeNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupportTag` (
    `supportTypeNameEn` VARCHAR(255) NOT NULL,
    `supportTypeNameTh` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `SupportTag_supportTypeNameTh_key`(`supportTypeNameTh`),
    PRIMARY KEY (`supportTypeNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `tagNameEn` VARCHAR(255) NOT NULL,
    `tagNameTh` VARCHAR(255) NOT NULL,
    `tagType` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Tag_tagNameTh_key`(`tagNameTh`),
    PRIMARY KEY (`tagNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `statusNameEn` VARCHAR(255) NOT NULL,
    `statusNameTh` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`statusNameEn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccount` (
    `bankAccountId` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNumber` VARCHAR(255) NOT NULL,
    `accountName` VARCHAR(255) NOT NULL,
    `branch` VARCHAR(255) NOT NULL,
    `bankName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`bankAccountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankName` (
    `bankName` VARCHAR(255) NOT NULL,
    `bankNameOfficial` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`bankName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `couponId` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,
    `aptStore` INTEGER NULL,
    `aptProduct` INTEGER NULL,
    `discountAmount` INTEGER NULL,
    `discountPercentage` DOUBLE NULL,
    `expiredAt` DATETIME(3) NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`couponId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `couponId` INTEGER NULL,
    `statusNameEn` VARCHAR(255) NOT NULL,
    `paymentName` VARCHAR(255) NOT NULL,
    `orderNote` VARCHAR(255) NULL,
    `pickUpTimeNameEn` VARCHAR(255) NULL,
    `numItems` INTEGER NULL,
    `totalGbCut` INTEGER NOT NULL,
    `totalStoreCut` INTEGER NOT NULL,
    `totalMeellaCut` INTEGER NOT NULL,
    `totalOriginalPrice` INTEGER NOT NULL,
    `totalFinalPrice` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalPrice` INTEGER NOT NULL,
    `meellaPaidAt` DATETIME(3) NULL,
    `storePaidAt` DATETIME(3) NULL,
    `gbPaidAt` DATETIME(3) NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `nameEn` VARCHAR(255) NOT NULL,
    `nameTh` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `image` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `meellaPrice` INTEGER NOT NULL DEFAULT 0,
    `ogPrice` INTEGER NOT NULL DEFAULT 0,
    `meellaCut` INTEGER NULL,
    `gbCut` INTEGER NULL,
    `storeCut` INTEGER NULL,
    `pickUpTimeNameEn` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `storeId` INTEGER NOT NULL AUTO_INCREMENT,
    `storeOwnerId` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nameEn` VARCHAR(255) NOT NULL,
    `nameTh` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `foodType` VARCHAR(255) NOT NULL,
    `aboutUs` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `coordinate` VARCHAR(255) NOT NULL,
    `district` VARCHAR(255) NULL,
    `subDistrict` VARCHAR(255) NULL,
    `province` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `numReviews` INTEGER NOT NULL DEFAULT 0,
    `numProducts` INTEGER NOT NULL DEFAULT 0,
    `numOrders` INTEGER NOT NULL DEFAULT 0,
    `numCoupons` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Store_storeOwnerId_key`(`storeOwnerId`),
    UNIQUE INDEX `Store_nameEn_nameTh_key`(`nameEn`, `nameTh`),
    PRIMARY KEY (`storeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreOwner` (
    `storeOwnerId` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NULL,
    `bankAccountId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userName` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `lang` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `StoreOwner_storeId_key`(`storeId`),
    UNIQUE INDEX `StoreOwner_bankAccountId_key`(`bankAccountId`),
    UNIQUE INDEX `StoreOwner_userName_key`(`userName`),
    PRIMARY KEY (`storeOwnerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketSupport` (
    `tickSupportId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(255) NULL,
    `supportTypeNameEn` VARCHAR(255) NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `statusNameEn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TicketSupport_orderId_key`(`orderId`),
    PRIMARY KEY (`tickSupportId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firebaseUserId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lang` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `meellaPoints` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_firebaseUserId_key`(`firebaseUserId`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavTable` ADD CONSTRAINT `FavTable_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavTable` ADD CONSTRAINT `FavTable_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTag` ADD CONSTRAINT `ProductTag_tagNameEn_fkey` FOREIGN KEY (`tagNameEn`) REFERENCES `Tag`(`tagNameEn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTag` ADD CONSTRAINT `ProductTag_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreTag` ADD CONSTRAINT `StoreTag_tagNameEn_fkey` FOREIGN KEY (`tagNameEn`) REFERENCES `Tag`(`tagNameEn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreTag` ADD CONSTRAINT `StoreTag_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoupon` ADD CONSTRAINT `UserCoupon_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`couponId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoupon` ADD CONSTRAINT `UserCoupon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_bankName_fkey` FOREIGN KEY (`bankName`) REFERENCES `BankName`(`bankName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentName_fkey` FOREIGN KEY (`paymentName`) REFERENCES `PaymentType`(`paymentName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_pickUpTimeNameEn_fkey` FOREIGN KEY (`pickUpTimeNameEn`) REFERENCES `PickUpTimeTag`(`pickUpTimeNameEn`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_statusNameEn_fkey` FOREIGN KEY (`statusNameEn`) REFERENCES `Status`(`statusNameEn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`couponId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_pickUpTimeNameEn_fkey` FOREIGN KEY (`pickUpTimeNameEn`) REFERENCES `PickUpTimeTag`(`pickUpTimeNameEn`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreOwner` ADD CONSTRAINT `StoreOwner_bankAccountId_fkey` FOREIGN KEY (`bankAccountId`) REFERENCES `BankAccount`(`bankAccountId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreOwner` ADD CONSTRAINT `StoreOwner_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`storeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSupport` ADD CONSTRAINT `TicketSupport_supportTypeNameEn_fkey` FOREIGN KEY (`supportTypeNameEn`) REFERENCES `SupportTag`(`supportTypeNameEn`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSupport` ADD CONSTRAINT `TicketSupport_statusNameEn_fkey` FOREIGN KEY (`statusNameEn`) REFERENCES `Status`(`statusNameEn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSupport` ADD CONSTRAINT `TicketSupport_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketSupport` ADD CONSTRAINT `TicketSupport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
