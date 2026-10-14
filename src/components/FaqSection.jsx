import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQS, FIRM_INFO } from '../data/legalAreas';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#080d19] relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Resolución de Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-legal tracking-tight">
            Preguntas Frecuentes de <span className="text-[#c5a880]">Nuestros Patrocinados</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Claridad absoluta desde el primer momento. Respuestas a las consultas más comunes sobre nuestros servicios y forma de trabajo.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-legal">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#c5a880]/20 text-[#c5a880]' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help box */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white font-legal">¿Tiene una pregunta específica sobre su caso?</h4>
            <p className="text-xs text-slate-400">Escríbanos directamente y un abogado litigante le responderá a la brevedad.</p>
          </div>
          <a
            href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Huipa Abogados, tengo una pregunta legal sobre mi caso.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#c5a880] to-[#e5c07b] hover:from-[#d5b991] hover:to-[#edd08c] flex items-center gap-2 shrink-0 transition-all shadow-md shadow-[#c5a880]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
