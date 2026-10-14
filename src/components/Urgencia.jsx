import { Phone, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { SITE, waLink, CONTACT_READY, SOON } from '../data/site';

export default function Urgencia() {
  return (
    <section className="bg-band text-on-band">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:py-20">
        <Reveal className="lg:col-span-8">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] opacity-70">Urgencias penales</p>
          <p className="mt-4 font-serif text-3xl font-light leading-tight sm:text-[2.6rem]">
            ¿Detuvieron a un familiar o lo citaron a declarar?{' '}
            <em className="italic">No declare sin abogado.</em>
          </p>
        </Reveal>
        {!CONTACT_READY ? (
          <Reveal delay={0.08} className="lg:col-span-4">
            <div className="border border-on-band/35 px-6 py-5 text-center">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] opacity-70">Línea de atención</p>
              <p className="mt-2 font-serif text-2xl italic">{SOON}</p>
            </div>
          </Reveal>
        ) : (
        <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex items-center justify-center gap-2 bg-on-band px-6 py-3.5 text-[0.9rem] font-medium text-band transition-opacity hover:opacity-90"
          >
            <Phone size={16} strokeWidth={1.5} />
            Llamar al {SITE.phoneDisplay}
          </a>
          <a
            href={waLink('Hola, tengo una urgencia penal y necesito un abogado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-on-band/35 px-6 py-3.5 text-[0.9rem] font-medium transition-colors hover:border-on-band"
          >
            Escribir por WhatsApp
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        </Reveal>
        )}
      </div>
    </section>
  );
}
