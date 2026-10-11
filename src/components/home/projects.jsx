import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
  Maximize2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { selectedWork } from "../../data/selectedWork";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewProject, setPreviewProject] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const total = selectedWork.length;
  const lenis = useLenis();

  // Touch and drag coordinates
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent background scroll when modal is open (both native body and Lenis)
  useEffect(() => {
    if (previewProject) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [previewProject, lenis]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setPreviewProject(null);
      }
      if (!previewProject) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext, previewProject]);

  // Touch events with vertical scroll protection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // If vertical gesture is dominant, do not change slide (user is scrolling down the page)
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    // Only swipe if intentional horizontal movement > 50px
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="work"
      className="w-full bg-black text-white py-14 sm:py-18 md:py-20 px-4 sm:px-6 md:px-10 lg:px-12 relative overflow-hidden flex flex-col items-center select-none"
      role="region"
      aria-label="Featured projects 3D showcase"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.025] rounded-full blur-[160px]" />

      {/* Main Container: Split 2-Column with Generous Spacing Gutter */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-20 relative z-10">
        
        {/* LEFT COLUMN: Header, Details, Jump Pills & Controls (No bulky snapshot bar) */}
        <div className="w-full lg:w-[38%] xl:w-[36%] text-center lg:text-left flex flex-col items-center lg:items-start shrink-0">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/70 font-mono">
              Featured Work &amp; Systems
            </span>
          </div>

          {/* Big Section Title */}
          <h2
            style={{ fontFamily: "stain" }}
            className="text-4xl sm:text-5xl md:text-6xl uppercase font-bold tracking-tight text-white leading-none mb-3"
          >
            Selected Projects
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/65 max-w-sm leading-relaxed mb-6">
            Interactive 3D showcase. Click any card to inspect full architecture decisions, edge constraints, and production benchmarks.
          </p>

          {/* Quick Jump Pills */}
          <div className="w-full max-w-sm mb-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2.5">
              Jump to Project
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
              {selectedWork.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 border cursor-pointer ${
                    idx === activeIndex
                      ? "bg-white text-black border-white font-semibold scale-105 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                      : "bg-white/[0.03] text-white/55 border-white/10 hover:text-white hover:border-white/30"
                  }`}
                  aria-label={`Jump to project ${project.title}`}
                >
                  {project.title}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Buttons & Pagination Dots */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 transition active:scale-95 shadow-md cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/40 transition active:scale-95 shadow-md cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {selectedWork.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIndex
                      ? "w-7 bg-white"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="font-mono text-xs text-white/40 ml-1">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Stage & Cards (Strictly Constrained to Prevent Left Overflow) */}
        <div className="w-full lg:w-[60%] xl:w-[62%] relative flex items-center justify-center overflow-visible">
          <div
            className="w-full relative h-[470px] sm:h-[490px] flex items-center justify-center"
            style={{ perspective: isMobile ? "900px" : "1200px" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {selectedWork.map((project, index) => {
              // Calculate shortest circular offset for infinite carousel wrapping
              let offset = (index - activeIndex) % total;
              if (offset > total / 2) {
                offset -= total;
              } else if (offset < -total / 2) {
                offset += total;
              }

              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Only render active card + 1 immediate neighbor on each side
              const isVisible = absOffset <= 1;
              if (!isVisible) return null;

              let translateX = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              const zIndex = 30 - absOffset * 10;

              if (isMobile) {
                translateX = offset * 70;
                translateZ = isActive ? 0 : -80;
                rotateY = offset * -18;
                scale = isActive ? 1 : 0.88;
                opacity = isActive ? 1 : 0.45;
              } else {
                // Tightly constrained horizontal translation so the cards stay well clear of the left text
                translateX = offset * 46;
                translateZ = isActive ? 25 : -90;
                rotateY = offset * -22;
                scale = isActive ? 1.02 : 0.86;
                opacity = isActive ? 1 : 0.55;
              }

              const hasImgError = imageErrors[project.id];
              const initial = (project.title || "").trim().slice(0, 1).toUpperCase();

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      setPreviewProject(project);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    willChange: "transform, opacity",
                    transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                  }}
                  className={`absolute top-0 w-[84vw] max-w-[330px] sm:max-w-[360px] md:max-w-[370px] h-[450px] sm:h-[475px] rounded-2xl border transition-colors duration-500 overflow-hidden cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? "border-white/35 bg-gradient-to-b from-[#161616] via-[#0d0d0d] to-black shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/15"
                      : "border-white/10 bg-black/85 hover:border-white/20 shadow-xl"
                  }`}
                >
                  {/* Media Banner */}
                  <div className="relative w-full h-38 sm:h-42 bg-black/80 overflow-hidden shrink-0 border-b border-white/10">
                    {project.image && !hasImgError ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={1200}
                        height={630}
                        loading="lazy"
                        onError={() => handleImageError(project.id)}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isActive ? "scale-100 contrast-105" : "grayscale contrast-125 scale-95"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/10 via-black to-black flex items-center justify-center">
                        <div className="h-14 w-14 rounded-2xl border border-white/20 bg-black/40 flex items-center justify-center">
                          <span
                            style={{ fontFamily: "stain" }}
                            className="text-3xl text-white select-none"
                          >
                            {initial || "•"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Eyebrow & Year Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-white/90">
                        {project.eyebrow?.split("•")[0]?.trim() || "Project"}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-white/70 bg-black/80 backdrop-blur-md border border-white/15">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          style={{ fontFamily: "stain" }}
                          className="text-2xl sm:text-3xl uppercase font-bold text-white tracking-tight leading-none"
                        >
                          {project.title}
                        </h3>
                        {isActive && (
                          <span className="text-[10px] font-mono text-white/50 flex items-center gap-1">
                            <Maximize2 size={11} />
                            <span>Preview</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed line-clamp-2 mb-2.5">
                        {project.oneLiner}
                      </p>

                      {/* Problem snippet */}
                      <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2.5 mb-2.5 text-[11px] text-white/70 line-clamp-2">
                        <span className="text-white/40 font-mono uppercase text-[9px] block mb-0.5">Problem</span>
                        {project.problem}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack?.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-white/60 border border-white/10 bg-white/[0.02]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack?.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-white/40">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="flex items-center gap-2 pt-2.5 border-t border-white/10 mt-2.5 text-xs font-mono">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewProject(project);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition text-xs shadow-sm cursor-pointer"
                        aria-label={`View full details of ${project.title}`}
                      >
                        <span>Full Details</span>
                        <Maximize2 size={12} />
                      </button>

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg border border-white/20 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition"
                          title="Open Live Demo"
                          aria-label={`Open live demo of ${project.title}`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg border border-white/20 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition"
                          title="View GitHub Repository"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Stage Side Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute -left-2 sm:-left-3 z-40 h-11 w-11 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl text-white/80 hover:text-white hover:border-white/40 hover:bg-white/15 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] active:scale-90 cursor-pointer flex items-center justify-center group ring-1 ring-white/10"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-2 sm:-right-3 z-40 h-11 w-11 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl text-white/80 hover:text-white hover:border-white/40 hover:bg-white/15 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] active:scale-90 cursor-pointer flex items-center justify-center group ring-1 ring-white/10"
              aria-label="Next project"
            >
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>

      {/* FULL PREVIEW MODAL — with no-scrollbar class to eliminate the vertical scrollbar track */}
      {previewProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
          data-lenis-prevent="true"
          onClick={() => setPreviewProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewProject.title} project details`}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl border border-white/20 bg-[#0e0e0e] shadow-2xl text-left flex flex-col overflow-hidden"
            data-lenis-prevent="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Modal Top Bar: 100% solid, non-scrolling header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-white/10 bg-[#0e0e0e] shrink-0 z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/15">
                  {previewProject.eyebrow}
                </span>
                <span className="px-2 py-0.5 text-xs font-mono text-white/60">
                  {previewProject.year}
                </span>
              </div>
              <button
                onClick={() => setPreviewProject(null)}
                className="p-2 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dedicated Scrollable Content: cleanly clipped below the header line */}
            <div
              className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-10 overscroll-contain"
              tabIndex={-1}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Title & One-liner */}
            <h2
              style={{ fontFamily: "stain" }}
              className="text-4xl sm:text-5xl uppercase font-bold text-white tracking-tight leading-none mb-3"
            >
              {previewProject.title}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              {previewProject.oneLiner}
            </p>

            {/* Media Banner in Modal */}
            {previewProject.image && !imageErrors[previewProject.id] && (
              <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 mb-8 bg-black">
                <img
                  src={previewProject.image}
                  alt={`${previewProject.title} full overview`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Action Links Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {previewProject.liveLink && (
                <a
                  href={previewProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition text-sm shadow-md"
                >
                  <span>Open Live Demo</span>
                  <ExternalLink size={15} />
                </a>
              )}
              {previewProject.githubLink && (
                <a
                  href={previewProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/35 transition text-sm"
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Detailed Content */}
            <div className="space-y-6 text-sm text-white/80 leading-relaxed">
              {/* Problem */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                <p className="text-xs uppercase font-mono tracking-widest text-white/40 mb-2">
                  The Problem
                </p>
                <p>{previewProject.problem}</p>
              </div>

              {/* Approach */}
              {previewProject.approach && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase font-mono tracking-widest text-white/40 mb-2">
                    Approach &amp; Architecture
                  </p>
                  <p>{previewProject.approach}</p>
                </div>
              )}

              {/* Key Technical Decisions */}
              {previewProject.decisions?.length > 0 && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase font-mono tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-white/60" />
                    <span>Key Architectural Decisions</span>
                  </p>
                  <ul className="space-y-2.5">
                    {previewProject.decisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/75">
                        <CheckCircle2 size={16} className="text-white/60 shrink-0 mt-0.5" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcome */}
              {previewProject.outcome && (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5">
                  <p className="text-xs uppercase font-mono tracking-widest text-white/40 mb-2">
                    Outcome &amp; Performance
                  </p>
                  <p>{previewProject.outcome}</p>
                </div>
              )}

              {/* Tech Stack */}
              <div className="pt-2">
                <p className="text-xs uppercase font-mono tracking-widest text-white/40 mb-3">
                  Technologies &amp; Libraries
                </p>
                <div className="flex flex-wrap gap-2">
                  {previewProject.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/15 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}