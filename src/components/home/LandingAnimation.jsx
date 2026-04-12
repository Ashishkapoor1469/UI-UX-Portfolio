import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Landing() {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const barRef = useRef(null);

  const text = "ASHISH KAPOOR";

  useEffect(() => {
    const letters = lettersRef.current;
    const letterDuration = 0.08;
    const totalDuration = letters.length * letterDuration;

    // Initial states with better timing
    gsap.set(letters, { opacity: 0.1, scale: 0.8 });
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });

    const tl = gsap.timeline();

    // Letters reveal with stagger and scale
    tl.to(
      letters,
      {
        opacity: 1,
        scale: 1,
        duration: 0.05,
        stagger: letterDuration,
        ease: "power3.out",
      },
      0
    );

    // Progress bar synchronized
    tl.to(
      barRef.current,
      {
        scaleX: 1,
        duration: totalDuration,
        ease: "sine.inOut",
      },
      0
    );

    // Slide screen up with smooth easing
    tl.to(
      containerRef.current,
      {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.4,
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black will-change-transform"
    >
      <div className="w-full px-6 text-center">
        {/* Text */}
        <div className="mb-8 flex justify-center gap-2">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              style={{ fontFamily: "stain" }}
              className="sm:text-4xl text-2xl md:text-5xl tracking-[8px] text-white font-bold will-change-transform inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1 w-20 mx-auto overflow-hidden bg-white/10 rounded-full">
          <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-white via-white to-white/70 rounded-full will-change-transform" />
        </div>
      </div>
    </div>
  );
}
