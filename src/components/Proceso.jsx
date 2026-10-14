import Reveal from './Reveal';
import { STEPS } from '../data/site';

export default function Proceso() {
  return (
    <section id="proceso" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">03 — Cómo trabajamos</p>
          <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
            Claridad desde <em className="italic">la primera reunión.</em>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-paper">
              <Reveal delay={i * 0.07} className="flex h-full flex-col p-8">
                <span className="font-serif text-5xl font-extralight italic text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-2xl font-normal text-ink">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
