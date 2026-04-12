import { Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/Ashishkapoor1469" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/ashish-kapoor" },
    { icon: Mail, label: "Email", url: "mailto:ashish@example.com" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/10 bg-black px-6 md:px-12 py-16 md:py-24"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 mb-12 md:mb-16">
          {/* Brand */}
          <div className="footer-item">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ashish Kumar</h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Full-Stack Developer creating beautiful, functional web experiences. Specialized in React, Next.js, and modern JavaScript.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item space-y-3">
            <h4 className="text-sm uppercase tracking-widest font-semibold text-white/80 mb-4">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-white/60 hover:text-white transition-colors" aria-label="Go to Home">
                Home
              </a>
              <a href="#about" className="text-white/60 hover:text-white transition-colors" aria-label="Go to About">
                About
              </a>
              <a href="#projects" className="text-white/60 hover:text-white transition-colors" aria-label="Go to Projects">
                Projects
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="footer-item space-y-3">
            <h4 className="text-sm uppercase tracking-widest font-semibold text-white/80 mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.label}`}
                    className="p-2.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-item h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="footer-item flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/50 font-mono">
          <p>
            © {currentYear} Ashish Kapoor. All rights reserved.
          </p>
          <p>
            Crafted with <span className="text-red-400">❤</span> using React, Tailwind & GSAP
          </p>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
    </footer>
  );
}