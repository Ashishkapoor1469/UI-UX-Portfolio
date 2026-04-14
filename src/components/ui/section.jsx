import { Github, ExternalLink } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Section({
  id,
  eyebrow,
  title,
  image,
  techStack = [],
  role,
  year,
  liveLink,
  githubLink,
  problem,
  approach,
  decisions = [],
  outcome,
}) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const initial = (title || "").trim().slice(0, 1).toUpperCase();

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
    };

    img.addEventListener("mouseenter", onEnter);
    img.addEventListener("mouseleave", onLeave);
    return () => {
      img.removeEventListener("mouseenter", onEnter);
      img.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id={id}
      className="w-full flex items-center justify-center bg-black text-white"
      role="article"
      aria-label={`${title} project`}
    >
      <div
        ref={cardRef}
        className="w-full flex flex-col-reverse md:flex-row items-start justify-between gap-8 md:gap-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/3 to-transparent p-6 md:p-10 hover:border-white/20 transition-all duration-500 group"
      >
        {/* LEFT – PROJECT INFO */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {eyebrow && (
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
                {eyebrow}
              </p>
            )}
            {(role || year) && (
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/40 font-mono">
                {role} {role && year && "•"} {year}
              </p>
            )}
          </div>

          <h2
            style={{ fontFamily: "stain" }}
            className="text-4xl md:text-5xl lg:text-6xl text-start font-bold leading-[0.95] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          >
            {title}
          </h2>

          <div className="grid gap-5 md:gap-6 pt-1">
            {problem && (
              <div className="grid gap-2">
                <p className="text-xs uppercase tracking-widest text-white/45 font-mono">
                  Problem
                </p>
                <p className="text-sm md:text-base text-start text-white/80 leading-relaxed">
                  {problem}
                </p>
              </div>
            )}
            {approach && (
              <div className="grid gap-2">
                <p className="text-xs uppercase tracking-widest text-white/45 font-mono">
                  Approach
                </p>
                <p className="text-sm md:text-base text-start text-white/80 leading-relaxed">
                  {approach}
                </p>
              </div>
            )}

            {decisions?.length > 0 && (
              <div className="grid gap-2">
                <p className="text-xs uppercase tracking-widest text-white/45 font-mono">
                  Key decisions
                </p>
                <ul className="grid gap-2 text-sm md:text-base text-white/75 leading-relaxed">
                  {decisions.slice(0, 4).map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {outcome && (
              <div className="grid gap-2">
                <p className="text-xs uppercase tracking-widest text-white/45 font-mono">
                  Outcome
                </p>
                <p className="text-sm md:text-base text-start text-white/80 leading-relaxed">
                  {outcome}
                </p>
              </div>
            )}
          </div>

          {/* TECH STACK */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 text-sm md:text-base mt-4 md:mt-6 pt-2">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-white/12 to-transparent border border-white/25 rounded-lg text-white hover:from-white/20 hover:border-white/45 transition-all duration-300 font-medium group/btn"
                aria-label={`Visit live demo of ${title}`}
              >
                <span>Live Demo</span>
                <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-white/10 to-transparent border border-white/20 rounded-lg text-white hover:from-white/20 hover:border-white/40 transition-all duration-300 font-medium group/btn"
                aria-label={`View ${title} on GitHub`}
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT – IMAGE CARD */}
        <div className="relative group/img w-full md:w-1/2 h-auto">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover/img:opacity-100 transition duration-500 blur" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-1 bg-black">
            <div className="overflow-hidden rounded-xl">
              {image ? (
                <img
                  ref={imageRef}
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover rounded-lg transform transition duration-700 grayscale group-hover/img:grayscale-0 will-change-transform"
                />
              ) : (
                <div className="w-full h-64 md:h-80 rounded-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent flex items-center justify-center">
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <span
                      style={{ fontFamily: "stain" }}
                      className="text-5xl md:text-6xl text-white/85 select-none"
                      aria-hidden="true"
                    >
                      {initial || "•"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
