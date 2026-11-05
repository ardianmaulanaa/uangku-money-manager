import { prisma } from "@/lib/prisma";
import { TransactionDashboard } from "@/features/transactions/components/transaction-dashboard";
import { WalletIcon } from "@/features/transactions/components/icons";
import type {
  FinancialSummary,
  TransactionView,
} from "@/features/transactions/types";

export const dynamic = "force-dynamic";

type DashboardData = {
  transactions: TransactionView[];
  summary: FinancialSummary;
};

async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const [records, groupedTotals] = await Promise.all([
      prisma.transaction.findMany({
        orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      }),
      prisma.transaction.groupBy({
        by: ["type"],
        _sum: { amount: true },
      }),
    ]);

    const income = groupedTotals.find((item) => item.type === "INCOME")?._sum.amount ?? 0n;
    const expense = groupedTotals.find((item) => item.type === "EXPENSE")?._sum.amount ?? 0n;

    return {
      transactions: records.map((transaction) => ({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description,
        date: transaction.date.toISOString().slice(0, 10),
      })),
      summary: {
        income: income.toString(),
        expense: expense.toString(),
        balance: (income - expense).toString(),
      },
    };
  } catch {
    return null;
  }
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#f7f9f8]">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
              <WalletIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">Uangku</span>
          </div>
          <span className="ml-auto rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Keuangan pribadi</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-emerald-600">DASHBOARD</p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Ringkasan keuangan</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">Pantau arus uang dan kelola setiap transaksi dalam satu tempat.</p>
        </div>

        {data ? (
          <TransactionDashboard transactions={data.transactions} summary={data.summary} />
        ) : (
          <DatabaseError />
        )}
      </div>

      <footer className="mx-auto max-w-6xl px-5 pb-8 text-center text-xs text-slate-400 sm:px-8 lg:px-10">Uangku · Gunakan hanya pada lingkungan lokal yang aksesnya terkontrol.</footer>
    </main>
  );
}

function DatabaseError() {
  return (
    <section className="rounded-2xl border border-amber-200 bg-white p-7 shadow-sm" role="alert">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-lg font-bold text-amber-600">!</span>
        <div>
          <h2 className="font-semibold text-slate-900">Database belum dapat dihubungi</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Pastikan PostgreSQL aktif, isi <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">DATABASE_URL</code> di <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">.env.local</code>, lalu jalankan migrasi Prisma. Detail internal koneksi tidak ditampilkan demi keamanan.</p>
        </div>
      </div>
    </section>
  );
}
