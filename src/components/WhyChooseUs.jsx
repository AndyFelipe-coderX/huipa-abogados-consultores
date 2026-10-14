import React from 'react';
import { Shield, Sparkles, Scale, Users, FileLock2, Award, CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Users,
      title: 'Atención Directa y Personalizada',
      description: 'En Huipa Abogados usted trata de forma directa con los abogados litigantes a cargo de su caso, sin intermediarios ni filtros burocráticos.'
    },
    {
      icon: Scale,
      title: 'Especialización en Personas Naturales',
      description: 'Conocemos a profundidad el impacto humano, familiar y patrimonial de un proceso judicial en un ciudadano, brindando contención y rigor legal.'
    },
    {
      icon: Sparkles,
      title: 'Maestría en Litigación Oral',
      description: 'No somos abogados de escritorio; sostenemos audiencias orales con solvencia técnica, interrogatorios precisos y alegatos convincentes.'
    },
    {
      icon: Shield,
      title: 'Respuesta Inmediata en Emergencias',
      description: 'Guardia activa para detenciones en flagrancia, allanamientos y citaciones urgentes en dependencias policiales y fiscalías.'
    },
    {
      icon: FileLock2,
      title: 'Honorarios Transparentes y Cerrados',
      description: 'Propuesta clara desde el primer día. Sin sobrecostos inesperados ni cobros ocultos a lo largo de las etapas procesales.'
    },
    {
      icon: Award,
      title: 'Confidencialidad y Rigor Ético',
      description: 'Secreto profesional estricto y compromiso inquebrantable en la protección de su intimidad, reputación y derechos.'
    }
  ];

  return (
    <section id="por-que-nosotros" className="py-24 bg-[#080d19] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Nuestros Principios</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-legal tracking-tight leading-snug">
              Donde el Rigor Técnico Encuentra el <span className="text-[#c5a880]">Compromiso Humano</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Un conflicto penal, policial o civil no es un simple expediente: es su libertad, su empleo, su familia o el patrimonio que construyó con años de trabajo.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              Por ello, en <strong className="text-white">Huipa Abogados y Consultores</strong> asumimos cada caso con una estrategia legal artesanal, dedicando el tiempo y análisis que una persona natural verdaderamente merece.
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800/80 border border-[#c5a880]/30 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-[#c5a880]" />
                <span>Garantía de Compromiso Ético</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Le diremos siempre la verdad sobre la viabilidad de su caso, las alternativas legales reales y los riesgos procesales, sin falsas promesas.
              </p>
            </div>
          </div>

          {/* Right Column: 6 Grid Pillars */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-[#c5a880]/40 transition-all duration-300 hover:bg-slate-900/90"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#c5a880]" />
                    </div>
                    <h3 className="text-base font-bold text-white font-legal mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
