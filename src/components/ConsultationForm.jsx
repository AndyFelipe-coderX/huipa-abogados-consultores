import React, { useState } from 'react';
import { MessageSquare, PhoneCall, Send, ShieldCheck, AlertCircle, Clock, MapPin, Mail } from 'lucide-react';
import { FIRM_INFO, PRACTICE_AREAS } from '../data/legalAreas';

export default function ConsultationForm({ preselectedArea }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: preselectedArea || 'Derecho Penal y Procesal Penal',
    urgency: 'normal',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const urgencyLabel = {
      normal: 'Consulta Regular',
      media: 'Plazo por Vencer / Notificación',
      alta: '¡EMERGENCIA / DETENCIÓN EN CURSO!'
    }[formData.urgency] || 'Consulta Regular';

    const text = `*SOLICITUD DE ASESORÍA - HUIPA ABOGADOS*\n\n` +
      `*Nombre:* ${formData.name || 'No indicado'}\n` +
      `*Teléfono:* ${formData.phone || 'No indicado'}\n` +
      `*Área Legal:* ${formData.area}\n` +
      `*Nivel de Urgencia:* ${urgencyLabel}\n` +
      `*Detalle:* ${formData.message || 'Solicito coordinar una consulta legal especializada para persona natural.'}`;

    const url = `https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-[#0a0f1d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact info & emergency */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Contáctenos Hoy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-legal tracking-tight">
              Inicie su Defensa con una <span className="text-[#c5a880]">Evaluación Estratégica</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              No espere a que los plazos procesales venzan o su situación jurídica se complique. Cuéntenos su caso y reciba orientación directa de nuestros abogados especialistas.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#c5a880]/15 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 text-[#c5a880]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Línea Directa y Emergencias</h4>
                  <a href={`tel:${FIRM_INFO.phone}`} className="text-base font-bold text-white hover:text-[#c5a880] transition-colors">
                    {FIRM_INFO.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-emerald-400 font-medium">Disponible para emergencias penales 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#c5a880]/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#c5a880]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Horario de Asesorías</h4>
                  <p className="text-sm font-semibold text-white">{FIRM_INFO.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#c5a880]/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#c5a880]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sede y Alcance</h4>
                  <p className="text-sm font-semibold text-white">{FIRM_INFO.address}</p>
                  <p className="text-xs text-slate-400">Atención presencial previa cita y virtual a nivel nacional</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/20 text-xs text-[#ebd0ab] leading-relaxed">
              <strong>Nota de Transparencia:</strong> Este despacho patrocina exclusivamente a <em>Personas Naturales</em>. Si requiere defensa para una empresa o persona jurídica, canalizamos su expediente con nuestra firma socia.
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#10172b] border border-slate-800 p-6 sm:p-8 shadow-2xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-legal">¡Solicitud Registrada con Éxito!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Hemos recibido sus datos. Uno de nuestros abogados se comunicará con usted en breve a su número de contacto.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold text-[#c5a880] hover:text-white bg-slate-800 border border-slate-700"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white font-legal">Formulario de Consulta Legal</h3>
                    <p className="text-xs text-slate-400">Complete los datos para canalizar su caso con el especialista indicado</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Juan Pérez"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ej. 999 888 777"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Área de Interés Legal
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#c5a880]"
                      >
                        {PRACTICE_AREAS.map(area => (
                          <option key={area.id} value={area.title} className="bg-slate-900 text-white">
                            {area.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Nivel de Urgencia
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-[#c5a880]"
                      >
                        <option value="normal" className="bg-slate-900">Consulta Regular (Programada)</option>
                        <option value="media" className="bg-slate-900">Citación / Plazo Procesal por Vencer</option>
                        <option value="alta" className="bg-slate-900 text-rose-400 font-bold">¡EMERGENCIA PENAL / DETENCIÓN!</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Breve Resumen de su Situación
                    </label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indique brevemente en qué etapa se encuentra su caso o qué notificación ha recibido..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  {/* Dual Action: Send Form & WhatsApp Direct */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="flex-1 py-3.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-98"
                    >
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Enviar y Abrir WhatsApp Ahora</span>
                    </button>

                    <button
                      type="submit"
                      className="sm:w-auto py-3.5 px-6 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                    >
                      Solicitar Llamada
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
