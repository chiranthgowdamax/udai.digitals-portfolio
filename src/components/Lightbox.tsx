import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ImagePlus } from 'lucide-react';
import { PortfolioProject, STUDIO_CONFIG } from '../config/studioConfig';
import { ProjectMediaSlot } from './ProjectMediaSlot';

interface LightboxProps {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  customImages: Record<string, string>;
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  onUploadCustomImage: (projectId: string, dataUrl: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  project,
  projects,
  customImages,
  onClose,
  onSelectProject,
  onUploadCustomImage,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentIndex = project
    ? projects.findIndex((p) => p.id === project.id)
    : -1;

  const handlePrev = () => {
    if (projects.length <= 1 || currentIndex === -1) return;
    setIsZoomed(false);
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx]);
  };

  const handleNext = () => {
    if (projects.length <= 1 || currentIndex === -1) return;
    setIsZoomed(false);
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx]);
  };

  useEffect(() => {
    if (!project) return;
    setIsZoomed(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, currentIndex, projects]);

  if (!project) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadCustomImage(project.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.project} — ${project.category} full-size view`}
      className="fixed inset-0 z-50 bg-[#07080D]/95 backdrop-blur-sm flex flex-col justify-between overflow-y-auto"
      onClick={onClose}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Top Lightbox Bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#07080D]/90 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-200">
          <span className="font-display font-semibold text-white">
            {project.project}
          </span>
          <span aria-hidden="true" className="text-[#F59E42]">
            ·
          </span>
          <span className="text-[#687DF7] font-medium">{project.category}</span>
          <span aria-hidden="true" className="hidden sm:inline text-white/40">
            ·
          </span>
          <span className="hidden sm:inline text-slate-400">{project.label}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#687DF7] hover:bg-[#546AE8] transition-colors whitespace-nowrap cursor-pointer"
          >
            <ImagePlus className="w-4 h-4" />
            <span>Replace Artwork</span>
          </button>

          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-4 h-4" />
                <span className="hidden sm:inline">Fit to Screen</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">Zoom</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-white bg-white/10 hover:bg-[#687DF7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image & Details Area */}
      <div
        className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Artwork Viewport */}
        <div className="lg:col-span-8 flex items-center justify-center relative">
          {projects.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="absolute left-2 sm:left-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#07080D]/80 text-white border border-white/15 hover:bg-[#687DF7] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            className={`w-full max-w-[540px] overflow-auto rounded-xl bg-[#111420] border border-white/10 transition-all duration-200 ${
              project.aspectRatio === '3:4' ? 'aspect-[3/4]' : 'aspect-[4/3]'
            } ${isZoomed ? 'scale-110 cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed((prev) => !prev)}
          >
            <ProjectMediaSlot
              project={project}
              customImageUrl={customImages[project.id]}
              darkSurface
            />
          </div>

          {projects.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="absolute right-2 sm:right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#07080D]/80 text-white border border-white/15 hover:bg-[#687DF7] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Project Editorial Notes */}
        <div className="lg:col-span-4 bg-[#111420] border border-white/10 rounded-2xl p-6 text-slate-200">
          <div className="text-xs text-[#687DF7] font-semibold mb-2">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {project.category}
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            {project.project}
          </h3>

          <p className="text-xs text-[#F59E42] font-medium mb-5">{project.label}</p>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-1">
                Target Image File
              </h4>
              <p className="font-mono text-xs text-[#687DF7]">
                /public/{project.fileName} ({project.aspectRatio})
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-1">
                Project Brief
              </h4>
              <p>{project.summary}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 mb-1">
                Creative Direction
              </h4>
              <p>{project.creativeDirection}</p>
            </div>

            <div className="pt-3 border-t border-white/10">
              <h4 className="text-xs font-semibold text-slate-400 mb-1.5">
                Deliverables Demonstrated
              </h4>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-200">
                {project.deliverables.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {idx < project.deliverables.length - 1 && (
                      <span aria-hidden="true" className="text-[#F59E42]">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed">
            {STUDIO_CONFIG.portfolioDisclosure}
          </p>
        </div>
      </div>
    </div>
  );
};
