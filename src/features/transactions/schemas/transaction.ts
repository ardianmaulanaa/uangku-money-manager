import { z } from "zod";

const MAX_IDR_AMOUNT = BigInt("9007199254740991");

export const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"], {
    message: "Pilih jenis transaksi.",
  }),
  amount: z
    .string()
    .trim()
    .regex(/^\d+$/, "Nominal harus berupa bilangan bulat rupiah.")
    .transform((value) => BigInt(value))
    .refine((value) => value > BigInt(0), "Nominal harus lebih besar dari nol.")
    .refine(
      (value) => value <= MAX_IDR_AMOUNT,
      "Nominal melebihi batas yang didukung aplikasi.",
    ),
  category: z
    .string()
    .trim()
    .min(1, "Kategori wajib diisi.")
    .max(80, "Kategori maksimal 80 karakter."),
  description: z
    .string()
    .trim()
    .max(240, "Keterangan maksimal 240 karakter.")
    .transform((value) => value || null),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal transaksi tidak valid.")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
    }, "Tanggal transaksi tidak valid."),
});

export function transactionInputFrom(formData: FormData) {
  return {
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    description: formData.get("description"),
    date: formData.get("date"),
  };
}
