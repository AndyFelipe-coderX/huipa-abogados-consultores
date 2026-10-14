import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../data/site';

// Aparece recién al hacer scroll, para no tapar el contenido inicial.
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waLink('Hola, quisiera hacer una consulta.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-accent py-3 pl-4 pr-5 text-[0.88rem] font-medium text-on-accent shadow-lg shadow-black/15 transition-colors hover:bg-accent-hover"
        >
          <MessageCircle size={18} strokeWidth={1.6} />
          <span className="hidden sm:inline">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
