-- AlterTable
ALTER TABLE "filters" ADD CONSTRAINT "filters_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notes" ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "clearance" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL DEFAULT E'0',
    "Clearance1" TEXT[],
    "Clearance2" TEXT[],
    "Clearance3" TEXT[],
    "Clearance4" TEXT[],
    "Clearance5" TEXT[],
    "Clearance6" TEXT[],

    CONSTRAINT "clearance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clearance_id_key" ON "clearance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_guildId_key" ON "clearance"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance1_key" ON "clearance"("Clearance1");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance2_key" ON "clearance"("Clearance2");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance3_key" ON "clearance"("Clearance3");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance4_key" ON "clearance"("Clearance4");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance5_key" ON "clearance"("Clearance5");

-- CreateIndex
CREATE UNIQUE INDEX "clearance_Clearance6_key" ON "clearance"("Clearance6");
