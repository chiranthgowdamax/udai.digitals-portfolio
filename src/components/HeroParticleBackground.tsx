import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  depth: number;
}

const THEME_COLORS = [
  '104, 125, 247', // UDai Periwinkle Blue (#687DF7)
  '104, 125, 247', // Weighted higher for primary brand tone
  '245, 158, 66',  // UDai Amber Dot (#F59E42)
  '226, 232, 240', // Crisp Soft White/Slate
];

export const HeroParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Normalized pointer offset (-1 to 1) & smooth lerped target
    const pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      rawX: -9999,
      rawY: -9999,
    };

    const createParticles = (w: number, h: number) => {
      // Responsive particle count capped for clean visual restraint & 60fps performance
      const count = Math.min(Math.max(Math.floor((w * h) / 18000), 28), 64);
      const list: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const isAmber = i % 7 === 0;
        const color = isAmber
          ? THEME_COLORS[2]
          : THEME_COLORS[i % THEME_COLORS.length];

        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: isAmber ? Math.random() * 1.6 + 1.4 : Math.random() * 1.5 + 0.9,
          color,
          alpha: isAmber ? 0.65 : Math.random() * 0.4 + 0.22,
          depth: Math.random() * 0.75 + 0.25, // Parallax depth multiplier
        });
      }

      return list;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      if (relX >= 0 && relX <= width && relY >= 0 && relY <= height) {
        pointer.targetX = (relX / width - 0.5) * 2;
        pointer.targetY = (relY / height - 0.5) * 2;
        pointer.rawX = relX;
        pointer.rawY = relY;
      } else {
        pointer.rawX = -9999;
        pointer.rawY = -9999;
      }
    };

    const handleMouseLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.rawX = -9999;
      pointer.rawY = -9999;
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse parallax
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.045;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.045;

      const parallaxMax = 24;

      // Update positions and draw subtle constellation links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges smoothly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        const drawX = p.x + pointer.currentX * parallaxMax * p.depth;
        const drawY = p.y + pointer.currentY * parallaxMax * p.depth;

        // Subtle connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const drawX2 = p2.x + pointer.currentX * parallaxMax * p2.depth;
          const drawY2 = p2.y + pointer.currentY * parallaxMax * p2.depth;

          const dx = drawX - drawX2;
          const dy = drawY - drawY2;
          const distSq = dx * dx + dy * dy;
          const maxDist = 130;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.11;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(drawX2, drawY2);
            ctx.strokeStyle = `rgba(104, 125, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Subtle connection to cursor when within range
        if (pointer.rawX > 0 && !shouldReduceMotion) {
          const cdx = drawX - pointer.rawX;
          const cdy = drawY - pointer.rawY;
          const cDistSq = cdx * cdx + cdy * cdy;
          const cursorMaxDist = 160;

          if (cDistSq < cursorMaxDist * cursorMaxDist) {
            const cDist = Math.sqrt(cDistSq);
            const cursorLineAlpha = (1 - cDist / cursorMaxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(pointer.rawX, pointer.rawY);
            ctx.strokeStyle = `rgba(104, 125, 247, ${cursorLineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      if (!shouldReduceMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    handleResize();
    renderFrame();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Subtle ambient glow accents matching logo palette */}
      <div className="absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#687DF7]/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#F59E42]/5 blur-3xl" />
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
