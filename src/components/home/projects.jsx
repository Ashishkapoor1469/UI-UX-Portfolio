import Section from "../ui/section";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { selectedWork } from "../../data/selectedWork";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white flex flex-col gap-8 px-4 md:px-8 py-24 md:py-32 justify-center items-center"
      role="region"
      aria-label="Selected work section"
    >
      <div className="w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center mb-16 md:mb-20">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
            Selected work
          </p>
          <h2
            style={{ fontFamily: "stain" }}
            className="mt-4 text-4xl md:text-7xl uppercase text-center font-bold leading-[0.95]"
          >
            Case studies,
            <span className="text-white/60"> not screenshots.</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-white/65 leading-relaxed">
            A few projects where I cared about the whole product: structure,
            motion, performance, and the decisions behind the UI.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-12 max-w-7xl mx-auto">
        {selectedWork.map((project) => (
          <div key={project.id} className="project-section">
            <Section {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}