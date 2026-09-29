import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, BellOff, AlertTriangle } from 'lucide-react';

interface SafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyGuideModal: React.FC<SafetyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 my-4 sm:my-8 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Tips Aman Berkomunitas Online</h2>
              <p className="text-xs text-slate-500">Panduan menjaga privasi dan keamanan di WhatsApp & Telegram</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Tutup panduan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[70vh] overflow-y-auto overscroll-contain text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Jangan Pernah Bagikan Kode OTP atau Password</h4>
              <p className="mt-0.5 text-slate-600 leading-relaxed text-xs">
                Admin grup resmi tidak akan pernah meminta kode verifikasi, password akun, atau link login Anda.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Waspada Modus Titip Dana & Skema Cepat Kaya</h4>
              <p className="mt-0.5 text-slate-600 leading-relaxed text-xs">
                Hindari tawaran investasi tak masuk akal, arisan bodong, robot trading tak berizin OJK, atau janji keuntungan pasti tanpa risiko.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <EyeOff className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Lindungi Data Pribadi (Privasi Akun)</h4>
              <p className="mt-0.5 text-slate-600 leading-relaxed text-xs">
                Di Telegram, sembunyikan nomor telepon Anda melalui menu Pengaturan Privasi & Keamanan (Who can see my phone number: Nobody).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <BellOff className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Gunakan Fitur Bisukan (Mute) Jika Terlalu Ramai</h4>
              <p className="mt-0.5 text-slate-600 leading-relaxed text-xs">
                Grup dengan ribuan anggota sering menghasilkan ratusan notifikasi per jam. Aktifkan mute agar tidak mengganggu aktivitas utama Anda.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors touch-manipulation min-h-[42px] sm:min-h-0 text-center"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
