import { Github, ExternalLink } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Section({
  id,
  title,
  description,
  image,
  techStack = [],
  role,
  year,
  liveLink,
  githubLink,
}) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image hover animation
      imageRef.current?.addEventListener("mouseenter", () => {
        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      imageRef.current?.addEventListener("mouseleave", () => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    }, cardRef);

    return () => ctx.revert();
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
        className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-10 hover:border-white/20 transition-all duration-500 group"
      >
        {/* LEFT – PROJECT INFO */}
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl">
          {(role || year) && (
            <p className="text-xs md:text-sm uppercase tracking-widest text-white/50 font-mono">
              {role} {role && year && "•"} {year}
            </p>
          )}

          <h2
            style={{ fontFamily: "stain" }}
            className="text-4xl md:text-5xl lg:text-6xl text-start font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
          >
            {title}
          </h2>

          <p className="text-sm md:text-base text-start text-white/80 leading-relaxed">
            {description}
          </p>

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
                className="display-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-white/10 to-transparent border border-white/20 rounded-lg text-white hover:from-white/20 hover:border-white/40 transition-all duration-300 font-medium group/btn"
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
              <img
                ref={imageRef}
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover rounded-lg transform transition duration-700 grayscale group-hover/img:grayscale-0"
              />
            </div>
          </div>

          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
