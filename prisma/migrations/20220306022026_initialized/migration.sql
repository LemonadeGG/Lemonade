/*
  Warnings:

  - You are about to drop the `Filters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guilds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Filters";

-- DropTable
DROP TABLE "Guilds";

-- DropTable
DROP TABLE "Notes";

-- CreateTable
CREATE TABLE "guilds" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "language" TEXT NOT NULL DEFAULT E'en-US',
    "phiserman" TEXT NOT NULL DEFAULT E'null'
);

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT[]
);

-- CreateTable
CREATE TABLE "filters" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "MessageLinkFilter" BOOLEAN NOT NULL DEFAULT false,
    "MessageLinkFilterAction" TEXT NOT NULL DEFAULT E'none',
    "ScamLinkFilter" BOOLEAN NOT NULL DEFAULT false,
    "ScamLinkFilterAction" TEXT NOT NULL DEFAULT E'ban'
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_id_key" ON "guilds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guildId_key" ON "guilds"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "notes_id_key" ON "notes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "filters_id_key" ON "filters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "filters_guildId_key" ON "filters"("guildId");
