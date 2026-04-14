import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    year: "2023",
    title: "Design-first mindset",
    body: "Moved from “building pages” to designing systems: typography, spacing, states, and flow.",
  },
  {
    year: "2024",
    title: "Frontend that feels alive",
    body: "Began treating motion as UX—micro-interactions, scroll rhythm, and performance budgets.",
  },
  {
    year: "2025",
    title: "Full-stack product thinking",
    body: "Shipped end-to-end apps with secure auth, clean APIs, and UI built for real users.",
  },
];

export default function Journey() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      className="w-full bg-black text-white border-t border-white/10 py-24 md:py-32"
      role="region"
      aria-label="Journey section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
              About
            </p>
            <h2
              style={{ fontFamily: "stain" }}
              className="mt-4 text-4xl md:text-6xl uppercase font-bold leading-[0.95]"
            >
              I build with taste,
              <br />
              not templates.
            </h2>
            <p className="mt-6 text-sm md:text-base text-white/65 leading-relaxed max-w-prose">
              I’m Ashish Kapoor—a creative developer who cares about the details
              that users feel: rhythm, clarity, speed, and motion with intent.
              My work lives at the intersection of UI polish and engineering
              discipline.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-6 md:p-10">
              <div className="grid gap-6">
                {items.map((it) => (
                  <div
                    key={it.year}
                    className="journey-item grid grid-cols-12 gap-4 items-start"
                  >
                    <div className="col-span-3 sm:col-span-2">
                      <p className="text-xs md:text-sm font-mono text-white/45">
                        {it.year}
                      </p>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <p className="text-base md:text-lg text-white font-medium">
                        {it.title}
                      </p>
                      <p className="mt-2 text-sm md:text-base text-white/65 leading-relaxed">
                        {it.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

