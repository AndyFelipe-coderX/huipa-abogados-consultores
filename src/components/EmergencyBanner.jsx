import React from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, MessageCircle } from 'lucide-react';
import { FIRM_INFO } from '../data/legalAreas';

export default function EmergencyBanner() {
  return (
    <section className="bg-gradient-to-r from-red-950/40 via-amber-950/20 to-slate-900 border-y border-amber-600/30 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Urgencia Penal Inmediata
                </span>
                <span className="text-xs text-slate-400">Atención 24 Horas</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-legal mt-1">
                ¿Tiene un familiar detenido o una citación urgente?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                No rinda declaración sin la presencia de su abogado defensor. Los primeros momentos de una investigación o detención determinan el rumbo de su libertad.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
            <a
              href={`tel:${FIRM_INFO.phone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-750 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Llamar: {FIRM_INFO.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('URGENCIA: Tengo una detención penal / intervención policial en curso y requiero un abogado defensor de inmediato.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>WhatsApp de Emergencia</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
