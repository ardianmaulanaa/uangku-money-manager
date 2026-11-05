export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7f9f8]" aria-busy="true" aria-label="Memuat dashboard">
      <div className="border-b border-slate-200 bg-white"><div className="mx-auto h-[73px] max-w-6xl px-5" /></div>
      <div className="mx-auto max-w-6xl animate-pulse px-5 py-10 sm:px-8 lg:px-10">
        <div className="h-4 w-24 rounded bg-slate-200" /><div className="mt-4 h-9 w-72 rounded bg-slate-200" /><div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-200" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-40 rounded-2xl bg-slate-200" />)}</div>
        <div className="mt-8 h-80 rounded-2xl bg-slate-200" />
      </div>
    </main>
  );
}
