/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { STUDIO_CONFIG, PortfolioProject } from './config/studioConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';

const STORAGE_KEY = 'udai_digitals_custom_artwork_v1';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, string>) : {};
    } catch {
      return {};
    }
  });

  // Sync custom uploaded artwork to localStorage safely
  useEffect(() => {
    try {
      if (Object.keys(customImages).length === 0) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customImages));
      }
    } catch {
      // Fallback to in-memory session state if browser localStorage quota is exceeded
    }
  }, [customImages]);

  // Only display projects whose contact details, website, and QR code have been verified/removed
  const verifiedProjects = useMemo(
    () => STUDIO_CONFIG.projects.filter((project) => project.isVerified),
    []
  );

  const handleUploadCustomImage = (projectId: string, dataUrl: string) => {
    setCustomImages((prev) => ({
      ...prev,
      [projectId]: dataUrl,
    }));
  };

  const handleResetCustomImage = (projectId: string) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080D] text-[#0B0E17]">
      <Navbar />

      <main className="flex-1">
        <Hero
          projects={verifiedProjects}
          customImages={customImages}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SelectedWork
          projects={verifiedProjects}
          customImages={customImages}
          onSelectProject={(project) => setSelectedProject(project)}
          onUploadCustomImage={handleUploadCustomImage}
          onResetCustomImage={handleResetCustomImage}
        />

        <Services />

        <Process />

        <About />

        <Contact />
      </main>

      <Footer />

      <Lightbox
        project={selectedProject}
        projects={verifiedProjects}
        customImages={customImages}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        onUploadCustomImage={handleUploadCustomImage}
      />
    </div>
  );
}
