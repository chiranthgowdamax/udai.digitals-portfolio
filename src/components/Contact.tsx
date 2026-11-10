import React from 'react';
import { Instagram, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { STUDIO_CONFIG } from '../config/studioConfig';

function formatInstagramUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://instagram.com/${trimmed.replace(/^@/, '')}`;
}

function formatWhatsAppUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const digits = trimmed.replace(/[^0-9]/g, '');
  if (!digits) return '';
  // Automatically prepend India country code (+91) for 10-digit local numbers
  const normalizedDigits = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${normalizedDigits}`;
}

function formatEmailUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('mailto:')) return trimmed;
  return `mailto:${trimmed}`;
}

export const Contact: React.FC = () => {
  const { instagram, whatsapp, email, location } = STUDIO_CONFIG.contact.channels;

  const instagramHref = formatInstagramUrl(instagram);
  const whatsappHref = formatWhatsAppUrl(whatsapp);
  const emailHref = formatEmailUrl(email);

  const hasConfiguredButtons = Boolean(instagramHref || whatsappHref || emailHref);

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#07080D] text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Headline & Supporting Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#687DF7] mb-4">
              05 · CONTACT
            </p>

            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5"
              style={{ textWrap: 'balance' }}
            >
              {STUDIO_CONFIG.contact.headline}
            </h2>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-[50ch] mb-8">
              {STUDIO_CONFIG.contact.supportingText}
            </p>

            {/* Configured Contact Buttons (Unconfigured links are hidden automatically) */}
            {hasConfiguredButtons ? (
              <div className="flex flex-wrap items-center gap-4">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#687DF7] hover:bg-[#546AE8] rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}

                {instagramHref && (
                  <a
                    href={instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-[#07080D] bg-white hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <Instagram className="w-4 h-4 text-[#687DF7]" aria-hidden="true" />
                    <span>Instagram (@{instagram.replace(/^@/, '')})</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}

                {emailHref && (
                  <a
                    href={emailHref}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4 text-[#F59E42]" aria-hidden="true" />
                    <span>Email</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            ) : (
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 p-4 sm:p-5 rounded-xl bg-[#111420] border border-white/10 text-xs sm:text-sm text-slate-300">
                <span>
                  Direct Instagram, WhatsApp, and Email links are managed centrally and hidden until configured in{' '}
                  <code className="text-[#687DF7] font-mono">src/config/studioConfig.ts</code>.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Studio Location & Direct Channels Card */}
          <div className="lg:col-span-5 bg-[#111420] border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] text-[#687DF7] pb-4 mb-6 border-b border-white/10">
              STUDIO BASE &amp; DIRECT CHANNELS
            </p>

            <div className="flex items-start gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#687DF7]/15 border border-[#687DF7]/35 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#687DF7]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Location</p>
                <p className="font-display text-lg sm:text-xl font-bold text-white">
                  {location}
                </p>
              </div>
            </div>

            {hasConfiguredButtons && (
              <div className="pt-5 pb-5 border-t border-white/10 space-y-3 text-xs sm:text-sm">
                {whatsappHref && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">WhatsApp</span>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white hover:text-[#687DF7] transition-colors tabular-nums"
                    >
                      +91 {whatsapp.replace(/[^0-9]/g, '').slice(-10)}
                    </a>
                  </div>
                )}

                {instagramHref && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Instagram</span>
                    <a
                      href={instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white hover:text-[#687DF7] transition-colors"
                    >
                      @{instagram.replace(/^@/, '')}
                    </a>
                  </div>
                )}

                {emailHref && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400">Email</span>
                    <a
                      href={emailHref}
                      className="font-medium text-white hover:text-[#687DF7] transition-colors truncate"
                    >
                      {email}
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="pt-5 border-t border-white/10 space-y-2 text-xs sm:text-sm text-slate-300">
              <p className="font-medium text-white">
                Available for promotional design &amp; visual campaigns
              </p>
              <p className="leading-relaxed">
                Collaborating with restaurants, cafes, dessert brands, apparel stores, coaching centres, and local businesses across Karnataka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
