import Reveal from './Reveal';

const PILARES = [
  {
    title: 'Su libertad',
    text: 'Defensa penal desde la primera citación o detención hasta la última instancia.',
  },
  {
    title: 'Sus derechos',
    text: 'Hábeas corpus, amparo y defensa frente a sanciones y procedimientos arbitrarios.',
  },
  {
    title: 'Sus intereses',
    text: 'Su trabajo, su vivienda y su patrimonio, protegidos con una estrategia clara.',
  },
];

export default function Enfoque() {
  return (
    <section id="enfoque" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">01 — Enfoque</p>
          <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
            Detrás de cada expediente, <em className="italic">una historia.</em>
          </h2>
        </Reveal>

        <div className="space-y-7 text-[1.05rem] leading-relaxed text-ink-2 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p>
              Un proceso judicial o disciplinario compromete mucho más que un expediente: su libertad,
              su trabajo, su patrimonio y su tranquilidad. Por eso cada caso lo lleva un abogado del
              estudio que conoce los hechos de primera mano.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Atendemos a ciudadanos, trabajadores, servidores públicos y miembros de la Policía
              Nacional, con trato directo, sin intermediarios y con información clara en cada etapa.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="my-12 border-l-2 border-accent pl-7 font-serif text-[1.65rem] font-light italic leading-snug text-ink sm:text-3xl">
              “Cuando está en juego su libertad, su trabajo o su casa, necesita a alguien que conozca
              su caso de memoria.”
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {PILARES.map((p) => (
                <div key={p.title} className="bg-paper p-7">
                  <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-accent">Defendemos</dt>
                  <dd className="mt-3 font-serif text-xl text-ink">{p.title}</dd>
                  <dd className="mt-2 text-[0.92rem] text-ink-2">{p.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
