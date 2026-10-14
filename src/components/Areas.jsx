import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { PRACTICE_AREAS, waLink } from '../data/site';

export default function Areas() {
  const [open, setOpen] = useState(PRACTICE_AREAS[0].id);

  // Abre el área cuando se llega desde el índice del inicio (#area-xxx)
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      if (h.startsWith('#area-')) setOpen(h.slice(6));
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section id="areas" className="scroll-mt-20 border-b border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">02 — Áreas de práctica</p>
            <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
              Siete materias, <em className="italic">un mismo criterio.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[1.02rem] leading-relaxed text-ink-2">
              Trabajamos las áreas en las que litigamos a diario. Seleccione una para ver qué incluye
              y a quién va dirigida.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-ink">
          {PRACTICE_AREAS.map((a, i) => {
            const isOpen = open === a.id;
            return (
              <li key={a.id} id={`area-${a.id}`} className="scroll-mt-28 border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : a.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${a.id}`}
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-7 text-left sm:grid-cols-[5rem_1fr_auto] sm:py-8"
                >
                  <span className="pt-2 font-serif text-sm italic text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className={`block font-serif text-2xl font-light leading-tight transition-colors sm:text-[2rem] ${
                        isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
                      }`}
                    >
                      {a.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">
                      {a.summary}
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-accent bg-accent text-on-accent'
                        : 'border-line text-ink-2 group-hover:border-ink/40'
                    }`}
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${a.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 pb-12 pl-[3.5rem] sm:pl-[6rem] lg:grid-cols-12">
                        <ul className="grid gap-x-10 gap-y-3.5 text-[0.95rem] text-ink-2 sm:grid-cols-2 lg:col-span-8">
                          {a.items.map((it) => (
                            <li key={it} className="flex gap-3 leading-snug">
                              <span className="mt-[0.65em] h-px w-3 shrink-0 bg-accent" />
                              {it}
                            </li>
                          ))}
                        </ul>
                        <div className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
                          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">
                            Para quién
                          </p>
                          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">{a.forWhom}</p>
                          <a
                            href={waLink(a.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-accent"
                          >
                            Consultar sobre este tema
                            <ArrowUpRight size={15} strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
