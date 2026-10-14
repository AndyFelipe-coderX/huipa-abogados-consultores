import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import Reveal from './Reveal';
import { FAQS } from '../data/site';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="preguntas" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">04 — Preguntas frecuentes</p>
          <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
            Lo que suelen <em className="italic">preguntarnos.</em>
          </h2>
        </Reveal>

        <div className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-serif text-[1.25rem] leading-snug transition-colors ${
                      isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'
                    }`}
                  >
                    {f.q}
                  </span>
                  <Plus
                    size={20}
                    strokeWidth={1.5}
                    className={`mt-1 shrink-0 text-ink-2 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-accent' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-10 text-[0.98rem] leading-relaxed text-ink-2">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
