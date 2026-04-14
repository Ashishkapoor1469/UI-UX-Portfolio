import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import BigTextSlide from "../ui/BigTextSlide";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HrSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const arrowsRef = useRef(null);

  const sectionsCount = 4;
  const [isCoarse, setIsCoarse] = useState(false);

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
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarse(Boolean(mq.matches));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    // Disable pinned horizontal scroll on touch devices (better UX + avoids scroll-jank)
    if (isCoarse) return;

    const tween = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: `-${(sectionsCount - 1) * 100}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,
          pin: true,
          snap: {
            snapTo: 1 / (sectionsCount - 1),
            duration: 0.6,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
          },
          onEnter: () => gsap.to(arrowsRef.current, { autoAlpha: 1 }),
          onLeave: () => gsap.to(arrowsRef.current, { autoAlpha: 0 }),
          onEnterBack: () => gsap.to(arrowsRef.current, { autoAlpha: 1 }),
          onLeaveBack: () => gsap.to(arrowsRef.current, { autoAlpha: 0 }),
        },
      }
    );

    return () => tween.kill();
  }, []);

  const goToSection = (direction) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const snap = 1 / (sectionsCount - 1);
    const current = Math.round(st.progress / snap) * snap;

    const target =
      direction === "next"
        ? Math.min(current + snap, 1)
        : Math.max(current - snap, 0);

    gsap.to(window, {
      scrollTo: st.start + target * (st.end - st.start),
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <section
      id="principles"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* ARROWS */}
      <div
        ref={arrowsRef}
        className="fixed bottom-6 left-1/2 z-50 hidden md:flex -translate-x-1/2 gap-4 opacity-0"
      >
        <button
          onClick={() => goToSection("prev")}
          className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          ←
        </button>
        <button
          onClick={() => goToSection("next")}
          className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          →
        </button>
      </div>

      {/* Desktop: pinned horizontal story */}
      {!isCoarse && (
        <div ref={triggerRef}>
          <div ref={sectionRef} className="flex h-screen w-[400vw]">
            {slides.map((s) => (
              <BigTextSlide
                key={s.title}
                title={s.title}
                subtitle={s.subtitle}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile: stacked sections (prevents 400vw overflow) */}
      {isCoarse && (
        <div className="py-24 md:py-32 border-t border-white/10">
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