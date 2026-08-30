-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Contact_read_idx" ON "Contact"("read");
