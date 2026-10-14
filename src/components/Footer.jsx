import React from 'react';
import { Scale, Phone, Mail, MapPin, Shield, HeartHandshake } from 'lucide-react';
import { FIRM_INFO, PRACTICE_AREAS } from '../data/legalAreas';

export default function Footer() {
  return (
    <footer className="bg-[#060a14] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c5a880] to-[#96764d] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#060a14] rounded-[7px] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#c5a880]" />
                </div>
              </div>
              <div>
                <span className="block text-xl font-bold tracking-wider font-legal text-white">
                  HUIPA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#c5a880] block">
                  Abogados & Consultores
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Despacho jurídico fundado por los socios de la familia <strong className="text-slate-200">Huipa</strong>, dedicado con vocación, solvencia técnica y litigación oral a la defensa rigurosa de las personas naturales ante los fueros judiciales, policiales y administrativos del Perú.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Patrocinio Exclusivo para Personas Naturales</span>
            </div>
          </div>

          {/* Col 2: Specialties */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-legal">
              Especialidades Principales
            </h4>
            <ul className="space-y-2 text-xs">
              {PRACTICE_AREAS.map(area => (
                <li key={area.id}>
                  <a
                    href="#especialidades"
                    className="hover:text-[#c5a880] transition-colors"
                  >
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Attention */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white font-legal">
              Canales de Atención
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>{FIRM_INFO.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span>{FIRM_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{FIRM_INFO.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400">
                <strong className="text-slate-300">Horario:</strong> {FIRM_INFO.hours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Huipa Abogados y Consultores. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Defensa de Personas Naturales</span>
            <span>•</span>
            <span>Litigación Oral & Estrategia</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
