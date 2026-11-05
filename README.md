# Uangku

Uangku adalah MVP manajemen transaksi keuangan pribadi berbasis Next.js, Server Actions, Prisma, dan PostgreSQL. Aplikasi ini mencatat pemasukan dan pengeluaran serta menghitung saldo dari data aktual di database.

> Aplikasi belum memiliki autentikasi atau isolasi data antar pengguna. Gunakan hanya di lingkungan lokal/pengembangan dengan akses terkontrol; jangan deploy secara publik dalam kondisi ini.

## Menjalankan secara lokal

Prasyarat: Node.js yang kompatibel dengan Next.js 16, npm, dan PostgreSQL.

```bash
npm install
cp .env.example .env.local
```

Isi `DATABASE_URL` di `.env.local` dengan connection string PostgreSQL milik Anda, lalu jalankan:

```bash
npm run db:generate
npm run db:migrate
npm run dev
```

Buka <http://localhost:3000>.

## Perintah penting

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build
npm run db:migrate # membuat/menerapkan migration development
```

Untuk environment non-development, terapkan migration yang sudah tersedia dengan `npx prisma migrate deploy`.

## Arsitektur

- `src/app` — route, layout, loading, dan error boundary.
- `src/features/transactions` — komponen, Server Actions, schema validasi, dan tipe transaksi.
- `src/lib/prisma.ts` — singleton Prisma Client.
- `prisma/schema.prisma` — model database.
- `prisma/migrations` — migration SQL yang dapat direview dan diterapkan.

Halaman dashboard adalah Server Component. Data dibaca langsung melalui Prisma, sedangkan dialog/form interaktif menjadi Client Components. Semua mutasi melewati Server Actions dan validasi Zod di server. Nominal disimpan sebagai `BIGINT` rupiah utuh dan dikonversi ke string saat melewati batas server-client agar tidak kehilangan presisi.

## Model transaksi

Setiap transaksi memiliki tipe `INCOME` atau `EXPENSE`, nominal positif, kategori, keterangan opsional, tanggal transaksi, serta timestamp pembuatan dan perubahan. Database juga memiliki check constraint yang menolak nominal nol atau negatif.
