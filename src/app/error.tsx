"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9f8] px-5">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-rose-600">TERJADI KESALAHAN</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Dashboard belum dapat ditampilkan</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Silakan coba memuat ulang. Detail internal tidak ditampilkan demi keamanan.</p>
        <button className="button-primary mt-6" onClick={reset}>Coba lagi</button>
      </div>
    </main>
  );
}
