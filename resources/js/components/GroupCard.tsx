import React, { useState } from 'react';
import type { GroupItem } from '@/types';
import { PlatformBadge } from './PlatformBadge';
import { GroupAvatar } from './GroupAvatar';
import {
  Users,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Eye,
  Info,
  AlertTriangle
} from 'lucide-react';

interface GroupCardProps {
  group: GroupItem;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (group: GroupItem) => void;
  onOpenReport: (group: GroupItem) => void;
  onCopyLink: (link: string, name: string) => void;
  onTagClick: (tag: string) => void;
  onJoinClick: (group: GroupItem) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onOpenReport,
  onCopyLink,
  onTagClick,
  onJoinClick
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyLink(group.link, group.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinClick(group);
  };

  // Format members count (e.g. 14.250)
  const formattedMembers = new Intl.NumberFormat('id-ID').format(group.membersCount);

  // Activity badge styling
  const getActivityBadge = () => {
    if (group.activity === 'Sangat Aktif') {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500 animate-pulse',
        label: 'Sangat Aktif'
      };
    }
    if (group.activity === 'Aktif') {
      return {
        bg: 'bg-teal-50 text-teal-700 border-teal-200/80',
        dot: 'bg-teal-500',
        label: 'Aktif'
      };
    }
    return {
      bg: 'bg-slate-50 text-slate-600 border-slate-200',
      dot: 'bg-slate-400',
      label: 'Santai'
    };
  };

  const activityBadge = getActivityBadge();

  // =================== LIST VIEW MODE ===================
  if (viewMode === 'list') {
    return (
      <div
        id={`group-card-${group.id}`}
        className="group relative bg-white border border-slate-200/80 hover:border-slate-300/90 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:shadow-slate-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        {/* Left Section: Avatar + Content */}
        <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
          <div
            onClick={() => onOpenDetail(group)}
            className="cursor-pointer hover:opacity-95 transition-opacity shrink-0 relative group/avatar"
            title="Lihat detail grup"
          >
            <GroupAvatar
              name={group.name}
              imageUrl={group.imageUrl}
              platform={group.platform}
              categoryId={group.categoryId}
              size="md"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Badges Row */}
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <PlatformBadge platform={group.platform} size="sm" />

              {group.categoryName && (
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border bg-slate-50 border-slate-200 text-slate-700"
                >
                  {group.categoryName}
                </span>
              )}

              {group.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Terverifikasi
                </span>
              )}

              {group.reportedBroken && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Perlu Ditinjau
                </span>
              )}
            </div>

            {/* Title */}
            <div className="flex items-center gap-2">
              <h3
                onClick={() => onOpenDetail(group)}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 cursor-pointer transition-colors truncate"
              >
                {group.name}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {group.description}
            </p>

            {/* Tags & Metadata */}
            <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedMembers}</span>
                <span className="font-normal text-slate-500">Anggota</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${activityBadge.bg}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activityBadge.dot}`}></span>
                <span>{activityBadge.label}</span>
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Eye className="w-3.5 h-3.5" />
                {group.clicks} views
              </span>

              <div className="flex items-center gap-1 flex-wrap">
                {group.tags.slice(0, 3).map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions Section */}
        <div className="flex items-center gap-2 self-stretch sm:self-center justify-between sm:justify-end w-full sm:w-auto shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(group.id)}
              className={`p-2 rounded-xl border transition-all touch-manipulation ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
              title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors touch-manipulation"
              title="Salin Link Grup"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onOpenDetail(group)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors hidden md:inline-flex items-center gap-1.5 touch-manipulation"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              Detail
            </button>
          </div>

          <a
            href={group.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoin}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-xs active:scale-[0.98] touch-manipulation min-h-[40px] sm:min-h-0 ${
              group.platform === 'whatsapp'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
            }`}
          >
            <span>Gabung</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // =================== GRID VIEW MODE (MODERN CARD) ===================
  return (
    <div
      id={`group-card-${group.id}`}
      className="group bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 relative"
    >
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Card Header: Avatar, Name, Badges & Favorite */}
        <div className="flex items-start gap-3 sm:gap-3.5 mb-3.5">
          <div
            onClick={() => onOpenDetail(group)}
            className="cursor-pointer hover:opacity-95 transition-opacity shrink-0 group/avatar touch-manipulation"
            title="Lihat detail grup"
          >
            <GroupAvatar
              name={group.name}
              imageUrl={group.imageUrl}
              platform={group.platform}
              categoryId={group.categoryId}
              size="md"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Top row: Platform & Category badge + Favorite button */}
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <PlatformBadge platform={group.platform} size="sm" />
                {group.categoryName && (
                  <span
                    className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 border-slate-200 text-slate-700 truncate max-w-[120px] sm:max-w-[130px]"
                  >
                    {group.categoryName}
                  </span>
                )}
              </div>

              <button
                onClick={() => onToggleFavorite(group.id)}
                className={`p-1.5 rounded-lg border transition-all shrink-0 touch-manipulation ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50/50'
                }`}
                title={isFavorite ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Group Name & Verification */}
            <div className="flex items-start gap-1 min-w-0">
              <h3
                onClick={() => onOpenDetail(group)}
                className="text-base font-bold text-slate-900 group-hover:text-emerald-700 cursor-pointer transition-colors leading-snug line-clamp-1 truncate"
                title={group.name}
              >
                {group.name}
              </h3>
              {group.isVerified && (
                <span title="Grup Terverifikasi" className="inline-flex shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Group Description */}
        <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed mb-3.5 min-h-[36px]">
          {group.description}
        </p>

        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {group.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="text-[10px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2 py-0.5 rounded-md transition-colors touch-manipulation"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Metadata Strip: Member Count & Activity */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between text-xs text-slate-500 mb-3.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedMembers}</span>
            <span className="font-normal text-slate-500 text-[11px]">anggota</span>
          </div>

          <div
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${activityBadge.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activityBadge.dot}`}></span>
            <span>{activityBadge.label}</span>
          </div>
        </div>

        {/* Primary Action Buttons: Modern Dual CTA */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all active:scale-[0.98] min-h-[40px] touch-manipulation"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Link</span>
              </>
            )}
          </button>

          <a
            href={group.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoin}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-xs active:scale-[0.98] min-h-[40px] touch-manipulation ${
              group.platform === 'whatsapp'
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
            }`}
          >
            <span>Gabung</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Auxiliary Links: Aturan & Lapor */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2.5 mt-2.5 border-t border-slate-100/70">
          <button
            onClick={() => onOpenDetail(group)}
            className="hover:text-slate-700 flex items-center gap-1 transition-colors touch-manipulation py-1"
          >
            <Info className="w-3 h-3 text-slate-400" />
            <span>Lihat aturan</span>
          </button>

          <button
            onClick={() => onOpenReport(group)}
            className="hover:text-amber-600 flex items-center gap-1 transition-colors touch-manipulation py-1"
            title="Laporkan link rusak atau grup tidak aktif"
          >
            <AlertTriangle className="w-3 h-3 text-slate-400 hover:text-amber-500" />
            <span>Laporkan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
