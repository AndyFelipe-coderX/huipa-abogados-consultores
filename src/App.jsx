import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialtyFocus from './components/SpecialtyFocus';
import PracticeAreas from './components/PracticeAreas';
import WhyChooseUs from './components/WhyChooseUs';
import EmergencyBanner from './components/EmergencyBanner';
import ConsultationForm from './components/ConsultationForm';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';

export default function App() {
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectArea = (areaTitle) => {
    setSelectedPracticeArea(areaTitle);
  };

  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100 selection:bg-[#c5a880] selection:text-[#0b111e]">
      {/* Sticky Header Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Landing Sections */}
      <main>
        {/* Hero Section with Value Prop and Metrics */}
        <Hero onOpenContact={handleOpenContact} />

        {/* Essential Positioning: 100% Personas Naturales vs Jurídicas */}
        <SpecialtyFocus onOpenContact={handleOpenContact} />

        {/* 7 Practice Areas Grid with Detail Modals */}
        <PracticeAreas onSelectArea={handleSelectArea} />

        {/* 24/7 Criminal & Police Emergency Callout */}
        <EmergencyBanner />

        {/* Firm Pillars & Why Choose Us */}
        <WhyChooseUs />

        {/* Interactive Consultation Form with Direct WhatsApp Integration */}
        <ConsultationForm preselectedArea={selectedPracticeArea} />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Professional Legal Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloating />
    </div>
  );
}
