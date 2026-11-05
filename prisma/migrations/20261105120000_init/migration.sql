-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" BIGINT NOT NULL,
    "category" VARCHAR(80) NOT NULL,
    "description" VARCHAR(240),
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Transaction_amount_positive" CHECK ("amount" > 0)
);

-- CreateIndex
CREATE INDEX "Transaction_date_createdAt_idx" ON "Transaction"("date" DESC, "createdAt" DESC);
