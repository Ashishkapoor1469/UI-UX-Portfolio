import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const proof = [
  {
    title: "Design + code, together",
    body: "I don’t “hand off” polish. I implement it—spacing, type, states, motion—so the final experience matches the intent.",
  },
  {
    title: "Performance as a feature",
    body: "Animations are budgeted, images are optimized, and interactions are tuned to feel instant—especially on mobile.",
  },
  {
    title: "Built to scale",
    body: "I favor reusable patterns and clean APIs so the product can evolve without a rebuild every month.",
  },
];

export default function Proof() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
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
      ref={ref}
      className="w-full bg-black text-white border-t border-white/10 py-24 md:py-32"
      role="region"
      aria-label="Proof section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
            Proof
          </p>
          <h2
            style={{ fontFamily: "stain" }}
            className="text-4xl md:text-6xl uppercase font-bold leading-[0.95]"
          >
            What you can expect
          </h2>
          <p className="text-sm md:text-base text-white/65 leading-relaxed">
            A small set of principles I bring to every build—so the work feels
            premium and stays maintainable.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {proof.map((p) => (
            <div
              key={p.title}
              className="proof-card rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-6 md:p-8 hover:border-white/20 transition-colors"
            >
              <p className="text-lg md:text-xl font-medium text-white">
                {p.title}
              </p>
              <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-white/45 font-mono">
            Minimal testimonial
          </p>
          <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
            “Ashish has a rare mix of design taste and engineering discipline—he
            ships polished interfaces that feel fast and intentional.”
          </p>
          <p className="mt-4 text-sm text-white/50 font-mono">
            — Replace with a real client/mentor quote when available
          </p>
        </div>
      </div>
    </section>
  );
}

