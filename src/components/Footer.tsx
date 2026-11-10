import React from 'react';
import { STUDIO_CONFIG } from '../config/studioConfig';

const FOOTER_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07080D] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={STUDIO_CONFIG.brand.logo}
              alt={`${STUDIO_CONFIG.brand.name} logo`}
              referrerPolicy="no-referrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-contain bg-black border border-white/15 shrink-0"
            />
            <div>
              <a
                href="#"
                className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white inline-block mb-1"
              >
                UD<span className="text-[#687DF7]">ai</span> Digitals
              </a>
              <p className="text-sm text-[#687DF7] font-medium">
                {STUDIO_CONFIG.brand.tagline}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {STUDIO_CONFIG.brand.locationFull}.
              </p>
            </div>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-slate-300"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#687DF7] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {STUDIO_CONFIG.brand.name}. All rights reserved.
          </p>
          <p>
            Independent AI-Assisted Creative Studio · {STUDIO_CONFIG.brand.locationFull}
          </p>
        </div>
      </div>
    </footer>
  );
};
