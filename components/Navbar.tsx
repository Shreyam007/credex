import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Zap className="text-[#4F46E5] w-6 h-6 fill-[#4F46E5] transition-transform duration-300 group-hover:scale-110" />
          <span className="text-lg font-bold tracking-[-0.01em] text-slate-900">SpendShift</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-[#4F46E5] line-hover py-1">How it works</Link>
          <Link href="/pricing-data" className="text-sm font-medium text-slate-600 hover:text-[#4F46E5] line-hover py-1">Pricing Data</Link>
          <Link href="/security" className="text-sm font-medium text-slate-600 hover:text-[#4F46E5] line-hover py-1">Security</Link>
          <Link href="/#audit" className="ml-4">
            <button className="px-6 py-2.5 bg-[#4F46E5] text-white font-semibold rounded-full text-sm btn-hover shimmer shadow-[0_4px_14px_rgba(79,70,229,0.39)] transition-colors">
              Run Free Audit
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
