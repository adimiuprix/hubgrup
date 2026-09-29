import React, { useState, useRef } from 'react';
import type { GroupItem, ActivityLevel, Category } from '@/types';
import { useForm } from '@inertiajs/react';
import { GroupAvatar } from './GroupAvatar';
import {
  X,
  Plus,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGroup: (newGroup: GroupItem) => void;
  categories: Category[];
}

const PRESET_AVATARS = [
  {
    name: 'Koding / Tech',
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Karir & Kantor',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Edukasi / Buku',
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Saham & Finansial',
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Gaming & Mabar',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Desain Kreatif',
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Pop Culture & Anime',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=240&h=240&q=80'
  },
  {
    name: 'Travel & Wisata',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=240&h=240&q=80'
  }
];

export const AddGroupModal: React.FC<AddGroupModalProps> = ({
  isOpen,
  onClose,
  onAddGroup,
  categories
}) => {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<'whatsapp' | 'telegram'>('whatsapp');
  const [link, setLink] = useState('');
  const [categoryId, setCategoryId] = useState('tech');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [membersCount, setMembersCount] = useState<number>(0);
  const [activity, setActivity] = useState<ActivityLevel>('Aktif');
  const [tagsInput, setTagsInput] = useState('');
  const [rulesInput, setRulesInput] = useState('');
  const [contactAdmin, setContactAdmin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Mohon pilih file gambar yang valid (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran file gambar maksimal 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setImageUrl(result);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Mohon masukkan nama grup');
      return;
    }

    if (!link.trim()) {
      setError('Mohon masukkan link undangan grup');
      return;
    }

    // Validate link format
    const trimmedLink = link.trim();
    if (platform === 'whatsapp') {
      if (!trimmedLink.includes('whatsapp.com') && !trimmedLink.startsWith('https://')) {
        setError('Format link WhatsApp tidak valid. Gunakan format seperti https://chat.whatsapp.com/...');
        return;
      }
    } else {
      if (!trimmedLink.includes('t.me') && !trimmedLink.startsWith('https://')) {
        setError('Format link Telegram tidak valid. Gunakan format seperti https://t.me/...');
        return;
      }
    }

    if (!description.trim() || description.length < 15) {
      setError('Mohon tulis deskripsi grup minimal 15 karakter agar mudah dipahami calon member');
      return;
    }

    // Process tags
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    if (tags.length === 0) {
      tags.push(platform, categoryId);
    }

    // Process rules
    const rules = rulesInput
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const newGroup: GroupItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      platform,
      link: trimmedLink.startsWith('http') ? trimmedLink : `https://${trimmedLink}`,
      categoryId,
      imageUrl: imageUrl.trim() || undefined,
      description: description.trim(),
      membersCount: Number(membersCount) || 100,
      isVerified: false,
      tags,
      rules: rules.length > 0 ? rules : ['Saling menghargai sesama anggota', 'Dilarang spam atau konten negatif'],
      activity,
      language: 'Bahasa Indonesia',
      addedAt: new Date().toISOString().split('T')[0],
      clicks: 1,
      isCustom: true,
      contactAdmin: contactAdmin.trim() || undefined
    };

    onAddGroup(newGroup);
    onClose();

    // Reset Form
    setName('');
    setLink('');
    setImageUrl('');
    setDescription('');
    setTagsInput('');
    setRulesInput('');
    setContactAdmin('');
    setError(null);
  };

  const selectableCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 my-4 sm:my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Tambah Link Komunitas</h2>
              <p className="text-xs text-slate-500">
                Publikasikan grup WhatsApp atau channel Telegram Anda secara gratis
              </p>
            </div>
          </div>

          <button
            id="close-add-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-7 space-y-4 max-h-[72vh] overflow-y-auto overscroll-contain">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Platform Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Pilih Platform Grup
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="select-wa-platform"
                onClick={() => setPlatform('whatsapp')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                  platform === 'whatsapp'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>WhatsApp Group</span>
              </button>

              <button
                type="button"
                id="select-tg-platform"
                onClick={() => setPlatform('telegram')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all touch-manipulation ${
                  platform === 'telegram'
                    ? 'bg-sky-50 text-sky-800 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Telegram Channel / Group</span>
              </button>
            </div>
          </div>

          {/* Nama Grup */}
          <div>
            <label htmlFor="group-name" className="block text-xs font-bold text-slate-700 mb-1">
              Nama Grup / Channel <span className="text-rose-500">*</span>
            </label>
            <input
              id="group-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Belajar Pemrograman Python Indonesia"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          {/* Picture / Avatar Selection Section */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Foto / Gambar Profil Grup</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">Opsional</span>
            </div>

            {/* Live Preview + Input Controls */}
            <div className="flex items-center gap-3.5">
              <GroupAvatar
                name={name || 'Grup Anda'}
                imageUrl={imageUrl}
                platform={platform}
                categoryId={categoryId}
                size="lg"
              />

              <div className="flex-1 min-w-0 space-y-2">
                <div className="relative">
                  <input
                    id="group-image-url"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Tempel URL gambar (https://...)"
                    className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload-input"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <Upload className="w-3 h-3 text-slate-500" />
                    <span>Upload Foto</span>
                  </button>
                  <span className="text-[11px] text-slate-400">Atau pilih preset di bawah:</span>
                </div>
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="pt-1">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      imageUrl === preset.url
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105 shadow-xs'
                        : 'border-transparent hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                    title={preset.name}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Link Undangan */}
          <div>
            <label htmlFor="group-link" className="block text-xs font-bold text-slate-700 mb-1">
              Link Undangan (Invite Link) <span className="text-rose-500">*</span>
            </label>
            <input
              id="group-link"
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={
                platform === 'whatsapp'
                  ? 'https://chat.whatsapp.com/invite/xxxx...'
                  : 'https://t.me/nama_channel'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-mono"
            />
          </div>

          {/* Kategori & Perkiraan Anggota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="group-category" className="block text-xs font-bold text-slate-700 mb-1">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                id="group-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 cursor-pointer touch-manipulation"
              >
                {selectableCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="group-members" className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Anggota (Perkiraan)
              </label>
              <input
                id="group-members"
                type="number"
                min="1"
                max="500000"
                value={membersCount}
                onChange={(e) => setMembersCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Tingkat Aktivitas */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tingkat Aktivitas Diskusi
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Sangat Aktif', 'Aktif', 'Santai'] as ActivityLevel[]).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setActivity(lvl)}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all touch-manipulation min-h-[40px] sm:min-h-0 ${
                    activity === lvl
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="group-desc" className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat Komunitas <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="group-desc"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan mengenai tujuan grup, siapa saja yang cocok bergabung, topik yang dibahas..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 leading-relaxed"
            />
          </div>

          {/* Tagar */}
          <div>
            <label htmlFor="group-tags" className="block text-xs font-bold text-slate-700 mb-1">
              Tag / Kata Kunci (Pisahkan dengan koma)
            </label>
            <input
              id="group-tags"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Contoh: python, coding, machinelearning, loker"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          {/* Aturan Grup */}
          <div>
            <label htmlFor="group-rules" className="block text-xs font-bold text-slate-700 mb-1">
              Tata Tertib Singkat (Satu aturan per baris)
            </label>
            <textarea
              id="group-rules"
              rows={2}
              value={rulesInput}
              onChange={(e) => setRulesInput(e.target.value)}
              placeholder="1. Sopan dan santun&#10;2. Dilarang spam iklan judi/pinjol"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          {/* Admin Contact */}
          <div>
            <label htmlFor="group-admin" className="block text-xs font-bold text-slate-700 mb-1">
              Kontak Admin / Penanggung Jawab (Opsional)
            </label>
            <input
              id="group-admin"
              type="text"
              value={contactAdmin}
              onChange={(e) => setContactAdmin(e.target.value)}
              placeholder="@username_telegram atau +6281234..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Link yang Anda tambahkan akan langsung tampil dan tersimpan di perangkat Anda.</span>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 transition-colors touch-manipulation min-h-[42px] sm:min-h-0 text-center"
            >
              Batal
            </button>
            <button
              id="submit-new-group-btn"
              type="submit"
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md shadow-slate-900/10 touch-manipulation min-h-[44px] sm:min-h-0"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Simpan & Publikasikan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
