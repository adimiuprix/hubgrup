import React from 'react';
import type { PlatformType, SortOption } from '@/types';
import {
  ArrowUpDown,
  LayoutGrid,
  List,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

interface FilterBarProps {
  platformFilter: PlatformType;
  onPlatformChange: (platform: PlatformType) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyVerified: boolean;
  onToggleVerified: () => void;
  viewMode: 'grid' | 'list';
  onToggleViewMode: (mode: 'grid' | 'list') => void;
  totalResults: number;
  isFiltered: boolean;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  platformFilter,
  onPlatformChange,
  sortOption,
  onSortChange,
  onlyVerified,
  onToggleVerified,
  viewMode,
  onToggleViewMode,
  totalResults,
  isFiltered,
  onResetFilters
}) => {
  return (
    <div className="bg-white border-y border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Result Count & Platform filter (mobile visible) */}
        <div className="flex items-center justify-between md:justify-start gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              Menampilkan <span className="text-emerald-600 font-extrabold">{totalResults}</span> grup
            </span>
          </div>

          {/* Platform Pills for Mobile */}
          <div className="flex lg:hidden items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onPlatformChange('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold touch-manipulation transition-all ${
                platformFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => onPlatformChange('whatsapp')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold touch-manipulation transition-all ${
                platformFilter === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              WA
            </button>
            <button
              onClick={() => onPlatformChange('telegram')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold touch-manipulation transition-all ${
                platformFilter === 'telegram'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              TG
            </button>
          </div>
        </div>

        {/* Right: Controls (Sorting, Verified Only, View Toggle) */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-between sm:justify-end w-full md:w-auto">
          
          {/* Only Verified Toggle */}
          <button
            id="verified-only-btn"
            onClick={onToggleVerified}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all touch-manipulation ${
              onlyVerified
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 shrink-0 ${onlyVerified ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`}
            />
            <span className="whitespace-nowrap">Terverifikasi Saja</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <label htmlFor="sort-select" className="sr-only">Urutkan</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1 text-[16px] sm:text-xs touch-manipulation"
            >
              <option value="popular">Paling Populer</option>
              <option value="members">Anggota Terbanyak</option>
              <option value="newest">Baru Ditambahkan</option>
              <option value="verified">Prioritas Terverifikasi</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid vs List) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              id="view-grid-btn"
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all touch-manipulation ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tampilan Kotak"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-list-btn"
              onClick={() => onToggleViewMode('list')}
              className={`p-1.5 rounded-lg transition-all touch-manipulation ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Tampilan Daftar"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Filter Button if active */}
          {isFiltered && (
            <button
              id="reset-filter-inline-btn"
              onClick={onResetFilters}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors touch-manipulation"
              title="Reset semua filter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
