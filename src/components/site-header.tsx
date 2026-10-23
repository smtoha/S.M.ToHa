import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteMetadata } from '../lib/site-data';

interface SiteHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-150 ${
        scrolled
          ? 'bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#E5DDD0] shadow-2xs'
          : 'bg-[#FBF7F0]/85 backdrop-blur-xs border-b border-[#E8E0D4]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Monogram */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="S.M. Toha Home"
          className="text-2xl font-black tracking-tighter text-[#171512] whitespace-nowrap shrink-0 flex items-baseline"
        >
          <span>T</span>
          <span className="inline-block w-2 h-2 bg-[#B86B35] ml-0.5 rounded-[1px]" />
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#4A443E]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`relative py-3 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#171512] font-bold'
                    : 'text-[#5A534A] hover:text-[#171512]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-0 right-0 h-[2px] bg-[#B86B35] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Availability / Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {siteMetadata.availableForOpportunities && (
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF7F0] border border-[#E2D9C8] text-[11.5px] font-medium text-[#2B2621] hover:border-[#BD875D] transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#438A60]" aria-hidden="true" />
              <span>Available for opportunities</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg text-[#171512] hover:bg-[#EAE2D6] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF7F0] border-b border-[#E5DDD0] px-6 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-[#EFE7DA] text-[#171512] font-bold'
                    : 'text-[#5A534A] hover:bg-[#F4EEE5]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E8E0D4] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#191614] text-[#FBF7F0] text-xs font-semibold text-center"
            >
              Available for opportunities — Get in touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
