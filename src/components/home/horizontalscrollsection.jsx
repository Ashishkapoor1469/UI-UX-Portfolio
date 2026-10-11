import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import BigTextSlide from "../ui/BigTextSlide";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* --- PURE BLACK & WHITE THEMED SCOUT ROCKET (Dead Straight Upright at 0deg) --- */
function BlackWhiteRocket({ isThrusting = false, className = "" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Crisp monochrome body gradient */}
        <linearGradient id="bwBodyGrad" x1="45" y1="20" x2="75" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#E4E4E7" />
          <stop offset="100%" stopColor="#18181B" />
        </linearGradient>

        {/* White glowing thruster flame */}
        <linearGradient id="bwFlame" x1="60" y1="85" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E4E4E7" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#A1A1AA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <filter id="bwGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(0, -6)">
        {/* Thruster exhaust flame pointing straight downwards */}
        <path
          d="M 54 84 Q 48 104 52 118 Q 60 106 60 92 Q 60 106 68 118 Q 72 104 66 84 Z"
          fill="url(#bwFlame)"
          filter="url(#bwGlow)"
          className={isThrusting ? "animate-pulse" : ""}
          opacity={isThrusting ? 1 : 0.65}
        />
        {/* Core pure white flame */}
        <path
          d="M 56 85 Q 52 98 56 110 Q 60 102 64 110 Q 68 98 64 85 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Left Wing Fin (Perfect Mirror of Right) */}
        <path
          d="M 44 65 C 26 70 18 86 16 94 C 28 92 40 82 44 76 Z"
          fill="#18181B"
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        {/* Right Wing Fin (Perfect Mirror of Left) */}
        <path
          d="M 76 65 C 94 70 102 86 104 94 C 92 92 80 82 76 76 Z"
          fill="#18181B"
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        {/* Main Fuselage Body (Dead symmetrical pointing straight UP to 60, 14) */}
        <path
          d="M 60 14 C 48 30 42 58 44 82 L 76 82 C 78 58 72 30 60 14 Z"
          fill="url(#bwBodyGrad)"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {/* Nose Cone Tip */}
        <path
          d="M 60 14 C 54 22 50 32 50 38 L 70 38 C 70 32 66 22 60 14 Z"
          fill="#09090B"
          stroke="#FFFFFF"
          strokeWidth="1.8"
        />

        {/* Cockpit Window */}
        <ellipse cx="60" cy="46" rx="6" ry="9" fill="#18181B" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="58" cy="44" r="2" fill="#FFFFFF" />

        {/* Specular curved highlight */}
        <path
          d="M 53 26 C 48 40 47 56 48 74"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Symmetrical Sparkle Stars in White */}
        <path d="M 98 28 L 99.5 23 L 101 28 L 106 29.5 L 101 31 L 99.5 36 L 98 31 L 93 29.5 Z" fill="#FFFFFF" />
        <path d="M 22 28 L 20.5 23 L 19 28 L 14 29.5 L 19 31 L 20.5 36 L 22 31 L 27 29.5 Z" fill="#FFFFFF" opacity="0.8" />
      </g>
    </svg>
  );
}

export default function HrSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const arrowsRef = useRef(null);
  const rocketRef = useRef(null);
  const lastWheelTime = useRef(0);

  // Flight Physics State
  const flightStateRef = useRef("orbiting"); // "orbiting" | "flying_scroll"
  const orbitTimeRef = useRef(-Math.PI / 2);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isThrusting, setIsThrusting] = useState(false);
  const lenis = useLenis();

  const sectionsCount = 4;
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(
        window.matchMedia("(pointer: coarse)").matches ||
          window.matchMedia("(max-width: 767px)").matches
      );
    } catch {
      return false;
    }
  });

  const slides = useMemo(
    () => [
      {
        title: "PRODUCT FEEL",
        subtitle: "Not just pages—interfaces with clarity, rhythm, and intent.",
      },
      {
        title: "SYSTEMS MINDSET",
        subtitle: "Design systems + clean APIs so the product can scale.",
      },
      {
        title: "MOTION WITH PURPOSE",
        subtitle: "Feedback, flow, and micro-interactions—never decoration.",
      },
      {
        title: "LET’S SHIP",
        subtitle: "Fast, premium builds—optimized for mobile and real users.",
      },
    ],
    []
  );

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqSmall = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setIsMobile(Boolean(mqCoarse.matches || mqSmall.matches));
    };

    update();
    mqCoarse.addEventListener?.("change", update);
    mqSmall.addEventListener?.("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      mqCoarse.removeEventListener?.("change", update);
      mqSmall.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Sync Lenis scroll updates with GSAP ScrollTrigger
  useEffect(() => {
    if (!lenis) return undefined;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  /* --- CIRCULAR MOTION AROUND TEXT AREA --- */
  useEffect(() => {
    if (isMobile) return undefined;

    const tick = (_time, deltaTime) => {
      if (!rocketRef.current) return;
      const dt = Math.min(deltaTime / 1000, 0.08);

      if (flightStateRef.current === "orbiting") {
        orbitTimeRef.current += dt * 0.75; // smooth graceful orbital speed
        const t = orbitTimeRef.current;

        // Wide circular/oval orbit clearly surrounding the text without overlapping
        const rx = 350;
        const ry = 135;
        const cy = -15;

        const x = Math.cos(t) * rx;
        const y = cy + Math.sin(t) * ry;

        // Tangent heading angle: nose points in flight direction
        const dx = -Math.sin(t) * rx;
        const dy = Math.cos(t) * ry;
        const heading = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

        gsap.set(rocketRef.current, {
          x,
          y,
          rotation: heading,
          scaleX: 1,
          scaleY: 1,
        });
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [isMobile]);

  const stopOrbit = useCallback(() => {
    flightStateRef.current = "flying_scroll";
    setIsThrusting(true);
  }, []);

  const settleToParked = useCallback(() => {
    if (!rocketRef.current || isMobile) return;

    // Smoothly enter circular orbit from top of text area
    orbitTimeRef.current = -Math.PI / 2;
    const cy = -15;
    const ry = 135;
    const topY = cy - ry; // -150px (cleanly above title)

    gsap.to(rocketRef.current, {
      x: 0,
      y: topY,
      rotation: 90, // pointing tangent along orbit
      scaleX: 1,
      scaleY: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        flightStateRef.current = "orbiting";
        setIsThrusting(true);
      },
    });
  }, [isMobile]);

  const activeSlideRef = useRef(0);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  const goToSlide = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= sectionsCount) return;
    if (isTransitioningRef.current) return;

    const prevIndex = activeSlideRef.current;
    if (targetIndex === prevIndex) return;

    activeSlideRef.current = targetIndex;
    setActiveSlide(targetIndex);
    isTransitioningRef.current = true;

    // Break orbit and activate flight thrusters
    stopOrbit();

    // Direction of movement: 90 degree tilt (right for next, left for previous)
    const isForward = targetIndex > prevIndex;
    const tiltAngle = isForward ? 90 : -90;

    // 1. Move section directly to the target slide (always exact 100vw multiples)
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        x: `-${targetIndex * 100}vw`,
        duration: 0.7,
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          isTransitioningRef.current = false;
          settleToParked();
        },
      });
    }

    // 2. Rocket dynamic flight: 90 deg tilt (right for next, left for prev), then glides into orbit
    if (rocketRef.current) {
      gsap.to(rocketRef.current, {
        rotation: tiltAngle, // +90deg pointing right for next, -90deg pointing left for prev
        x: 0,
        y: -140,
        scaleX: 1,
        scaleY: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [sectionsCount, settleToParked, stopOrbit]);

  useEffect(() => {
    // Disable pinned horizontal scroll on mobile/small screens.
    if (isMobile) return undefined;
    const currentSection = sectionRef.current;
    const currentTrigger = triggerRef.current;
    if (!currentSection || !currentTrigger) return undefined;

    // Pin the section while scrolling through the principles slides
    const st = ScrollTrigger.create({
      trigger: currentTrigger,
      start: "top top",
      end: `+=${(sectionsCount - 1) * 750}`,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollTriggerRef.current = self;
        if (isTransitioningRef.current) return;
        const targetIndex = Math.min(
          Math.round(self.progress * (sectionsCount - 1)),
          sectionsCount - 1
        );
        if (targetIndex !== activeSlideRef.current) {
          goToSlide(targetIndex);
        }
      },
      onEnter: () => gsap.to(arrowsRef.current, { autoAlpha: 1, duration: 0.3 }),
      onLeave: () => gsap.to(arrowsRef.current, { autoAlpha: 0, duration: 0.3 }),
      onEnterBack: () => gsap.to(arrowsRef.current, { autoAlpha: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(arrowsRef.current, { autoAlpha: 0, duration: 0.3 }),
    });

    scrollTriggerRef.current = st;

    // Initial launch into circular orbit around active slide's text
    if (rocketRef.current) {
      settleToParked();
    }

    return () => {
      try {
        st.kill(true);
      } catch {
        /* noop */
      }
      scrollTriggerRef.current = null;
      if (currentSection) gsap.set(currentSection, { clearProps: "transform" });
    };
  }, [isMobile, sectionsCount, goToSlide, settleToParked]);

  const goToSection = useCallback((direction) => {
    if (isTransitioningRef.current) return;
    const nextIdx =
      direction === "next"
        ? Math.min(activeSlideRef.current + 1, sectionsCount - 1)
        : Math.max(activeSlideRef.current - 1, 0);

    if (nextIdx === activeSlideRef.current) return;

    goToSlide(nextIdx);

    const st = scrollTriggerRef.current;
    if (st) {
      const snap = 1 / (sectionsCount - 1);
      const targetY = st.start + nextIdx * snap * (st.end - st.start);
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 0.7 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  }, [goToSlide, lenis, sectionsCount]);

  // Smooth wheel paging so the section moves straight to next/prev section instead of stalling midway
  const handleWheel = (e) => {
    if (isMobile) return;
    const st = scrollTriggerRef.current;
    if (!st || !st.isActive) return;
    if (isTransitioningRef.current) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 750) return;

    if (e.deltaY > 20) {
      if (activeSlideRef.current < sectionsCount - 1) {
        lastWheelTime.current = now;
        goToSection("next");
      }
    } else if (e.deltaY < -20) {
      if (activeSlideRef.current > 0) {
        lastWheelTime.current = now;
        goToSection("prev");
      }
    }
  };

  const jumpToSlide = (idx) => {
    if (isTransitioningRef.current || idx === activeSlideRef.current) return;
    goToSlide(idx);

    const st = scrollTriggerRef.current;
    if (st) {
      const snap = 1 / (sectionsCount - 1);
      const targetY = st.start + idx * snap * (st.end - st.start);
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 0.7 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="principles"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Sleek Floating Navigation Pill Dock */}
      <div
        ref={arrowsRef}
        className="fixed bottom-8 left-1/2 z-50 hidden md:flex -translate-x-1/2 items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-black/85 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] opacity-0 pointer-events-auto transition-all duration-300 ring-1 ring-white/10"
      >
        <button
          onClick={() => goToSection("prev")}
          className="p-2 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/35 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center group"
          aria-label="Previous principle slide"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Clickable Slide Indicator Dots */}
        <div className="flex items-center gap-2 px-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeSlide
                  ? "w-6 h-1.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goToSection("next")}
          className="p-2 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/35 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center group"
          aria-label="Next principle slide"
        >
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Desktop: Pinned horizontal story with Single Traveling Black & White Rocket */}
      {!isMobile && (
        <div ref={triggerRef} className="relative">
          {/* THE SINGLE TRAVELING BLACK & WHITE SCOUT ROCKET */}
          <div
            ref={rocketRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none will-change-transform filter drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] w-20 sm:w-24 md:w-26 h-20 sm:h-24 md:h-26"
          >
            <BlackWhiteRocket isThrusting={isThrusting} className="w-full h-full" />
          </div>

          <div
            ref={sectionRef}
            className="flex h-screen max-h-screen w-[400vw] overflow-hidden"
            onWheel={handleWheel}
          >
            {slides.map((s, idx) => (
              <BigTextSlide
                key={s.title}
                title={s.title}
                subtitle={s.subtitle}
                isActive={idx === activeSlide}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile: stacked sections */}
      {isMobile && (
        <div className="py-20 md:py-28 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
              Principles
            </p>
            <h2
              style={{ fontFamily: "stain" }}
              className="mt-4 text-4xl md:text-6xl uppercase font-bold leading-[0.95]"
            >
              How I ship work
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4">
              {slides.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-6"
                >
                  <p
                    style={{ fontFamily: "stain" }}
                    className="text-2xl uppercase font-bold leading-[0.95]"
                  >
                    {s.title}
                  </p>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}