-- CreateTable
CREATE TABLE `members` (
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `books` (
    `code` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;
