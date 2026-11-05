"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createTransaction,
  updateTransaction,
} from "@/features/transactions/actions/transactions";
import type {
  TransactionActionState,
  TransactionView,
} from "@/features/transactions/types";

const initialState: TransactionActionState = {
  status: "idle",
  message: "",
};

type TransactionFormProps = {
  transaction: TransactionView | null;
  onSuccess: (message: string) => void;
  onCancel: () => void;
};

export function TransactionForm({
  transaction,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const action = transaction
    ? updateTransaction.bind(null, transaction.id)
    : createTransaction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const handledMessage = useRef("");

  useEffect(() => {
    if (
      state.status === "success" &&
      state.message &&
      handledMessage.current !== state.message
    ) {
      handledMessage.current = state.message;
      onSuccess(state.message);
    }
  }, [state, onSuccess]);

  const fieldError = (field: keyof NonNullable<TransactionActionState["errors"]>) =>
    state.errors?.[field]?.[0];

  return (
    <form action={formAction} className="space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        <div>
          <span className="form-label">Jenis transaksi</span>
          <div className="grid grid-cols-2 gap-3">
            <label className="type-option">
              <input
                className="peer sr-only"
                type="radio"
                name="type"
                value="INCOME"
                defaultChecked={!transaction || transaction.type === "INCOME"}
              />
              <span className="type-option-content peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700">
                <span className="type-dot bg-emerald-500" /> Pemasukan
              </span>
            </label>
            <label className="type-option">
              <input
                className="peer sr-only"
                type="radio"
                name="type"
                value="EXPENSE"
                defaultChecked={transaction?.type === "EXPENSE"}
              />
              <span className="type-option-content peer-checked:border-rose-400 peer-checked:bg-rose-50 peer-checked:text-rose-700">
                <span className="type-dot bg-rose-400" /> Pengeluaran
              </span>
            </label>
          </div>
          {fieldError("type") && <FieldError>{fieldError("type")}</FieldError>}
        </div>

        <div>
          <label className="form-label" htmlFor="amount">Nominal</label>
          <div className="input-prefix-wrap">
            <span>Rp</span>
            <input
              className="form-input pl-12"
              id="amount"
              name="amount"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              required
              placeholder="0"
              defaultValue={transaction?.amount}
              aria-describedby={fieldError("amount") ? "amount-error" : undefined}
            />
          </div>
          {fieldError("amount") && <FieldError id="amount-error">{fieldError("amount")}</FieldError>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="category">Kategori</label>
            <input
              className="form-input"
              id="category"
              name="category"
              maxLength={80}
              required
              placeholder="Contoh: Makanan"
              defaultValue={transaction?.category}
            />
            {fieldError("category") && <FieldError>{fieldError("category")}</FieldError>}
          </div>
          <div>
            <label className="form-label" htmlFor="date">Tanggal</label>
            <input
              className="form-input"
              id="date"
              name="date"
              type="date"
              required
              defaultValue={transaction?.date ?? new Date().toISOString().slice(0, 10)}
            />
            {fieldError("date") && <FieldError>{fieldError("date")}</FieldError>}
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="description">
            Keterangan <span className="font-normal text-slate-400">(opsional)</span>
          </label>
          <textarea
            className="form-input min-h-24 resize-none"
            id="description"
            name="description"
            maxLength={240}
            placeholder="Tambahkan catatan singkat"
            defaultValue={transaction?.description ?? ""}
          />
          {fieldError("description") && <FieldError>{fieldError("description")}</FieldError>}
        </div>
      </fieldset>

      {state.status === "error" && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
        <button type="button" className="button-secondary" onClick={onCancel} disabled={pending}>
          Batal
        </button>
        <button type="submit" className="button-primary min-w-36" disabled={pending}>
          {pending ? "Menyimpan…" : transaction ? "Simpan perubahan" : "Tambah transaksi"}
        </button>
      </div>
    </form>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return <p id={id} className="mt-1.5 text-xs text-rose-600">{children}</p>;
}
