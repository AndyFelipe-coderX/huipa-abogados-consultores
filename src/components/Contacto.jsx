import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { SITE, PRACTICE_AREAS, waLink } from '../data/site';

export default function Contacto() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    area: PRACTICE_AREAS[0].title,
    message: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const text =
      `Hola, les escribe ${form.name}.\n` +
      `Teléfono: ${form.phone}\n` +
      `Materia: ${form.area}\n\n` +
      (form.message || 'Quisiera agendar una consulta.');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  const info = [
    { icon: Phone, label: 'Teléfono', value: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}` },
    { icon: Mail, label: 'Correo', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: 'Oficina', value: SITE.address },
    { icon: Clock, label: 'Horario', value: SITE.hours },
  ];

  return (
    <section id="contacto" className="scroll-mt-20 border-b border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">05 — Contacto</p>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
              Cuéntenos <em className="italic">su caso.</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-ink-2">
              Complete el formulario y se abrirá WhatsApp con su mensaje listo para enviar. Le
              responderá directamente uno de nuestros abogados.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-12 divide-y divide-line border-y border-line">
              {info.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-5 py-5">
                  <Icon size={18} strokeWidth={1.4} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">{label}</dt>
                    <dd className="mt-1 text-[0.98rem] text-ink">
                      {href ? (
                        <a href={href} className="link-underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={onSubmit} className="border border-line bg-card p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">Nombre</span>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">Teléfono</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                  placeholder="999 999 999"
                  className="field"
                />
              </label>
            </div>

            <label className="mt-8 block">
              <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">Materia</span>
              <select value={form.area} onChange={set('area')} className="field cursor-pointer">
                {PRACTICE_AREAS.map((a) => (
                  <option key={a.id} value={a.title} className="bg-card text-ink">
                    {a.title}
                  </option>
                ))}
                <option value="Otro / no estoy seguro" className="bg-card text-ink">
                  Otro / no estoy seguro
                </option>
              </select>
            </label>

            <label className="mt-8 block">
              <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                Resumen del caso
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={set('message')}
                placeholder="¿Qué ocurrió? ¿Recibió alguna notificación o tiene algún plazo?"
                className="field resize-none"
              />
            </label>

            <button type="submit" className="btn-primary group mt-10 w-full">
              Enviar por WhatsApp
              <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="mt-4 text-center text-[0.78rem] text-muted">
              La información que nos comparta es confidencial y está protegida por el secreto
              profesional.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
