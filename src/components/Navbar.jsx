import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Shield, Scale } from 'lucide-react';
import { FIRM_INFO } from '../data/legalAreas';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Enfoque Personas', href: '#enfoque-personas' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Por Qué Nosotros', href: '#por-que-nosotros' },
    { name: 'Preguntas', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0f1d]/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#c5a880] to-[#96764d] p-0.5 flex items-center justify-center shadow-lg shadow-[#c5a880]/10 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[7px] flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#c5a880] transition-colors group-hover:text-amber-200" />
              </div>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-wider font-legal text-white group-hover:text-[#c5a880] transition-colors leading-none">
                HUIPA
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-[#c5a880] block mt-0.5">
                Abogados & Consultores
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-[#c5a880] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Huipa Abogados, requiero una consulta legal para persona natural.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </a>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#c5a880] to-[#dfc49e] hover:from-[#d8bd95] hover:to-[#ebcfab] transition-all duration-200 shadow-lg shadow-[#c5a880]/20 font-sans tracking-wide active:scale-95"
            >
              <Shield className="w-4 h-4 text-slate-900" />
              <span>Consulta Legal</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-slate-800 bg-[#0a0f1d]/98 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-[#c5a880] hover:bg-slate-800/40 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${FIRM_INFO.whatsappNumber}?text=${encodeURIComponent('Hola Huipa Abogados, requiero una consulta legal urgente.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {FIRM_INFO.phoneDisplay}</span>
                </a>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#c5a880] to-[#e5c07b]"
                >
                  <Shield className="w-4 h-4" />
                  <span>Solicitar Consulta Legal</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
