import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG, PortfolioProject } from '../config/studioConfig';
import { ProjectMediaSlot } from './ProjectMediaSlot';
import { HeroParticleBackground } from './HeroParticleBackground';

interface HeroProps {
  projects: PortfolioProject[];
  customImages: Record<string, string>;
  onSelectProject: (project: PortfolioProject) => void;
}

export const Hero: React.FC<HeroProps> = ({
  projects,
  customImages,
  onSelectProject,
}) => {
  const primaryShowcase = projects[0];
  const secondaryShowcase = projects[1];
  const tertiaryShowcase = projects[2];

  return (
    <section className="relative bg-[#07080D] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-b border-white/10 overflow-hidden">
      <HeroParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Small Introductory Label */}
              <p className="text-xs sm:text-sm font-medium tracking-[0.14em] text-[#687DF7] mb-5 sm:mb-6">
                {STUDIO_CONFIG.hero.kicker}
              </p>

              {/* Main Editorial Headline */}
              <h1
                className="font-display font-bold text-white tracking-tight leading-[1.06] mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.35rem)',
                  textWrap: 'balance',
                }}
              >
                Make your brand{' '}
                <span className="text-[#687DF7]">impossible to ignore</span>
                <span className="text-[#F59E42]">.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-[1.65] max-w-[56ch] mb-8 sm:mb-10">
                {STUDIO_CONFIG.hero.supportingText}
              </p>

              {/* Two CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#687DF7] hover:bg-[#546AE8] rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E42]"
                >
                  <span>{STUDIO_CONFIG.hero.primaryCta}</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#687DF7]"
                >
                  <span>{STUDIO_CONFIG.hero.secondaryCta}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F59E42]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Studio Core Positioning & Target Sectors Footnote */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs font-medium tracking-[0.12em] text-slate-400 mb-2.5">
                BUILT FOR AMBITIOUS LOCAL BRANDS
              </p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm text-slate-300">
                {STUDIO_CONFIG.brand.targetCustomers.map((sector, idx) => (
                  <React.Fragment key={sector}>
                    <span>{sector}</span>
                    {idx < STUDIO_CONFIG.brand.targetCustomers.length - 1 && (
                      <span aria-hidden="true" className="text-[#F59E42] font-semibold">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Asymmetric Visual Composition using Portfolio Slots + UDai Digitals Logo */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-start">
              {/* Dominant Left/Top Card */}
              {primaryShowcase && (
                <div className="col-span-7 flex flex-col gap-3.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectProject(primaryShowcase)}
                    className="group relative w-full text-left bg-[#111420] p-2 sm:p-2.5 rounded-2xl border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#687DF7]/50 focus-visible:outline-2 focus-visible:outline-[#687DF7]"
                    aria-label={`Inspect ${primaryShowcase.project} — ${primaryShowcase.category}`}
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                      <ProjectMediaSlot
                        project={primaryShowcase}
                        customImageUrl={customImages[primaryShowcase.id]}
                        compact
                        darkSurface
                      />
                    </div>
                    <div className="pt-2.5 px-1 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-300">
                      <span className="font-medium text-white truncate">
                        {primaryShowcase.project}
                      </span>
                      <span className="text-slate-400 truncate">
                        {primaryShowcase.category}
                      </span>
                    </div>
                  </button>

                  {/* UDai Digitals Logo Feature Card */}
                  <div className="bg-[#111420] text-white rounded-2xl p-4 sm:p-5 border border-[#687DF7]/30 flex items-center gap-3.5">
                    <img
                      src={STUDIO_CONFIG.brand.logo}
                      alt={`${STUDIO_CONFIG.brand.name} logo`}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-contain bg-black border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-sm sm:text-base font-bold text-white truncate">
                        UD<span className="text-[#687DF7]">ai</span> Digitals
                      </p>
                      <p className="text-xs text-[#687DF7] font-medium mt-0.5">
                        {STUDIO_CONFIG.brand.logoSubtext}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {STUDIO_CONFIG.brand.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Staggered Right Column Stack */}
              <div className="col-span-5 flex flex-col gap-3.5 sm:gap-4 pt-6 sm:pt-8">
                {secondaryShowcase && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(secondaryShowcase)}
                    className="group relative w-full text-left bg-[#111420] p-2 rounded-2xl border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#687DF7]/50 focus-visible:outline-2 focus-visible:outline-[#687DF7]"
                    aria-label={`Inspect ${secondaryShowcase.project} — ${secondaryShowcase.category}`}
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                      <ProjectMediaSlot
                        project={secondaryShowcase}
                        customImageUrl={customImages[secondaryShowcase.id]}
                        compact
                        darkSurface
                      />
                    </div>
                    <div className="pt-2 px-1">
                      <p className="text-[11px] font-medium text-white truncate">
                        {secondaryShowcase.project}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {secondaryShowcase.category}
                      </p>
                    </div>
                  </button>
                )}

                {tertiaryShowcase && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(tertiaryShowcase)}
                    className="group relative w-full text-left bg-[#111420] p-2 rounded-2xl border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#687DF7]/50 focus-visible:outline-2 focus-visible:outline-[#687DF7]"
                    aria-label={`Inspect ${tertiaryShowcase.project} — ${tertiaryShowcase.category}`}
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                      <ProjectMediaSlot
                        project={tertiaryShowcase}
                        customImageUrl={customImages[tertiaryShowcase.id]}
                        compact
                        darkSurface
                      />
                    </div>
                    <div className="pt-2 px-1">
                      <p className="text-[11px] font-medium text-white truncate">
                        {tertiaryShowcase.project}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {tertiaryShowcase.category}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
