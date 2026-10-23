/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteHeader } from './components/site-header';
import { HeroSection } from './components/hero-section';
import { ProjectGrid } from './components/project-grid';
import { BentoMiddleRow } from './components/bento-middle-row';
import { LowerSplitRow } from './components/lower-split-row';
import { ContactFooter } from './components/contact-footer';

const SECTION_IDS = ['home', 'projects', 'about', 'experience', 'research', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const viewportMiddle = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= viewportMiddle) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewWork = () => {
    setActiveSection('projects');
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EEE5] text-[#171512]">
      <SiteHeader
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          onViewWork={handleViewWork}
          onOpenContact={() => setContactModalOpen(true)}
        />

        <ProjectGrid />

        <BentoMiddleRow />

        <LowerSplitRow />
      </main>

      <ContactFooter
        isModalOpen={contactModalOpen}
        onOpenModal={() => setContactModalOpen(true)}
        onCloseModal={() => setContactModalOpen(false)}
      />
    </div>
  );
}
