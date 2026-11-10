import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-white text-[#0B0E17] border-b border-slate-200"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#687DF7] mb-3">
              02 · SERVICES
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0B0E17] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Practical visual design tailored for everyday business communication.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base text-slate-600 leading-relaxed">
              {STUDIO_CONFIG.brand.positioning}
            </p>
          </div>
        </div>

        {/* Four Editorial Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {STUDIO_CONFIG.services.map((service) => (
            <article
              key={service.id}
              className="bg-[#F5F7FC] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:border-[#687DF7]"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200">
                  <span className="font-display text-sm font-bold text-[#687DF7] tabular-nums">
                    {service.index}
                    <span className="text-[#F59E42]">.</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    {STUDIO_CONFIG.brand.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#0B0E17] tracking-tight mb-2.5">
                  {service.title}
                </h3>

                <p className="text-base font-medium text-[#0B0E17] mb-3">
                  {service.shortDescription}
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {service.businessValue}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className="font-semibold text-[#0B0E17]">Suited for:</span>
                  {service.idealFor.map((useCase, idx) => (
                    <React.Fragment key={useCase}>
                      <span>{useCase}</span>
                      {idx < service.idealFor.length - 1 && (
                        <span aria-hidden="true" className="text-[#F59E42]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#687DF7] hover:text-[#546AE8] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
