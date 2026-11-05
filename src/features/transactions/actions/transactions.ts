"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  transactionInputFrom,
  transactionSchema,
} from "@/features/transactions/schemas/transaction";
import type { TransactionActionState } from "@/features/transactions/types";

const genericError = "Transaksi belum dapat disimpan. Silakan coba lagi.";

function validationError(error: z.ZodError): TransactionActionState {
  return {
    status: "error",
    message: "Periksa kembali data transaksi.",
    errors: error.flatten().fieldErrors,
  };
}

export async function createTransaction(
  _previousState: TransactionActionState,
  formData: FormData,
): Promise<TransactionActionState> {
  const parsed = transactionSchema.safeParse(transactionInputFrom(formData));
  if (!parsed.success) return validationError(parsed.error);

  try {
    await prisma.transaction.create({
      data: {
        ...parsed.data,
        date: new Date(`${parsed.data.date}T00:00:00.000Z`),
      },
    });
    revalidatePath("/");
    return { status: "success", message: "Transaksi berhasil ditambahkan." };
  } catch {
    return { status: "error", message: genericError };
  }
}

export async function updateTransaction(
  id: string,
  _previousState: TransactionActionState,
  formData: FormData,
): Promise<TransactionActionState> {
  if (!z.string().cuid().safeParse(id).success) {
    return { status: "error", message: "Transaksi tidak valid." };
  }

  const parsed = transactionSchema.safeParse(transactionInputFrom(formData));
  if (!parsed.success) return validationError(parsed.error);

  try {
    await prisma.transaction.update({
      where: { id },
      data: {
        ...parsed.data,
        date: new Date(`${parsed.data.date}T00:00:00.000Z`),
      },
    });
    revalidatePath("/");
    return { status: "success", message: "Perubahan transaksi tersimpan." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { status: "error", message: "Transaksi tidak ditemukan." };
    }
    return { status: "error", message: genericError };
  }
}

export async function deleteTransaction(
  id: string,
): Promise<TransactionActionState> {
  if (!z.string().cuid().safeParse(id).success) {
    return { status: "error", message: "Transaksi tidak valid." };
  }

  try {
    await prisma.transaction.delete({ where: { id } });
    revalidatePath("/");
    return { status: "success", message: "Transaksi berhasil dihapus." };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { status: "error", message: "Transaksi tidak ditemukan." };
    }
    return { status: "error", message: "Transaksi belum dapat dihapus." };
  }
}
