import React, { useState } from 'react';
import type { GroupItem } from '@/types';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  group: GroupItem | null;
  onClose: () => void;
  onSubmitReport: (groupId: string, reason: string) => void;
}

const REPORT_REASONS = [
  'Link tautan kedaluwarsa (Expired link)',
  'Grup sudah penuh / tidak dapat menerima member baru',
  'Grup terindikasi penipuan / spam / phishing / judi online',
  'Grup membagikan konten pornografi atau SARA',
  'Kategori atau deskripsi tidak sesuai dengan isi grup',
  'Lainnya'
];

export const ReportModal: React.FC<ReportModalProps> = ({
  group,
  onClose,
  onSubmitReport
}) => {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!group) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(group.id, `${selectedReason} - ${note}`);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 my-4 sm:my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Laporkan Link Komunitas</h2>
              <p className="text-xs text-slate-500 truncate max-w-[180px] sm:max-w-[200px]">{group.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Terima Kasih!</h3>
            <p className="text-xs text-slate-600">
              Laporan Anda telah dicatat. Kami akan segera memverifikasi tautan ini untuk kenyamanan seluruh pengguna.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto overscroll-contain">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Alasan Pelaporan:
              </label>
              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors touch-manipulation ${
                      selectedReason === reason
                        ? 'bg-amber-50/80 border-amber-300 text-slate-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="report-reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="report-note" className="block text-xs font-bold text-slate-700 mb-1">
                Catatan Tambahan (Opsional):
              </label>
              <textarea
                id="report-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Berikan detail tambahan..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-[16px] sm:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors touch-manipulation text-center min-h-[40px] sm:min-h-0"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs touch-manipulation text-center min-h-[42px] sm:min-h-0"
              >
                Kirim Laporan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
