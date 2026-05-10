import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-white">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
        Audit Not Found
      </h1>
      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
        This audit link may have expired or doesn't exist. Run a fresh audit to see your current savings potential.
      </p>
      <Link href="/">
        <button className="bg-[#4F46E5] text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all btn-hover shadow-lg shadow-indigo-100">
          Run Your Free Audit →
        </button>
      </Link>
    </div>
  );
}
