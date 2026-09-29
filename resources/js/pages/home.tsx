import { Head, router } from '@inertiajs/react';

import { useState, useEffect, useMemo } from 'react';
import type { GroupItem, Category, PlatformType, SortOption } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroSearch } from '@/components/HeroSearch';
import { FilterBar } from '@/components/FilterBar';
import { GroupCard } from '@/components/GroupCard';
import { GroupDetailModal } from '@/components/GroupDetailModal';
import { AddGroupModal } from '@/components/AddGroupModal';
import { ReportModal } from '@/components/ReportModal';
import { SafetyGuideModal } from '@/components/SafetyGuideModal';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import type { ToastMessage } from '@/components/Toast';
import {
  SearchX,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

const STORAGE_KEY_CUSTOM_GROUPS = 'gruplink_custom_groups_v1';
const STORAGE_KEY_FAVORITES = 'gruplink_favorites_v1';
const STORAGE_KEY_REPORTS = 'gruplink_reports_v1';

interface HomeProps {
  categories: Category[];
  groups: GroupItem[];
}

export default function Home({ categories: initialCategories, groups: initialGroups }: HomeProps) {
      // State: Groups (Database Groups + LocalStorage Custom Groups)
    const [groups, setGroups] = useState<GroupItem[]>(() => {
        try {
        const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_GROUPS);
        if (saved) {
            const parsed: GroupItem[] = JSON.parse(saved);
            return [...parsed, ...initialGroups];
        }
        } catch {
        // Fallback
        }
        return initialGroups;
    });

    // State: Categories from database
    const [categories] = useState<Category[]>(initialCategories);

    // State: Favorites
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
        const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
        return saved ? JSON.parse(saved) : [];
        } catch {
        return [];
        }
    });

    // State: Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [platformFilter, setPlatformFilter] = useState<PlatformType>('all');
    const [sortOption, setSortOption] = useState<SortOption>('popular');
    const [onlyVerified, setOnlyVerified] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // State: Modals
    const [activeDetailGroup, setActiveDetailGroup] = useState<GroupItem | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [reportGroup, setReportGroup] = useState<GroupItem | null>(null);
    const [isSafetyGuideOpen, setIsSafetyGuideOpen] = useState(false);

    // State: Toasts
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Add toast helper
    const addToast = (type: 'success' | 'info' | 'warning', text: string) => {
        const newToast: ToastMessage = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        text
        };
        setToasts((prev) => [...prev, newToast]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // Persist Favorites
    useEffect(() => {
        try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
        } catch {
        // ignore
        }
    }, [favorites]);

    // Toggle favorite handler
    const handleToggleFavorite = (groupId: string) => {
        const isFav = favorites.includes(groupId);
        if (isFav) {
        setFavorites((prev) => prev.filter((id) => id !== groupId));
        addToast('info', 'Dihapus dari daftar grup disimpan.');
        } else {
        setFavorites((prev) => [...prev, groupId]);
        addToast('success', 'Ditambahkan ke favorit!');
        }
    };

    // Copy Link Handler
    const handleCopyLink = (link: string, name: string) => {
        navigator.clipboard.writeText(link).then(
        () => {
            addToast('success', `Link "${name}" berhasil disalin ke clipboard!`);
        },
        () => {
            // Fallback
            addToast('info', 'Link siap disalin');
        }
        );
    };

    // Join click handler (updates views / clicks count)
    const handleJoinClick = (group: GroupItem) => {
        setGroups((prev) =>
        prev.map((g) => (g.id === group.id ? { ...g, clicks: g.clicks + 1 } : g))
        );
    };

    // Add new group handler
    const handleAddGroup = (newGroup: GroupItem) => {
        // Submit to backend using Inertia
        router.post('/groups', {
            name: newGroup.name,
            platform: newGroup.platform,
            link: newGroup.link,
            categoryId: newGroup.categoryId,
            imageUrl: newGroup.imageUrl,
            description: newGroup.description,
            membersCount: newGroup.membersCount,
            tags: newGroup.tags,
            rules: newGroup.rules,
            activity: newGroup.activity,
            language: newGroup.language,
            contactAdmin: newGroup.contactAdmin,
        }, {
            onSuccess: () => {
                // Visit homepage untuk reload data terbaru
                router.visit('/', {
                    onSuccess: () => {
                        addToast('success', `Grup "${newGroup.name}" berhasil dipublikasikan!`);
                        setSelectedCategory(newGroup.categoryId);
                    }
                });
            },
            onError: (errors) => {
                // Fallback ke localStorage jika gagal
                console.error('Failed to save to database, saving to localStorage', errors);
                try {
                    const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_GROUPS);
                    const customList: GroupItem[] = saved ? JSON.parse(saved) : [];
                    const updatedList = [newGroup, ...customList];
                    localStorage.setItem(STORAGE_KEY_CUSTOM_GROUPS, JSON.stringify(updatedList));
                    setGroups((prev) => [newGroup, ...prev]);
                    addToast('info', `Grup "${newGroup.name}" disimpan sementara di perangkat Anda`);
                } catch {
                    addToast('warning', 'Gagal menyimpan grup');
                }
            }
        });
    };

    // Report submit handler
    const handleSubmitReport = (groupId: string, reason: string) => {
        try {
        const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
        const reports = saved ? JSON.parse(saved) : [];
        reports.push({ groupId, reason, date: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
        } catch {
        // ignore
        }

        // Mark group as reported in state
        setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, reportedBroken: true } : g))
        );
        addToast('info', 'Laporan berhasil terkirim. Terima kasih atas bantuan Anda!');
    };

    // Reset Filters
    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setPlatformFilter('all');
        setOnlyVerified(false);
        setShowFavoritesOnly(false);
        setSortOption('popular');
    };

    const isFiltered =
        Boolean(searchQuery) ||
        selectedCategory !== 'all' ||
        platformFilter !== 'all' ||
        onlyVerified ||
        showFavoritesOnly;

    // Calculate Category Counts
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: groups.length };

        // Initialize all categories with 0
        categories.forEach((c) => {
        if (c.id !== 'all') counts[c.id] = 0;
        });

        groups.forEach((g) => {
        // If platform filter is active, only count matching
        if (platformFilter === 'all' || g.platform === platformFilter) {
            counts[g.categoryId] = (counts[g.categoryId] || 0) + 1;
        }
        });

        // Calculate total for 'all' based on platform filter
        if (platformFilter !== 'all') {
        counts.all = groups.filter((g) => g.platform === platformFilter).length;
        }

        return counts;
    }, [groups, platformFilter, categories]);

    // Filtered & Sorted Groups
    const filteredGroups = useMemo(() => {
        let result = [...groups];

        // 1. Search Query (matches name, description, tags, categoryName, rules)
        if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        result = result.filter((g) => {
            const nameMatch = g.name.toLowerCase().includes(q);
            const descMatch = g.description.toLowerCase().includes(q);
            const tagMatch = g.tags.some((t) => t.toLowerCase().includes(q));
            const categoryMatch = g.categoryId.toLowerCase().includes(q);
            const rulesMatch = g.rules?.some((r) => r.toLowerCase().includes(q)) ?? false;
            return nameMatch || descMatch || tagMatch || categoryMatch || rulesMatch;
        });
        }

        // 2. Category Filter
        if (selectedCategory !== 'all') {
        result = result.filter((g) => g.categoryId === selectedCategory);
        }

        // 3. Platform Filter
        if (platformFilter !== 'all') {
        result = result.filter((g) => g.platform === platformFilter);
        }

        // 4. Verified Only
        if (onlyVerified) {
        result = result.filter((g) => g.isVerified);
        }

        // 5. Favorites Only
        if (showFavoritesOnly) {
        result = result.filter((g) => favorites.includes(g.id));
        }

        // 6. Sorting
        result.sort((a, b) => {
        if (sortOption === 'popular') {
            return b.clicks - a.clicks;
        }
        if (sortOption === 'members') {
            return b.membersCount - a.membersCount;
        }
        if (sortOption === 'newest') {
            return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        }
        if (sortOption === 'verified') {
            if (a.isVerified === b.isVerified) {
            return b.membersCount - a.membersCount;
            }
            return a.isVerified ? -1 : 1;
        }
        return 0;
        });

        return result;
    }, [
        groups,
        searchQuery,
        selectedCategory,
        platformFilter,
        onlyVerified,
        showFavoritesOnly,
        sortOption,
        favorites
    ]);

    // Summary Metrics
    const totalMembersCalculated = useMemo(() => {
        return groups.reduce((acc, curr) => acc + curr.membersCount, 0);
    }, [groups]);

    const formattedTotalMembers = new Intl.NumberFormat('id-ID').format(totalMembersCalculated);

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-800">
      
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Sticky Header Navbar */}
      <Navbar
        platformFilter={platformFilter}
        onPlatformChange={(p) => setPlatformFilter(p)}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        totalGroupsCount={groups.length}
        onOpenSafetyGuide={() => setIsSafetyGuideOpen(true)}
      />

      {/* Hero Header & Search Section */}
      <HeroSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={(catId) => setSelectedCategory(catId)}
        categoryCounts={categoryCounts}
        totalResultsCount={filteredGroups.length}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
        categories={categories}
      />

      {/* Filter & Sort Controls Bar */}
      <FilterBar
        platformFilter={platformFilter}
        onPlatformChange={(p) => setPlatformFilter(p)}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onlyVerified={onlyVerified}
        onToggleVerified={() => setOnlyVerified(!onlyVerified)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        totalResults={filteredGroups.length}
        isFiltered={isFiltered}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Active Filter Indicators / Breadcrumb */}
        {isFiltered && (
          <div className="mb-6 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-medium">Filter Aktif:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                Pencarian: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                Kategori: {categories.find((c) => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}

            {platformFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium capitalize">
                Platform: {platformFilter}
                <button
                  onClick={() => setPlatformFilter('all')}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}

            {onlyVerified && (
              <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-emerald-700 font-medium">
                Hanya Terverifikasi
                <button
                  onClick={() => setOnlyVerified(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}

            {showFavoritesOnly && (
              <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-rose-700 font-medium">
                Hanya Favorit
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 ml-1 underline"
            >
              Hapus Semua
            </button>
          </div>
        )}

        {/* Groups Results List or Empty State */}
        {filteredGroups.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'space-y-3.5'
            }
          >
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                viewMode={viewMode}
                isFavorite={favorites.includes(group.id)}
                onToggleFavorite={handleToggleFavorite}
                onOpenDetail={setActiveDetailGroup}
                onOpenReport={setReportGroup}
                onCopyLink={handleCopyLink}
                onTagClick={(tag) => setSearchQuery(tag)}
                onJoinClick={handleJoinClick}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/90 shadow-xs max-w-xl mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Tidak ada grup yang sesuai
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
              Kami tidak dapat menemukan grup dengan kata kunci atau filter yang Anda pilih. Coba gunakan istilah umum atau reset filter.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Semua Filter</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <span>Daftarkan Grup Ini</span>
              </button>
            </div>
          </div>
        )}

        {/* Community Highlights & Call to Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none hidden md:block"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Punya Komunitas atau Channel Sendiri?</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Tambahkan Link Komunitas Anda Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Jangkau ribuan calon anggota baru yang memiliki minat yang sama secara gratis dan mudah di direktori GrupLink.id.
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="shrink-0 w-full sm:w-auto justify-center px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 touch-manipulation min-h-[44px]"
            >
              <span>+ Daftarkan Grup Sekarang</span>
            </button>
          </div>

          {/* Quick Stats Counter in Banner */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
            <div>
              <p className="text-[11px] font-medium text-slate-400">Total Komunitas</p>
              <p className="text-lg sm:text-xl font-bold text-white mt-0.5">{groups.length}+ Grup</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">Estimasi Anggota</p>
              <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5">{formattedTotalMembers}+</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] font-medium text-slate-400">Platform Didukung</p>
              <p className="text-lg sm:text-xl font-bold text-sky-400 mt-0.5">WhatsApp & Telegram</p>
            </div>
          </div>
        </div>

      </main>

      {/* Modals */}
      <GroupDetailModal
        group={activeDetailGroup}
        onClose={() => setActiveDetailGroup(null)}
        isFavorite={activeDetailGroup ? favorites.includes(activeDetailGroup.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onCopyLink={handleCopyLink}
        onOpenReport={(g) => {
          setActiveDetailGroup(null);
          setReportGroup(g);
        }}
        onJoinClick={handleJoinClick}
      />

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGroup={handleAddGroup}
        categories={categories}
      />

      <ReportModal
        group={reportGroup}
        onClose={() => setReportGroup(null)}
        onSubmitReport={handleSubmitReport}
      />

      <SafetyGuideModal
        isOpen={isSafetyGuideOpen}
        onClose={() => setIsSafetyGuideOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(id) => setSelectedCategory(id)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenSafetyGuide={() => setIsSafetyGuideOpen(true)}
        categories={categories}
      />

    </div>
        </>
    );
}
