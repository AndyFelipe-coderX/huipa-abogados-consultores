import React from 'react';
import { UserCheck, Building2, ShieldCheck, ArrowRight, HeartHandshake, FileCheck } from 'lucide-react';

export default function SpecialtyFocus({ onOpenContact }) {
  return (
    <section id="enfoque-personas" className="py-20 bg-[#080d1a] relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Nuestra Identidad y Vocación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-legal tracking-tight">
            Defensa Legal Dedicada <span className="text-[#c5a880]">Exclusivamente a Personas Naturales</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Una postura ética y estratégica clara: en <strong className="text-white">Huipa Abogados y Consultores</strong> no mezclamos la defensa corporativa con la defensa del ciudadano. Nuestro compromiso es 100% con las personas.
          </p>
        </div>

        {/* Comparison / Architecture Cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Huipa Abogados (Persona Natural) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-[#11192e] border-2 border-[#c5a880]/50 p-8 shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#c5a880] to-[#e5c07b] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg">
              Despacho Principal
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#c5a880]/20 border border-[#c5a880]/40 flex items-center justify-center shrink-0">
                  <UserCheck className="w-7 h-7 text-[#c5a880]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-legal">Huipa Abogados y Consultores</h3>
                  <p className="text-xs text-[#c5a880] font-semibold tracking-wide uppercase">Enfoque: Personas Naturales</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Diseñado para el ciudadano común, el profesional independiente, el trabajador y el efectivo policial que necesita un abogado de cabecera con quien hablar de tú a tú, sin barreras ni tecnicismos confusos.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Defensa de la Libertad Personal:</strong> Procesos penales, detenciones, prisiones preventivas y juicios orales.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Protección del Funcionario y Policía:</strong> Inspectoría PNP, régimen disciplinario y procedimientos sancionadores.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong>Seguridad Patrimonial y Laboral:</strong> Desalojos, herencias, despidos injustificados y derechos de trabajadores.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOpenContact}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#c5a880] to-[#e5c07b] hover:from-[#d5b991] hover:to-[#edd08c] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#c5a880]/15"
              >
                <span>Consultar Caso como Persona Natural</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Empresa Aliada (Personas Jurídicas) */}
          <div className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-200 font-legal">Firma Aliada Especializada</h3>
                  <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Defensa Corporativa & Empresas</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Si usted representa a una persona jurídica (empresa, consorcio o corporación) que requiere patrocinio legal empresarial, contamos con una empresa aliada con la que coordinamos de manera integral.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">
                    <strong>Cero Conflicto de Intereses:</strong> Al separar la práctica corporativa de la individual, garantizamos que el ciudadano tenga la máxima prioridad sin favoritismos.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">
                    <strong>Canalización Directa:</strong> Las consultas corporativas de empresas son derivadas a nuestro equipo aliado especialista en derecho corporativo y tributario.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  ¿Es usted una empresa o persona jurídica? Podemos canalizar su caso a nuestra firma socia.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
