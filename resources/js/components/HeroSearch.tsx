import React, { useRef, useEffect, useState } from 'react';
import { Search, X, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '@/types';
import { CategoryIcon } from './CategoryIcon';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  categoryCounts: Record<string, number>;
  totalResultsCount: number;
  isFiltered: boolean;
  onResetFilters: () => void;
  categories: Category[];
}

const POPULAR_TAGS = [
  'koding',
  'loker',
  'beasiswa',
  'saham',
  'crypto',
  'mabar',
  'uiux',
  'freelance',
  'anime',
  'jakarta'
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categoryCounts,
  isFiltered,
  onResetFilters,
  categories
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!categoryScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!categoryScrollRef.current) return;
    const offset = direction === 'left' ? -220 : 220;
    categoryScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 200);
  };

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative pt-6 pb-6 md:pt-10 md:pb-8 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kumpulan Grup & Komunitas Terverifikasi 2025</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Temukan Komunitas & Jaringan Baru Anda
          </h1>

          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eksplorasi ribuan link grup aktif WhatsApp dan channel Telegram untuk belajar, berkarir, berbisnis, dan menyalurkan hobi.
          </p>
        </div>

        {/* Slim & Proportional Search Bar */}
        <div className="max-w-xl mx-auto mb-4">
          <div className="relative flex items-center bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl shadow-xs hover:shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/15 focus-within:shadow-sm transition-all">
            <div className="pl-3.5 sm:pl-4 pr-1 pointer-events-none text-slate-400">
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
            </div>

            <input
              ref={searchInputRef}
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari grup, topik, atau kata kunci (python, loker, crypto)..."
              className="w-full py-2.5 sm:py-3 pr-10 pl-2 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none touch-manipulation"
            />

            {/* Clear Button or Shortcut Hint */}
            <div className="pr-2.5 sm:pr-3 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  id="clear-search-btn"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100/90 rounded border border-slate-200/80">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-2.5 flex items-center flex-wrap gap-1.5 justify-center text-[11px]">
            <span className="text-slate-400 font-medium mr-0.5 hidden sm:inline">Paling Dicari:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                id={`tag-btn-${tag}`}
                onClick={() => onSearchChange(tag)}
                className={`px-2.5 py-0.5 rounded-full border transition-all text-[11px] font-medium ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Streamlined & Proportional Category Filter Tabs */}
        <div className="mt-6 sm:mt-7 pt-4 border-t border-slate-200/60">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Pilih Kategori Komunitas
              </h2>
              <span className="text-[11px] font-semibold text-slate-400">
                ({categories.length})
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {isFiltered && (
                <button
                  id="reset-filter-top-btn"
                  onClick={onResetFilters}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  Reset Filter
                </button>
              )}

              {/* Desktop Horizontal Scroll Buttons */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollCategories('left')}
                  disabled={!canScrollLeft}
                  className={`p-1 rounded-md border transition-all ${
                    canScrollLeft
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer'
                      : 'border-transparent text-slate-300 opacity-40 cursor-default'
                  }`}
                  aria-label="Geser kategori ke kiri"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCategories('right')}
                  disabled={!canScrollRight}
                  className={`p-1 rounded-md border transition-all ${
                    canScrollRight
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer'
                      : 'border-transparent text-slate-300 opacity-40 cursor-default'
                  }`}
                  aria-label="Geser kategori ke kanan"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Slim Horizontal Tabs Bar */}
          <div className="relative">
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10 hidden sm:block" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10 hidden sm:block" />
            )}

            <div
              ref={categoryScrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scroll-smooth focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;

                return (
                  <button
                    key={cat.id}
                    id={`cat-btn-${cat.id}`}
                    onClick={() => onCategorySelect(cat.id)}
                    className={`group shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.98] touch-manipulation ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/90 hover:text-slate-900'
                    }`}
                  >
                    <CategoryIcon
                      name={cat.icon}
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="leading-none">{cat.name}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/70 group-hover:text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
