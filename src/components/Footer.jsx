import { Wordmark } from './Header';
import { SITE, PRACTICE_AREAS, CONTACT_READY, SOON } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-ink-2">
              Estudio jurídico dedicado a la defensa de personas naturales en materia penal,
              policial, disciplinaria, constitucional, civil y laboral.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">Áreas</p>
            <ul className="mt-5 space-y-2.5 text-[0.92rem] text-ink-2">
              {PRACTICE_AREAS.map((a) => (
                <li key={a.id}>
                  <a href={`#area-${a.id}`} className="link-underline hover:text-ink">
                    {a.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">Contacto</p>
            <ul className="mt-5 space-y-2.5 text-[0.92rem] text-ink-2">
              {CONTACT_READY ? (
                <>
                  <li>
                    <a href={`tel:${SITE.phoneHref}`} className="link-underline hover:text-ink">
                      {SITE.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className="link-underline hover:text-ink">
                      {SITE.email}
                    </a>
                  </li>
                </>
              ) : (
                <li className="italic text-muted">Teléfono y correo: {SOON.toLowerCase()}</li>
              )}
              <li>{SITE.city}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[0.78rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.tagline} · Defensa de Personas Naturales
          </p>
          <p className="max-w-md md:text-right">
            El contenido de este sitio es informativo y no constituye asesoría legal.
          </p>
        </div>
      </div>
    </footer>
  );
}
