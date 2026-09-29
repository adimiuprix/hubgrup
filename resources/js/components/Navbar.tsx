import React from 'react';
import type { PlatformType } from '@/types';
import { Plus, Heart, MessageSquare, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  platformFilter: PlatformType;
  onPlatformChange: (platform: PlatformType) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenAddModal: () => void;
  totalGroupsCount: number;
  onOpenSafetyGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  platformFilter,
  onPlatformChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenAddModal,
  totalGroupsCount,
  onOpenSafetyGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight text-slate-900">
                  Hubgrup<span className="text-emerald-600">.site</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                  {totalGroupsCount}+ Link Aktif
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 font-medium">
                Kumpulan Link Grup WhatsApp & Telegram Terkurasi
              </p>
            </div>
          </div>

          {/* Quick Platform Switcher (Center) */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200/70">
            <button
              id="platform-btn-all"
              onClick={() => onPlatformChange('all')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Semua Platform</span>
            </button>

            <button
              id="platform-btn-wa"
              onClick={() => onPlatformChange('whatsapp')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>WhatsApp</span>
            </button>

            <button
              id="platform-btn-tg"
              onClick={() => onPlatformChange('telegram')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                platformFilter === 'telegram'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>Telegram</span>
            </button>
          </div>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Safety Tips Link */}
            <button
              id="safety-guide-btn"
              onClick={onOpenSafetyGuide}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
              title="Panduan Keamanan Komunitas"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tips Aman</span>
            </button>

            {/* Bookmarks / Favorites Toggle */}
            <button
              id="favorites-toggle-btn"
              onClick={onToggleFavoritesOnly}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all touch-manipulation ${
                showFavoritesOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Lihat Grup Favorit Tersimpan"
            >
              <Heart
                className={`w-4 h-4 ${
                  showFavoritesOnly || favoritesCount > 0
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-400'
                }`}
              />
              <span className="hidden sm:inline">Disimpan</span>
              {favoritesCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Submit Group Button */}
            <button
              id="add-group-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm shadow-slate-900/10 whitespace-nowrap touch-manipulation"
            >
              <Plus className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tambah Grup</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
