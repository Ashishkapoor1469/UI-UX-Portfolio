import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Landing() {
  const containerRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const lettersRef = useRef([]);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const pathRef = useRef(null);

  const [done, setDone] = useState(false);

  const text = "ASHISH KAPOOR";

  useEffect(() => {
    if (done) return undefined;
    if (!containerRef.current) return undefined;

    const letters = lettersRef.current.filter(Boolean);
    const counterObj = { value: 0 };
    const curveObj = { val: 0 };

    // Initial setup with clean starting styles
    gsap.set(containerRef.current, { yPercent: 0, opacity: 1, display: "flex" });
    gsap.set(letters, { opacity: 0, y: 22, scale: 0.92, filter: "blur(6px)" });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set([headerRef.current, footerRef.current], { opacity: 0, y: 10 });
    if (counterRef.current) counterRef.current.textContent = "00%";

    const tl = gsap.timeline();

    // 1. Reveal micro metadata (top & bottom)
    tl.to(
      [headerRef.current, footerRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.15
    );

    // 2. Majestic staggered letter reveal with subtle blur clearing
    tl.to(
      letters,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.055,
        ease: "power3.out",
      },
      0.2
    );

    // 3. Synchronized razor-thin progress bar (slower, deliberate 2.4s duration)
    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: 2.4,
        ease: "power2.inOut",
      },
      0.2
    );

    // 4. Live percentage counter (00% -> 100% over 2.4s)
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 2.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            const val = Math.floor(counterObj.value);
            counterRef.current.textContent = `${String(val).padStart(2, "0")}%`;
          }
        },
      },
      0.2
    );

    // 5. Confident pause at 100% so user sees completion
    tl.to({}, { duration: 0.35 });

    // 6. PHASE 1: LUXURY CONTENT DISSOLVE
    // Letters float upward, blur, expand, and evaporate gracefully
    tl.to(
      letters,
      {
        y: -40,
        opacity: 0,
        scale: 1.08,
        filter: "blur(14px)",
        duration: 0.65,
        stagger: {
          each: 0.022,
          from: "center",
        },
        ease: "power3.in",
      },
      ">"
    );

    // Progress bar and metadata dissolve smoothly
    tl.to(
      [barRef.current?.parentElement, counterRef.current, headerRef.current, footerRef.current],
      {
        y: -22,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.5,
        ease: "power3.in",
      },
      "<"
    );

    // 7. PHASE 2: SLOWER, EXPENSIVE CURVED HORIZON CURTAIN WIPE
    // As the curtain glides up over 1.25s, the SVG curve bows downward elastically, then snaps flat
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          setDone(true);
        },
      },
      "-=0.2"
    );

    // Liquid curve dynamic arch (0 -> 90 -> 0)
    tl.to(
      curveObj,
      {
        val: 90,
        duration: 0.6,
        ease: "power2.in",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute(
              "d",
              `M 0 0 Q 50 ${curveObj.val} 100 0 L 100 0 L 0 0 Z`
            );
          }
        },
      },
      "<"
    );

    tl.to(
      curveObj,
      {
        val: 0,
        duration: 0.65,
        ease: "power2.out",
        onUpdate: () => {
          if (pathRef.current) {
            pathRef.current.setAttribute(
              "d",
              `M 0 0 Q 50 ${curveObj.val} 100 0 L 100 0 L 0 0 Z`
            );
          }
        },
      },
      ">"
    );

    return () => {
      tl.kill();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#050505] text-white p-6 md:p-10 will-change-transform select-none"
      aria-label="Portfolio Loading Screen"
      role="progressbar"
      aria-live="polite"
    >
      {/* Top Header Metadata */}
      <div
        ref={headerRef}
        className="w-full flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-white/40"
      >
        <span>Ashish Kapoor</span>
        <span className="hidden sm:inline">Portfolio // Edition 2026</span>
        <span>Chamba, IN</span>
      </div>

      {/* Main Center Display (Name + Counter + Razor Progress Bar) */}
      <div ref={contentWrapperRef} className="w-full text-center my-auto">
        {/* Title */}
        <div className="mb-6 flex justify-center gap-1 sm:gap-2 flex-wrap">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              style={{ fontFamily: "stain" }}
              className="text-3xl sm:text-5xl md:text-6xl tracking-[6px] sm:tracking-[10px] text-white font-bold inline-block will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Live Percentage Counter & Subtitle */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span
              ref={counterRef}
              className="font-mono text-xs text-white/70 tracking-widest tabular-nums font-semibold"
            >
              00%
            </span>
          </div>

          {/* Razor Progress Bar with Glowing Tip */}
          <div className="h-[2px] w-40 sm:w-60 overflow-hidden bg-white/10 rounded-full relative">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-white/40 via-white to-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-transform"
            />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30 mt-1">
            Software Engineer
          </span>
        </div>
      </div>

      {/* Bottom Footer Metadata */}
      <div
        ref={footerRef}
        className="w-full flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-white/40"
      >
        <span>Loading Experience</span>
        <span className="animate-pulse tracking-widest text-white/60">● 60 FPS</span>
      </div>

      {/* Organic Curved Horizon Apron (attached to bottom of curtain) */}
      <svg
        className="absolute top-[99%] left-0 w-full h-[22vh] pointer-events-none fill-[#050505] stroke-white/20 stroke-[0.75]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M 0 0 Q 50 0 100 0 L 100 0 L 0 0 Z"
        />
      </svg>
    </div>
  );
}
