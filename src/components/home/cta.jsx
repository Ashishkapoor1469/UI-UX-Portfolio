import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-anim",
        { opacity: 0, y: 18 },
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
      id="contact"
      ref={ref}
      className="w-full bg-black text-white border-t border-white/10 py-24 md:py-32"
      role="region"
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/3 to-transparent p-8 md:p-12 overflow-hidden relative">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <p className="cta-anim text-[11px] md:text-xs uppercase tracking-[0.28em] text-white/60 font-mono">
            Let’s build something people feel
          </p>
          <h2
            className="cta-anim mt-4 text-4xl md:text-6xl uppercase font-bold leading-[0.95]"
            style={{ fontFamily: "stain" }}
          >
            Available for
            <br />
            product work.
          </h2>
          <p className="cta-anim mt-6 text-sm md:text-base text-white/65 leading-relaxed max-w-2xl">
            If you’re shipping a new product, redesigning an experience, or
            need a front-end that feels premium—send a message. I’ll reply with
            next steps and a quick plan.
          </p>

          <div className="cta-anim mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:kapoorashish714@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-white hover:bg-white/10 hover:border-white/35 transition"
              aria-label="Email Ashish"
            >
              <Mail size={16} />
              Email
              <ArrowUpRight size={16} className="opacity-70" />
            </a>
            <a
              href="https://github.com/Ashishkapoor1469"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-white hover:bg-white/10 hover:border-white/35 transition"
              aria-label="View GitHub"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={16} className="opacity-70" />
            </a>
            <a
              href="https://www.linkedin.com/in/ashishkapoor4169/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-white hover:bg-white/10 hover:border-white/35 transition"
              aria-label="View LinkedIn"
            >
              <Linkedin size={16} />
              LinkedIn
              <ArrowUpRight size={16} className="opacity-70" />
            </a>
          </div>

          <p className="cta-anim mt-10 text-xs text-white/45 font-mono">
            Email: kapoorashish714@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}

