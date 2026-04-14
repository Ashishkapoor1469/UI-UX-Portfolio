import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Keep hero content stable across reloads/HMR (avoid stacked opacity tweens).
    gsap.set(contentRef.current, { opacity: 1, clearProps: "opacity" });
    gsap.set(titleRef.current, { opacity: 1, clearProps: "opacity" });

    const titleTween = gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        overwrite: "auto",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
    );

    // disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;

      gsap.to(bgRef.current, {
        x,
        y,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      titleTween?.kill();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-end overflow-hidden"
      role="region"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black w-full h-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={bgRef}
            src="/assets/3.webp"
            className="w-full h-full object-cover mix-blend-screen opacity-70 contrast-125"
            alt="Hero background"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="z-10 px-6 md:px-12 pb-12 flex flex-col h-full justify-end">
        {/* Title */}
        <div className="absolute top-[38%] sm:top-1/2 md:top-2/3 -translate-y-1/2 w-full px-6 md:px-12 pointer-events-none">
          <h1
            ref={titleRef}
            style={{ fontFamily: "stain" }}
            className="hero-title text-[12vw] sm:text-[10vw] md:text-[9vw] uppercase text-white overlap-text select-none leading-none"
          >
            <p>Ashish</p>
            <p>Kapoor</p>
          </h1>
        </div>

        {/* Info Card */}
        <div className="flex lg:flex-row justify-end items-end flex-col-reverse gap-8 text-white mb-10 sm:mb-12">
          <div className="lg:block text-right max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white text-center sm:text-end mb-4 text-white font-mono">
              Creative developer • UI / Motion • Full‑stack mindset
            </p>
            <p className="text-xs md:text-sm text-white font-light text-center sm:text-end leading-relaxed">
              I design and build digital experiences that feel alive—clean
              architecture underneath, premium interaction on top.
            </p>
            <div className="mt-6 flex items-center justify-center sm:justify-end gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/40 transition"
                aria-label="Jump to selected work"
              >
                Selected work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-2 text-[11px] uppercase tracking-widest text-white/80 hover:text-white hover:border-white/30 transition"
                aria-label="Jump to contact"
              >
                Let’s talk
              </a>
            </div>
            <p className="mt-6 font-mono text-[10px] text-white/45">© 2026</p>
          </div>

          <div className="p-1 border border-white/30 bg-black/20 backdrop-blur-sm group hover:border-white/50 transition-all duration-500">
            <img
              className="w-24 h-32 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              src="/assets/boy.webp"
              alt="Ashish Kapoor - Profile"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
