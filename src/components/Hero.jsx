import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { PRACTICE_AREAS, ROMAN } from '../data/site';

export default function Hero() {
  return (
    <section id="inicio" className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-20 pt-14 md:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Estudio jurídico · Personas naturales</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-[2.7rem] font-light leading-[1.04] text-ink sm:text-6xl lg:text-[4.6rem]">
              Defendemos a <em className="font-normal italic text-accent">personas</em>,{' '}
              <br className="hidden sm:block" />
              no a corporaciones.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-ink-2">
              Somos un estudio fundado por la familia Juipa. Llevamos casos penales, policiales,
              disciplinarios, constitucionales, civiles y laborales de ciudadanos que necesitan un
              abogado que conozca su expediente y dé la cara en cada audiencia.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contacto" className="btn-primary group">
                Agendar una consulta
                <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#areas" className="btn-ghost">
                Ver áreas de práctica
              </a>
            </div>
          </Reveal>
        </div>

        {/* Índice de materias */}
        <Reveal delay={0.24} className="lg:col-span-5 lg:pl-8">
          <div className="border-t border-ink pt-5">
            <p className="flex justify-between text-[0.7rem] uppercase tracking-[0.28em] text-muted">
              <span>Índice de materias</span>
              <span>{String(PRACTICE_AREAS.length).padStart(2, '0')}</span>
            </p>
            <ol className="mt-3 divide-y divide-line">
              {PRACTICE_AREAS.map((a, i) => (
                <li key={a.id}>
                  <a href={`#area-${a.id}`} className="group flex items-baseline gap-5 py-3.5">
                    <span className="w-7 font-serif text-sm italic text-muted">{ROMAN[i]}</span>
                    <span className="flex-1 text-[0.98rem] text-ink transition-colors group-hover:text-accent">
                      {a.title}
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="text-muted opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
