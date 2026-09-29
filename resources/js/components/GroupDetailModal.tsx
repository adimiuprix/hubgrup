import React, { useState } from 'react';
import type { GroupItem } from '@/types';
import { PlatformBadge } from './PlatformBadge';
import { GroupAvatar } from './GroupAvatar';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  Users,
  CheckCircle2,
  Calendar,
  Globe,
  Share2,
  AlertTriangle,
  Heart,
  FileText,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface GroupDetailModalProps {
  group: GroupItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyLink: (link: string, name: string) => void;
  onOpenReport: (group: GroupItem) => void;
  onJoinClick: (group: GroupItem) => void;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  group,
  onClose,
  isFavorite,
  onToggleFavorite,
  onCopyLink,
  onOpenReport,
  onJoinClick
}) => {
  const [copied, setCopied] = useState(false);

  if (!group) return null;

  const formattedMembers = new Intl.NumberFormat('id-ID').format(group.membersCount);

  const handleCopy = () => {
    onCopyLink(group.link, group.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    onJoinClick(group);
  };

  const shareText = encodeURIComponent(
    `Yuk gabung ke grup "${group.name}" di ${group.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}: ${group.link}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 my-4 sm:my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-4 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <GroupAvatar
                name={group.name}
                imageUrl={group.imageUrl}
                platform={group.platform}
                categoryId={group.categoryId}
                size="lg"
                className="shrink-0 mt-0.5"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1.5 sm:mb-2">
                  <PlatformBadge platform={group.platform} size="md" />

                  {group.categoryName && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-slate-50 border-slate-200 text-slate-700">
                      {group.categoryName}
                    </span>
                  )}

                  {group.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Terverifikasi
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug break-words">
                  {group.name}
                </h2>
              </div>
            </div>

            {/* Close button */}
            <button
              id="close-detail-modal-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 space-y-5 sm:space-y-6 max-h-[72vh] sm:max-h-[70vh] overflow-y-auto overscroll-contain">
          
          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center sm:text-left">
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Anggota</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-slate-600" />
                <span className="text-sm sm:text-base font-bold text-slate-900">{formattedMembers}</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Aktivitas</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">{group.activity}</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Bahasa</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 truncate">{group.language}</span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Terdaftar</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-slate-900">{group.addedAt}</span>
              </div>
            </div>
          </div>

          {/* Group Invite Link Box */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-semibold text-emerald-400">Link Undangan Resmi:</span>
              <span className="text-[11px] text-slate-400">Tautan langsung</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
              <p className="flex-1 text-xs sm:text-sm font-mono text-emerald-300 truncate px-2 select-all">
                {group.link}
              </p>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Deskripsi Komunitas
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {group.description}
            </p>
          </div>

          {/* Rules & Guidelines */}
          {group.rules && group.rules.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Tata Tertib & Aturan Grup
              </h3>
              <ul className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {group.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Topik Pembahasan
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Safety Reminder Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-bold">Tips Aman Berkomunitas Online:</p>
              <p className="mt-0.5 text-amber-800">
                Jangan pernah membagikan password, kode OTP, atau transfer dana kepada orang yang baru dikenal di dalam grup. Laporkan akun yang mencurigakan.
              </p>
            </div>
          </div>

          {/* Quick Share to Socials */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              Bagikan Link Grup Ini
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                Kirim via WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(group.link)}&text=${encodeURIComponent(`Grup: ${group.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors"
              >
                Kirim via Telegram
              </a>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/60 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(group.id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all touch-manipulation min-h-[40px] sm:min-h-0 ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              <span>{isFavorite ? 'Tersimpan di Favorit' : 'Simpan Favorit'}</span>
            </button>

            <button
              onClick={() => onOpenReport(group)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all touch-manipulation min-h-[40px] sm:min-h-0"
            >
              Laporkan Link
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors touch-manipulation min-h-[42px] sm:min-h-0"
            >
              Tutup
            </button>

            <a
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoin}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md active:scale-[0.98] touch-manipulation min-h-[42px] sm:min-h-0 ${
                group.platform === 'whatsapp'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
              }`}
            >
              <span>Buka & Gabung Grup</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
