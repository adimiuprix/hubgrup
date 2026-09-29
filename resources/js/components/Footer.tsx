import React from 'react';
import { MessageSquare, Shield } from 'lucide-react';
import type { Category } from '@/types';

interface FooterProps {
  onSelectCategory: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenSafetyGuide: () => void;
  categories: Category[];
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAddModal,
  onOpenSafetyGuide,
  categories
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                GrupLink<span className="text-emerald-400">.id</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Direktori terpusat untuk menemukan link grup WhatsApp dan channel Telegram terbaik di Indonesia dengan kategori terorganisir dan pencarian instan.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300 font-medium text-[11px]">Database Komunitas Terbuka</span>
            </div>
          </div>

          {/* Col 2: Kategori Populer */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Kategori Terpopuler
            </h3>
            <ul className="space-y-2">
              {categories.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="hover:text-emerald-400 transition-colors text-left touch-manipulation py-1"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigasi & Layanan */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Navigasi Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAddModal}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 touch-manipulation py-1"
                >
                  <span>Daftarkan Link Grup</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">Gratis</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSafetyGuide}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 touch-manipulation py-1"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Tips Keamanan Komunitas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors touch-manipulation py-1"
                >
                  Semua Grup & Channel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Disclaimer & Catatan Hukum */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              Pernyataan Tanggung Jawab
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              GrupLink.id adalah direktori independen berbasis komunitas. WhatsApp dan Telegram adalah merek dagang dari pemiliknya masing-masing. Seluruh konten dalam grup berada di bawah tanggung jawab admin dan anggota grup terkait.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} GrupLink.id — Direktori Komunitas Indonesia.</p>
          <p className="flex items-center gap-1">
            Dibuat untuk mempererat koneksi & kolaborasi anak bangsa
          </p>
        </div>
      </div>
    </footer>
  );
};
