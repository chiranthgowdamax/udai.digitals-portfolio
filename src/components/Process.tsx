import React from 'react';
import { STUDIO_CONFIG } from '../config/studioConfig';

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="py-20 sm:py-28 bg-[#0B0E17] text-white border-b border-white/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#687DF7] mb-3">
            03 · OUR PROCESS
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.12] mb-4"
            style={{ textWrap: 'balance' }}
          >
            From business idea to ready-to-publish visual.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            A clear, four-step workflow combining human creative direction with modern AI-assisted production.
          </p>
        </div>

        {/* 4-Step Horizontal Process on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDIO_CONFIG.process.map((step) => (
            <div
              key={step.number}
              className="bg-[#111420] rounded-2xl border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#687DF7]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <span className="font-display text-sm font-bold text-[#687DF7] tabular-nums">
                    {step.number}{' '}
                    <span className="text-[#F59E42]">—</span> {step.title}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2.5">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-slate-200 leading-snug mb-3">
                  {step.description}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-4 border-t border-white/10">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
