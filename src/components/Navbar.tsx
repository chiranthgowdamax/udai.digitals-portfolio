import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#07080D]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#07080D] border-b border-white/10'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a
          href="#"
          className="inline-flex items-center gap-3 font-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#687DF7]"
        >
          <img
            src={STUDIO_CONFIG.brand.logo}
            alt={`${STUDIO_CONFIG.brand.name} logo`}
            referrerPolicy="no-referrer"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain bg-black border border-white/10 shrink-0"
          />
          <span>
            UD<span className="text-[#687DF7]">ai</span> Digitals
          </span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#687DF7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#687DF7] hover:bg-[#546AE8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E42]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#687DF7]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#07080D] border-b border-white/15 px-5 pt-3 pb-6"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="py-3 text-base font-medium text-white border-b border-white/10 flex items-center justify-between hover:text-[#687DF7] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#687DF7] hover:bg-[#546AE8] rounded-lg transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
