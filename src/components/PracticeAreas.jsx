import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BadgeCheck, 
  Landmark, 
  FileWarning, 
  Scale, 
  Briefcase, 
  Gavel, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageCircle,
  X 
} from 'lucide-react';
import { PRACTICE_AREAS, FIRM_INFO } from '../data/legalAreas';

const iconMap = {
  ShieldAlert,
  BadgeCheck,
  Landmark,
  FileWarning,
  Scale,
  Briefcase,
  Gavel
};

export default function PracticeAreas({ onSelectArea }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalArea, setActiveModalArea] = useState(null);

  const filters = [
    { id: 'all', label: 'Todas las Especialidades' },
    { id: 'penal', label: 'Penal & Litigación' },
    { id: 'policial', label: 'Policial & Disciplinario' },
    { id: 'civil', label: 'Civil & Laboral' },
    { id: 'constitucional', label: 'Garantías Constitucionales' },
  ];

  const filteredAreas = selectedFilter === 'all'
    ? PRACTICE_AREAS
    : PRACTICE_AREAS.filter(area => area.category === selectedFilter || (selectedFilter === 'penal' && area.id === 'litigacion'));

  return (
    <section id="especialidades" className="py-24 bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Áreas de Práctica Especializada</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-legal tracking-tight">
            Especialistas en la Defensa de <span className="text-[#c5a880]">Personas Naturales</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Concentramos nuestra preparación técnica en materias donde la libertad, el honor, el patrimonio personal y los derechos fundamentales del individuo están en juego.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-r from-[#c5a880] to-[#e5c07b] text-slate-950 shadow-md shadow-[#c5a880]/20'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAreas.map((area) => {
            const IconComponent = iconMap[area.icon] || Scale;
            return (
              <div
                key={area.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e1628] border border-slate-800 hover:border-[#c5a880]/60 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#c5a880]/10"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-13 h-13 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a880]/20 transition-all">
                      <IconComponent className="w-6 h-6 text-[#c5a880]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {area.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white font-legal group-hover:text-[#c5a880] transition-colors mb-3">
                    {area.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {area.shortDesc}
                  </p>

                  {/* Top Key Features */}
                  <ul className="space-y-2 mb-6 text-xs text-slate-300">
                    {area.details.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalArea(area)}
                    className="text-xs font-semibold text-[#c5a880] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Ver alcance completo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent(area.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal de Detalle de Especialidad */}
      {activeModalArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f172a] border border-[#c5a880]/40 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalArea(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#c5a880]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a880] font-bold block">
                  {activeModalArea.badge}
                </span>
                <h3 className="text-2xl font-bold text-white font-legal">
                  {activeModalArea.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {activeModalArea.shortDesc}
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold tracking-wider uppercase text-slate-400">
                Servicios y Cobertura de Defensa Técnica:
              </h4>
              <div className="space-y-3">
                {activeModalArea.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent(activeModalArea.whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#c5a880] to-[#e5c07b] hover:from-[#d5b991] hover:to-[#edd08c] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar Caso de {activeModalArea.title}</span>
              </a>

              <button
                onClick={() => {
                  if (onSelectArea) onSelectArea(activeModalArea.title);
                  setActiveModalArea(null);
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
              >
                Llenar Formulario
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
