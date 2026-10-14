import Reveal from './Reveal';

export default function Enfoque() {
  return (
    <section id="enfoque" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">01 — Enfoque</p>
          <h2 className="mt-6 text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
            Un solo cliente: <em className="italic">la persona.</em>
          </h2>
        </Reveal>

        <div className="space-y-7 text-[1.05rem] leading-relaxed text-ink-2 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p>
              Juipa &amp; Asociados atiende exclusivamente a personas naturales: ciudadanos,
              trabajadores, servidores públicos y miembros de la Policía Nacional. Desde este estudio
              no patrocinamos empresas.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Cuando nos consulta una persona jurídica, la derivamos a la firma con la que trabajamos
              para la defensa corporativa. Así evitamos conflictos de interés y usted sabe que su
              abogado no responde a nadie más.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="my-12 border-l-2 border-accent pl-7 font-serif text-[1.65rem] font-light italic leading-snug text-ink sm:text-3xl">
              “Cuando está en juego su libertad, su trabajo o su casa, necesita a alguien que conozca
              su caso de memoria.”
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-paper p-7">
                <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-accent">Atendemos</dt>
                <dd className="mt-3 font-serif text-xl text-ink">Personas naturales</dd>
                <dd className="mt-2 text-[0.92rem] text-ink-2">
                  Ciudadanos, trabajadores, policías y servidores públicos.
                </dd>
              </div>
              <div className="bg-paper p-7">
                <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">Derivamos</dt>
                <dd className="mt-3 font-serif text-xl text-ink">Personas jurídicas</dd>
                <dd className="mt-2 text-[0.92rem] text-ink-2">
                  Empresas y consorcios, a nuestra firma aliada en defensa corporativa.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
