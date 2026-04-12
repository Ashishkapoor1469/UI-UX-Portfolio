import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextAn from "../ui/textAnimation";

export default function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Fade in main content
    gsap.from(contentRef.current, {
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out",
    });

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
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
        <div className="absolute top-2/3 -translate-y-1/2 w-full px-6 md:px-12">
          <TextAn delay={0.8}>
            <h1
              style={{ fontFamily: "stain" }}
              className="text-[10vw] md:text-[9vw] uppercase text-white overlap-text select-none leading-none"
            >
              <p>Ashish</p>
              <p>Kapoor</p>
            </h1>
          </TextAn>
        </div>

        {/* Info Card */}
        <div className="flex lg:flex-row justify-end items-end flex-col-reverse gap-8 text-white mb-12">
          <div className="lg:block text-right max-w-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] text-center sm:text-end mb-4 opacity-70">
              Creative Full-Stack Developer
            </p>
            <p className="text-xs opacity-90 font-light uppercase text-center sm:text-end leading-relaxed">
              Crafting modern web applications with Next.js, React, and Express.
              <br />
              1+ year of hands-on experience building scalable solutions.
            </p>
            <p className="mt-6 font-mono text-[10px] opacity-50">© 02 / 25</p>
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
