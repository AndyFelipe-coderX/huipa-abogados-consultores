import { MotionConfig } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Enfoque from './components/Enfoque';
import Areas from './components/Areas';
import Proceso from './components/Proceso';
import Urgencia from './components/Urgencia';
import Faq from './components/Faq';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    // Respeta la preferencia "reducir movimiento" del sistema
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Enfoque />
        <Areas />
        <Proceso />
        <Urgencia />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
