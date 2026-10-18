import { useEffect, useRef, useState, useMemo } from "react";
import FlexCarousel from "../ui/FlexCarousel";

const getPhotoWidth = () => (typeof window !== "undefined" && window.innerWidth < 768 ? 800 : 1200);
const photo = (id, w) => `https://images.unsplash.com/${id}?w=${w || getPhotoWidth()}&q=80&auto=format&fit=max`;

export default function FlexCarouselSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const professionItems = useMemo(() => {
    const w = getPhotoWidth();
    return [
      {
        src: photo("photo-1747191092806-c7da11881986", w),
        alt: "A sculpted clay bust in profile on black",
        title: "Clay Study",
        subtitle: "Architecture & Structural Design",
      },
      {
        src: photo("photo-1737071371043-761e02b1ef95", w),
        alt: "An iridescent chrome sculpture of a head on black",
        title: "Core Architecture",
        subtitle: "Distributed Systems & Go Microservices",
      },
      {
        src: photo("photo-1739056238917-d89cd05c48d5", w),
        alt: "A twisted liquid metal form on black",
        title: "Liquid Systems",
        subtitle: "Creative Motion & 60-120fps Interaction",
      },
      {
        src: photo("photo-1770249196550-ff6c641165cb", w),
        alt: "A chrome humanoid automaton sculpture on dark reflective set",
        title: "System Automaton",
        subtitle: "Algorithms & Automation Engines",
      },
      {
        src: photo("photo-1786835568925-20cd20007ed0", w),
        alt: "Swirling shapes in silver and chrome on dark grey",
        title: "Full-Stack Forms",
        subtitle: "React 19 & High-Throughput Node APIs",
      },
      {
        src: photo("photo-1726910133626-9b573eca70ff", w),
        alt: "Black curved geometric fins stacked like a fan on black",
        title: "Performance Fins",
        subtitle: "Low Latency & High Concurrency",
      },
      {
        src: photo("photo-1786835568925-20cd20007ed0", w),
        alt: "Three swirling shapes in white, gold and silver on grey",
        title: "Obsidian Cloud",
        subtitle: "Docker Containers & CI/CD Pipelines",
      },
      {
        src: photo("photo-1770249196550-ff6c641165cb", w),
        alt: "A chrome humanoid sculpture",
        title: "Minimalist Architecture",
        subtitle: "Clean Abstractions & Scalability",
      },
      {
        src: photo("photo-1787181875088-087d612262a7", w),
        alt: "A black textured sculpture with an opening at its center",
        title: "Computer Science",
        subtitle: "Data Structures & Algorithmic Problem Solving",
      },
      {
        src: photo("photo-1693645325828-62cd35c8da8f", w),
        alt: "A man in a dark knit sweater against a black studio backdrop",
        title: "Global Reliability",
        subtitle: "High Availability & 99.9% Uptime",
      },
    ];
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="content-visibility-auto py-24 md:py-32 border-t border-white/10 w-full bg-black relative overflow-hidden"
      role="region"
      aria-label="Software Engineering Disciplines"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-8 md:mb-12">
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between pb-8 gap-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
                Engineering Craft // Flex Carousel
              </p>
            </div>
            <h2
              style={{ fontFamily: "stain" }}
              className="text-4xl md:text-6xl uppercase text-white font-bold leading-[0.95]"
            >
              Disciplines of
              <br />
              a Software Engineer.
            </h2>
          </div>

          <div className="max-w-xl space-y-2">
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Drag, scroll, or click cards to focus. Powered by WebGL liquid glass dispersion shaders from ReactBits.
            </p>
            <p className="text-xs font-mono uppercase tracking-wider text-white/40">
              Interactive • Click to Zoom • Horizontal Wheel / Drag
            </p>
          </div>
        </div>
      </div>

      {/* Official ReactBits WebGL FlexCarousel Container */}
      <div className="w-full h-[540px] sm:h-[620px] relative">
        {inView ? (
          <FlexCarousel
            items={professionItems}
            preset="liquid"
            intro="rise"
            cardHeight={0.52}
            gap={14}
            radius={16}
            squeeze={0.2}
            focusOnClick
            captions
            autoplay
            interval={4.5}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-white/10 border-t-white/40 animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}
