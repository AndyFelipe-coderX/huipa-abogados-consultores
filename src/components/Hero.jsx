import React from 'react';
import { Shield, PhoneCall, MessageSquare, CheckCircle2, ChevronRight, Scale, Award, Clock } from 'lucide-react';
import { FIRM_INFO } from '../data/legalAreas';

export default function Hero({ onOpenContact }) {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#080d19] via-[#0b1324] to-[#0d1629]">
      
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#c5a880]/30 to-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Focus Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#e5c07b]">
                Atención Exclusiva a Personas Naturales
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-legal tracking-tight leading-[1.15]">
              Tu Libertad, tus Derechos y tu Tranquilidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#eedbbd] to-[#c5a880]">Defendidos con Firmeza</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
              En <strong className="text-white font-semibold">Huipa Abogados y Consultores</strong> creemos en la defensa cercana, humana e implacable del ciudadano de a pie. Asumimos con maestría estratégica su defensa en <span className="text-slate-100 font-medium">Derecho Penal, Policial, Sancionador Administrativo, Constitucional, Civil y Laboral</span>.
            </p>

            {/* Key Assurance Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Patrocinio directo por abogados litigantes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Atención inmediata en detenciones y urgencias</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Especialistas en Inspectoría y régimen PNP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>Honorarios justos, transparentes y pactados</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#c5a880] via-[#dfc49e] to-[#c5a880] hover:shadow-xl hover:shadow-[#c5a880]/25 transition-all duration-300 active:scale-98 cursor-pointer group"
              >
                <span>Solicitar Consulta Inmediata</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Huipa Abogados, requiero asistencia legal de emergencia para persona natural.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 transition-all duration-300 shadow-lg"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Emergencias Penales 24/7</span>
              </a>
            </div>

          </div>

          {/* Right Card / Seal of Distinction */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-[#c5a880]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-legal">Huipa & Asociados</h3>
                    <p className="text-xs text-[#c5a880] font-medium">Despacho Jurídico</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Activo
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                    <Award className="w-4 h-4 text-[#c5a880]" />
                    <span>Enfoque en la Persona</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Nuestra lealtad está con el individuo. No defendemos corporaciones en este despacho; para empresas contamos con una firma aliada para evitar cualquier conflicto de intereses.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                    <Clock className="w-4 h-4 text-[#c5a880]" />
                    <span>Respuesta Rápida</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Sabemos que en derecho penal y policial los minutos cuentan. Coordinación telefónica o presencial inmediata ante citaciones o detenciones.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                    <Shield className="w-4 h-4 text-[#c5a880]" />
                    <span>Litigación Efectiva</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Preparación rigurosa de audiencias orales ante jueces penales, civiles y salas de apelación con solvencia técnica.
                  </p>
                </div>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${FIRM_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-[#c5a880]/15 hover:bg-[#c5a880]/25 text-[#eedbbd] text-xs font-bold border border-[#c5a880]/30 transition-all text-center"
              >
                <PhoneCall className="w-4 h-4 text-[#c5a880]" />
                <span>Llamada de Asistencia: {FIRM_INFO.phoneDisplay}</span>
              </a>

            </div>
          </div>

        </div>

        {/* Quick Numbers / Stat Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#c5a880] font-legal">100%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Personas Naturales</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-legal">24/7</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Urgencias Penales</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#c5a880] font-legal">7 Áreas</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Alta Especialidad</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-legal">Nacional</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Cobertura en todo el Perú</div>
          </div>
        </div>

      </div>
    </section>
  );
}
