"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { deleteTransaction } from "@/features/transactions/actions/transactions";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  PencilIcon,
  PlusIcon,
  ReceiptIcon,
  TrashIcon,
  TrendIcon,
  WalletIcon,
} from "@/features/transactions/components/icons";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import type {
  FinancialSummary,
  TransactionView,
} from "@/features/transactions/types";

const money = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type DashboardProps = {
  transactions: TransactionView[];
  summary: FinancialSummary;
};

export function TransactionDashboard({ transactions, summary }: DashboardProps) {
  const [editing, setEditing] = useState<TransactionView | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<TransactionView | null>(null);
  const [toast, setToast] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, startDelete] = useTransition();
  const modalRef = useRef<HTMLDivElement>(null);
  const isFormOpen = editing !== undefined;

  const closeForm = useCallback(() => setEditing(undefined), []);
  const handleSuccess = useCallback((message: string) => {
    setEditing(undefined);
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isFormOpen && !deleting) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isDeleting) {
        closeForm();
        setDeleting(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFormOpen, deleting, isDeleting, closeForm]);

  function confirmDelete() {
    if (!deleting) return;
    setDeleteError("");
    startDelete(async () => {
      const result = await deleteTransaction(deleting.id);
      if (result.status === "success") {
        setDeleting(null);
        setToast(result.message);
      } else {
        setDeleteError(result.message);
      }
    });
  }

  return (
    <>
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Ringkasan keuangan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="Saldo saat ini" value={summary.balance} icon={<WalletIcon />} primary />
          <SummaryCard label="Total pemasukan" value={summary.income} icon={<ArrowUpIcon />} tone="income" />
          <SummaryCard label="Total pengeluaran" value={summary.expense} icon={<ArrowDownIcon />} tone="expense" />
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]" aria-labelledby="transactions-heading">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2 id="transactions-heading" className="text-lg font-semibold tracking-tight text-slate-900">Transaksi terbaru</h2>
            <p className="mt-1 text-sm text-slate-500">Semua pemasukan dan pengeluaran Anda.</p>
          </div>
          <button className="button-primary w-full sm:w-auto" onClick={() => setEditing(null)}>
            <PlusIcon className="h-5 w-5" /> Tambah transaksi
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><ReceiptIcon className="h-7 w-7" /></span>
            <h3 className="text-base font-semibold text-slate-900">Belum ada transaksi</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Mulai catat pemasukan atau pengeluaran pertama untuk melihat ringkasan keuangan Anda.</p>
            <button className="button-secondary mt-5" onClick={() => setEditing(null)}><PlusIcon className="h-4 w-4" /> Tambah transaksi pertama</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-7 py-3.5">Transaksi</th><th className="px-5 py-3.5">Tanggal</th><th className="px-5 py-3.5">Jenis</th><th className="px-5 py-3.5 text-right">Nominal</th><th className="px-7 py-3.5 text-right"><span className="sr-only">Aksi</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-7 py-4"><p className="font-medium text-slate-900">{transaction.category}</p><p className="mt-0.5 max-w-xs truncate text-sm text-slate-500">{transaction.description || "Tanpa keterangan"}</p></td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{dateFormatter.format(new Date(`${transaction.date}T00:00:00.000Z`))}</td>
                    <td className="px-5 py-4"><span className={transaction.type === "INCOME" ? "badge-income" : "badge-expense"}>{transaction.type === "INCOME" ? "Pemasukan" : "Pengeluaran"}</span></td>
                    <td className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${transaction.type === "INCOME" ? "text-emerald-600" : "text-slate-800"}`}>{transaction.type === "EXPENSE" ? "−" : "+"}{formatMoney(transaction.amount)}</td>
                    <td className="px-7 py-4"><div className="flex justify-end gap-1"><button className="icon-button" onClick={() => setEditing(transaction)} aria-label={`Edit ${transaction.category}`}><PencilIcon className="h-4 w-4" /></button><button className="icon-button hover:bg-rose-50 hover:text-rose-600" onClick={() => { setDeleteError(""); setDeleting(transaction); }} aria-label={`Hapus ${transaction.category}`}><TrashIcon className="h-4 w-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isFormOpen && (
        <Modal title={editing ? "Edit transaksi" : "Tambah transaksi"} description={editing ? "Perbarui detail transaksi Anda." : "Catat aktivitas keuangan baru."} onClose={closeForm} modalRef={modalRef}>
          <TransactionForm key={editing?.id ?? "new"} transaction={editing ?? null} onSuccess={handleSuccess} onCancel={closeForm} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Hapus transaksi?" description="Tindakan ini tidak dapat dibatalkan." onClose={() => !isDeleting && setDeleting(null)} modalRef={modalRef} compact>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><p className="font-medium text-slate-900">{deleting.category}</p><p className="mt-1 text-sm text-slate-500">{formatMoney(deleting.amount)} · {dateFormatter.format(new Date(`${deleting.date}T00:00:00.000Z`))}</p></div>
          {deleteError && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{deleteError}</p>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button className="button-secondary" disabled={isDeleting} onClick={() => setDeleting(null)}>Batal</button><button className="button-danger" disabled={isDeleting} onClick={confirmDelete}>{isDeleting ? "Menghapus…" : "Ya, hapus"}</button></div>
        </Modal>
      )}

      {toast && <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl" role="status">{toast}</div>}
    </>
  );
}

function formatMoney(value: string) { return money.format(BigInt(value)); }

function SummaryCard({ label, value, icon, primary = false, tone }: { label: string; value: string; icon: React.ReactNode; primary?: boolean; tone?: "income" | "expense" }) {
  const iconClass = primary ? "bg-white/15 text-white" : tone === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500";
  return <article className={primary ? "summary-card bg-emerald-600 text-white shadow-emerald-900/10" : "summary-card border border-slate-200 bg-white text-slate-900 shadow-slate-900/5"}><div className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}>{icon}</div><div className="mt-5"><p className={`text-sm font-medium ${primary ? "text-emerald-50" : "text-slate-500"}`}>{label}</p><p className="mt-1 truncate text-2xl font-semibold tracking-tight">{formatMoney(value)}</p></div>{primary && <TrendIcon className="absolute right-5 top-5 h-20 w-20 text-white/[0.08]" />}</article>;
}

function Modal({ title, description, children, onClose, modalRef, compact = false }: { title: string; description: string; children: React.ReactNode; onClose: () => void; modalRef: React.RefObject<HTMLDivElement | null>; compact?: boolean }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} className={`max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl outline-none sm:rounded-2xl sm:p-7 ${compact ? "sm:max-w-md" : "sm:max-w-xl"}`}><div className="mb-6 flex items-start justify-between gap-4"><div><h2 id="modal-title" className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div><button className="icon-button -mr-2 -mt-1" onClick={onClose} aria-label="Tutup dialog"><CloseIcon /></button></div>{children}</div></div>;
}
