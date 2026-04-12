import { works } from "../../data/work";
import TextAn from "../ui/textAnimation";
import WorkCard from "../ui/workcard";
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
      gsap.utils.toArray(".work-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            scale: 0.7,
            opacity: 0,
            y: 30,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.05,
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
      id="about"
      className="py-20 md:py-32 border-t border-white/10 dark:border-white/5 w-full bg-black"
      role="region"
      aria-label="Work gallery section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="w-full flex flex-col md:flex-row border-b border-white/10 items-center justify-between pb-12 gap-8 mb-16">
          <TextAn>
            <h2
              style={{ fontFamily: "stain" }}
              className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-white font-bold leading-tight"
            >
              Curated<br />Work
            </h2>
            <span
              style={{ fontFamily: "Poppins" }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-white/40 font-light"
            >
              12-25
            </span>
          </TextAn>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3"
        >
          {works.map((work) => (
            <div key={work.id} className="work-card">
              <WorkCard {...work} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
