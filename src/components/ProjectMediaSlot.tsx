import React, { useState, useEffect } from 'react';
import { ImagePlus, Frame } from 'lucide-react';
import { PortfolioProject } from '../config/studioConfig';

interface ProjectMediaSlotProps {
  project: PortfolioProject;
  customImageUrl?: string;
  compact?: boolean;
  darkSurface?: boolean;
  className?: string;
}

/**
 * Renders the portfolio image if present in `/public/<fileName>` or uploaded via the browser.
 * When no image file is active yet, renders a clean placeholder frame styled with
 * the UDai Digitals periwinkle (#687DF7) & amber (#F59E42) palette.
 */
export const ProjectMediaSlot: React.FC<ProjectMediaSlotProps> = ({
  project,
  customImageUrl,
  compact = false,
  darkSurface = false,
  className = '',
}) => {
  const [fileMissing, setFileMissing] = useState(true);
  const [checkedStaticFile, setCheckedStaticFile] = useState(false);

  const activeSrc = customImageUrl || project.image;

  useEffect(() => {
    if (customImageUrl) {
      setFileMissing(false);
      setCheckedStaticFile(true);
      return;
    }

    let isMounted = true;
    const img = new Image();
    img.onload = () => {
      if (isMounted) {
        setFileMissing(false);
        setCheckedStaticFile(true);
      }
    };
    img.onerror = () => {
      if (isMounted) {
        setFileMissing(true);
        setCheckedStaticFile(true);
      }
    };
    img.src = project.image;

    return () => {
      isMounted = false;
    };
  }, [project.image, customImageUrl]);

  if (!fileMissing && checkedStaticFile) {
    return (
      <img
        src={activeSrc}
        alt={project.alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFileMissing(true)}
        className={`w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025] ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden ${
        darkSurface
          ? 'bg-[#0D101B] text-white'
          : 'bg-[#F5F7FC] text-[#0B0E17]'
      } ${className}`}
      style={{
        backgroundImage: darkSurface
          ? 'radial-gradient(rgba(104, 125, 247, 0.16) 1px, transparent 1px)'
          : 'radial-gradient(rgba(104, 125, 247, 0.18) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Architectural dashed inner frame */}
      <div
        className={`pointer-events-none absolute inset-2.5 sm:inset-3.5 border border-dashed rounded-lg transition-colors ${
          darkSurface
            ? 'border-[#687DF7]/30 group-hover:border-[#687DF7]/60'
            : 'border-[#687DF7]/35 group-hover:border-[#687DF7]'
        }`}
      />

      {/* Top Row: Aspect Ratio & Placeholder Status */}
      <div
        className={`relative z-10 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono ${
          darkSurface ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        <span>{project.aspectRatio} RATIO</span>
        <span className="text-[#687DF7] font-semibold">PLACEHOLDER SLOT</span>
      </div>

      {/* Center: Project Identity & Icon */}
      <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 transition-colors border ${
            darkSurface
              ? 'bg-[#15192B] border-[#687DF7]/30 group-hover:border-[#F59E42]'
              : 'bg-white border-[#687DF7]/25 shadow-2xs group-hover:border-[#687DF7]'
          }`}
        >
          {compact ? (
            <Frame className="w-4 h-4 text-[#687DF7]" aria-hidden="true" />
          ) : (
            <ImagePlus className="w-5 h-5 text-[#687DF7]" aria-hidden="true" />
          )}
        </div>

        <p
          className={`font-display font-bold tracking-tight ${
            darkSurface ? 'text-white' : 'text-[#0B0E17]'
          } ${compact ? 'text-xs sm:text-sm' : 'text-base sm:text-xl'}`}
        >
          {project.project}
        </p>

        <p
          className={`mt-0.5 ${
            darkSurface ? 'text-slate-400' : 'text-slate-600'
          } ${compact ? 'text-[10px]' : 'text-xs sm:text-sm'}`}
        >
          {project.category}
        </p>

        {!compact && (
          <div
            className={`mt-3 px-3 py-1.5 rounded-md border text-[11px] font-mono ${
              darkSurface
                ? 'bg-[#15192B] border-white/10 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            /public/{project.fileName}
          </div>
        )}
      </div>

      {/* Bottom Row: File Hint */}
      <div
        className={`relative z-10 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] ${
          darkSurface ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        <span className="truncate font-mono">{project.fileName}</span>
        {!compact && (
          <span className="text-[#687DF7] font-medium">
            Use &ldquo;Replace Artwork&rdquo; below
          </span>
        )}
      </div>
    </div>
  );
};
