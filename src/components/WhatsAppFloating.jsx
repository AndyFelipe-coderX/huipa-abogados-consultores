import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FIRM_INFO } from '../data/legalAreas';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2 pointer-events-auto">
      
      {/* Tooltip message */}
      {showTooltip && (
        <div className="relative max-w-xs p-3 rounded-2xl bg-[#0f172a] text-slate-200 border border-[#c5a880]/40 shadow-2xl text-xs flex items-start gap-2 animate-bounce">
          <div>
            <p className="font-bold text-white text-[11px] uppercase tracking-wide text-[#c5a880]">
              Asistencia Inmediata
            </p>
            <p className="mt-0.5 text-slate-300">
              ¿Tiene una consulta o urgencia legal? Escríbanos directamente por WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Huipa Abogados, requiero asistencia legal para persona natural.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8 group-hover:scale-105 transition-transform" />
      </a>
    </div>
  );
}
