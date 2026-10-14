import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { SITE, CONTACT_READY, SOON } from '../data/site';
import { useTheme } from '../hooks/useTheme';

const NAV = [
  { label: 'Enfoque', href: '#enfoque' },
  { label: 'Áreas de práctica', href: '#areas' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Preguntas', href: '#preguntas' },
  { label: 'Contacto', href: '#contacto' },
];

export function Wordmark({ className = '' }) {
  return (
    <a
      href="#inicio"
      className={`inline-flex flex-col leading-none ${className}`}
      aria-label="Juipa & Asociados, ir al inicio"
    >
      <span className="font-serif text-[1.5rem] font-normal tracking-tight text-ink">
        Juipa <span className="italic text-accent">&amp;</span> Asociados
      </span>
      <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.34em] text-muted">
        Abogados y Consultores
      </span>
    </a>
  );
}

function ThemeButton({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink/40 hover:text-ink"
      aria-label={dark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
      title={dark ? 'Modo día' : 'Modo noche'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22 }}
          className="grid place-items-center"
        >
          {dark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      {/* Barra superior */}
      <div className="hidden border-b border-line bg-paper-2 text-[0.78rem] text-ink-2 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <p>Penal · Policial · Constitucional · Civil · Laboral — {SITE.city}</p>
          {CONTACT_READY ? (
            <a
              href={`tel:${SITE.phoneHref}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <Phone size={13} strokeWidth={1.5} />
              {SITE.phoneDisplay}
            </a>
          ) : (
            <span className="italic text-muted">Línea de atención: {SOON.toLowerCase()}</span>
          )}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-[border-color] duration-300 ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Wordmark />

          <nav className="hidden items-center gap-8 text-[0.9rem] text-ink-2 lg:flex" aria-label="Principal">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="link-underline transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeButton theme={theme} onToggle={toggleTheme} />
            <a href="#contacto" className="btn-primary hidden !py-2.5 sm:inline-flex">
              Agendar consulta
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center text-ink lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center text-ink"
                aria-label="Cerrar menú"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col px-6 pt-6" aria-label="Móvil">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-baseline gap-4 border-b border-line py-5 font-serif text-3xl font-light text-ink"
                >
                  <span className="text-sm italic text-muted">0{i + 1}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="space-y-3 px-6 pb-8">
              <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary w-full">
                Agendar consulta
              </a>
              {CONTACT_READY ? (
                <a href={`tel:${SITE.phoneHref}`} className="btn-ghost w-full">
                  <Phone size={15} strokeWidth={1.5} /> {SITE.phoneDisplay}
                </a>
              ) : (
                <div className="btn-ghost w-full text-muted italic text-center justify-center">
                  Línea telefónica: {SOON.toLowerCase()}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
