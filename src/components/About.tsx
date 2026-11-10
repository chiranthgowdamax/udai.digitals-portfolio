import React from 'react';
import { MapPin } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#F5F7FC] text-[#0B0E17] border-b border-slate-200"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Editorial Headline & Authentic Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#687DF7] mb-3">
              04 · ABOUT
            </p>

            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0E17] tracking-tight leading-[1.1] mb-8"
              style={{ textWrap: 'balance' }}
            >
              {STUDIO_CONFIG.about.headline}
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-[1.7] max-w-[62ch]">
              {STUDIO_CONFIG.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
              <MapPin className="w-4 h-4 text-[#687DF7] shrink-0" aria-hidden="true" />
              <span>{STUDIO_CONFIG.brand.locationFull}</span>
            </div>
          </div>

          {/* Right Column: Studio Principles Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#687DF7] pb-4 mb-6 border-b border-slate-200">
              STUDIO APPROACH
            </p>

            <div className="space-y-6">
              {STUDIO_CONFIG.about.principles.map((item, idx) => (
                <div
                  key={item.title}
                  className={
                    idx < STUDIO_CONFIG.about.principles.length - 1
                      ? 'pb-6 border-b border-slate-200'
                      : ''
                  }
                >
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#0B0E17] mb-1.5">
                    <span className="text-[#687DF7]">0{idx + 1}</span>
                    <span className="text-[#F59E42]">.</span> {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
