import { selectedWork } from "../../data/selectedWork";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WorkGrid() {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate individual cards
      gsap.utils.toArray(".work-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.92,
            opacity: 0,
            y: 30,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected"
      className="py-24 md:py-32 border-t border-white/10 w-full bg-black"
      role="region"
      aria-label="Selected work overview section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="w-full flex flex-col md:flex-row items-end justify-between pb-10 gap-8 mb-12 md:mb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
              Selected work
            </p>
            <h2
              style={{ fontFamily: "stain" }}
              className="mt-4 text-4xl md:text-6xl uppercase text-white font-bold leading-[0.95]"
            >
              Small set.
              <br />
              High intent.
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
            Projects where the UI, motion, and engineering decisions work
            together—so the experience feels premium, not generic.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {selectedWork.slice(0, 4).map((p) => (
            <a
              key={p.id}
              href="#work"
              className="work-card group rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-6 md:p-7 hover:border-white/20 transition-colors"
              aria-label={`Jump to case study section for ${p.title}`}
              data-cursor="hover"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/55 font-mono">
                {p.eyebrow}
              </p>
              <p
                style={{ fontFamily: "stain" }}
                className="mt-4 text-3xl uppercase font-bold leading-[0.95] text-white"
              >
                {p.title}
              </p>
              {!p.image && (
                <div className="mt-5 h-16 w-16 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <span
                    style={{ fontFamily: "stain" }}
                    className="text-4xl text-white/85 select-none"
                    aria-hidden="true"
                  >
                    {(p.title || "").trim().slice(0, 1).toUpperCase() || "•"}
                  </span>
                </div>
              )}
              <p className="mt-3 text-sm text-white/65 leading-relaxed">
                {p.problem}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.techStack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-white/55 border border-white/15 rounded-full px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="mt-5 text-[11px] uppercase tracking-widest text-white/70">
                View case study →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
