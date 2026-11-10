import React, { useState, useMemo, useRef } from 'react';
import { Maximize2, Info, ImagePlus, RotateCcw } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { STUDIO_CONFIG, PortfolioProject } from '../config/studioConfig';
import { ProjectMediaSlot } from './ProjectMediaSlot';

interface SelectedWorkProps {
  projects: PortfolioProject[];
  customImages: Record<string, string>;
  onSelectProject: (project: PortfolioProject) => void;
  onUploadCustomImage: (projectId: string, dataUrl: string) => void;
  onResetCustomImage: (projectId: string) => void;
}

interface TiltProjectCardProps {
  item: PortfolioProject;
  idx: number;
  customImageUrl?: string;
  shouldReduceMotion: boolean;
  onSelectProject: (project: PortfolioProject) => void;
  onUploadCustomImage: (projectId: string, dataUrl: string) => void;
  onResetCustomImage: (projectId: string) => void;
}

const TiltProjectCard: React.FC<TiltProjectCardProps> = ({
  item,
  idx,
  customImageUrl,
  shouldReduceMotion,
  onSelectProject,
  onUploadCustomImage,
  onResetCustomImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for natural 3D tilt settling
  const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5.5, -5.5]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5.5, 5.5]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadCustomImage(item.id, reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const hasCustomArtwork = Boolean(customImageUrl);

  return (
    <motion.article
      ref={cardRef}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : (idx % 2) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
      }
      className={`group bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs hover:shadow-lg transition-shadow duration-200 hover:border-[#687DF7]/50 will-change-transform ${
        idx % 2 === 1 ? 'md:mt-8' : ''
      }`}
    >
      {/* Hidden file input per card */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-label={`Replace artwork for ${item.project}`}
        onChange={handleFileChange}
      />

      {/* Clickable Artwork Frame Preserving Native Aspect Ratio */}
      <div
        className="relative overflow-hidden rounded-xl bg-[#F5F7FC] border border-slate-200"
        style={shouldReduceMotion ? undefined : { transform: 'translateZ(18px)' }}
      >
        <button
          type="button"
          onClick={() => onSelectProject(item)}
          className="relative block w-full text-left overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#687DF7]"
          aria-label={`Open full-size lightbox for ${item.project} (${item.category})`}
        >
          <div
            className={`w-full overflow-hidden ${
              item.aspectRatio === '3:4' ? 'aspect-[3/4]' : 'aspect-[4/3]'
            }`}
          >
            <ProjectMediaSlot project={item} customImageUrl={customImageUrl} />
          </div>

          {/* Subtle Lightbox Affordance Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080D]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4 sm:p-5">
            <span className="text-xs sm:text-sm font-medium text-white">
              Click to open full-size lightbox
            </span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white text-[#0B0E17]">
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </button>
      </div>

      {/* Editorial Caption, Unboxed Metadata & Visible 'Replace Artwork' Action Bar */}
      <div
        className="pt-5 sm:pt-6"
        style={shouldReduceMotion ? undefined : { transform: 'translateZ(12px)' }}
      >
        {/* Metadata Line + Visible Replace Artwork Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#687DF7]">{item.category}</span>
            <span aria-hidden="true" className="text-[#F59E42]">
              ·
            </span>
            <span>{item.label}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#687DF7] hover:bg-[#546AE8] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B0E17]"
            >
              <ImagePlus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replace Artwork</span>
            </button>

            {hasCustomArtwork && (
              <button
                type="button"
                onClick={() => onResetCustomImage(item.id)}
                aria-label={`Reset ${item.project} to placeholder`}
                title="Reset to placeholder"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-[#0B0E17] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-2.5">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B0E17] tracking-tight">
            <button
              type="button"
              onClick={() => onSelectProject(item)}
              className="text-left hover:text-[#687DF7] transition-colors focus-visible:outline-2 focus-visible:outline-[#687DF7]"
            >
              {item.project}
            </button>
          </h3>
          <button
            type="button"
            onClick={() => onSelectProject(item)}
            className="text-xs font-medium text-slate-600 hover:text-[#687DF7] transition-colors whitespace-nowrap shrink-0"
          >
            Inspect Full Size →
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
          {item.summary}
        </p>

        {/* Unboxed Deliverables Metadata */}
        <div className="pt-3.5 border-t border-slate-200 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold text-[#0B0E17]">Scope:</span>
          {item.deliverables.map((del, dIdx) => (
            <React.Fragment key={del}>
              <span>{del}</span>
              {dIdx < item.deliverables.length - 1 && (
                <span aria-hidden="true" className="text-[#F59E42]">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  customImages,
  onSelectProject,
  onUploadCustomImage,
  onResetCustomImage,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = Boolean(useReducedMotion());

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section
      id="work"
      className="py-20 sm:py-28 bg-[#F5F7FC] text-[#0B0E17] border-b border-slate-200"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#687DF7] mb-3">
              01 · SELECTED WORK
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#0B0E17] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Commercial concepts built for visual impact.
            </h2>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter portfolio projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl self-start lg:self-auto shadow-2xs"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#687DF7] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#0B0E17] hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mandatory Transparent Concept Disclosure Banner */}
        <div className="mb-10 sm:mb-12 p-4 sm:p-5 rounded-xl bg-[#687DF7]/10 border border-[#687DF7]/25 flex items-start gap-3.5">
          <Info className="w-4 h-4 text-[#687DF7] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-[#0B0E17]">Portfolio Disclosure: </span>
            {STUDIO_CONFIG.portfolioDisclosure}
          </p>
        </div>

        {/* Responsive Editorial Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-start">
          {filteredProjects.map((item, idx) => (
            <TiltProjectCard
              key={item.id}
              item={item}
              idx={idx}
              customImageUrl={customImages[item.id]}
              shouldReduceMotion={shouldReduceMotion}
              onSelectProject={onSelectProject}
              onUploadCustomImage={onUploadCustomImage}
              onResetCustomImage={onResetCustomImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
