-- CreateTable
CREATE TABLE "Guilds" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "language" TEXT NOT NULL DEFAULT E'en-US',
    "phiserman" TEXT NOT NULL DEFAULT E'null'
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT[]
);

-- CreateTable
CREATE TABLE "Filters" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "MessageLinkFilter" BOOLEAN NOT NULL,
    "MessageLinkFilterAction" TEXT NOT NULL DEFAULT E'none',
    "ScamLinkFilter" BOOLEAN NOT NULL,
    "ScamLinkFilterAction" TEXT NOT NULL DEFAULT E'ban'
);

-- CreateIndex
CREATE UNIQUE INDEX "Guilds_id_key" ON "Guilds"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guilds_guildId_key" ON "Guilds"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_id_key" ON "Notes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Filters_id_key" ON "Filters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Filters_guildId_key" ON "Filters"("guildId");
